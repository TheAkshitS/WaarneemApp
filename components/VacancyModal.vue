<script>
import { mapActions } from 'vuex'

export default {
  props: {
    selectedVacancy: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isModalVisible: true,
      form: {
        id: window.crypto.randomUUID(),
        title: '',
        description: '',
        shifts: [],
      },
      shiftTimes: [],
    }
  },

  computed: {
    isEdit() {
      return !!this.selectedVacancy
    },

    isSubmitDisabled() {
      return !this.shiftTimes.length || !this.form.title
    },
  },

  // TODO: delete if not required
  // watch: {
  //   'form.shifts'(newValue, oldValue) {
  //     if (oldValue.length < newValue.length) {
  //       this.createShiftTime()
  //     } else {
  //       // Fix delete of date
  //       const removedDateIndex = oldValue.findIndex(
  //         (date) => date.id === newValue[newValue.length - 1].id
  //       )
  //       this.shiftTimes.splice(removedDateIndex, 1)
  //     }
  //   },
  // },

  mounted() {
    if (this.isEdit) {
      this.shiftTimes = this.selectedVacancy.shifts
      this.form.id = this.selectedVacancy.id
      this.form.title = this.selectedVacancy.title
      this.form.description = this.selectedVacancy.description

      // TODO: fix mapping
      // this.form.shifts = [...this.shifts].map((shift) => shift.date)

      // this.form = {...this.selectedVacancy}
    }
  },

  methods: {
    ...mapActions({
      createVacancy: 'vacancy/createVacancy',
      updateVacancy: 'vacancy/updateVacancy',
    }),

    async submit() {
      try {
        const payload = {
          ...this.form,
          ...{
            totalPrice: this.shiftTimes.reduce(
              (acc, shift) => acc + shift.price,
              0
            ),
          },
          ...{ shifts: this.shiftTimes },
        }

        if (this.isEdit) {
          // UPDATE FLOW
          await this.updateVacancy(payload.id, payload)
        } else {
          // CREATE FLOW
          await this.createVacancy(payload)

          this.$emit('close')

          this.$buefy.toast.open({
            message: 'Vacancy created successfully.',
            position: 'is-bottom',
            type: 'is-success',
          })
        }
      } catch (error) {
        console.error(error)

        this.$buefy.toast.open({
          message: 'Error while creating Vacancy!',
          position: 'is-bottom',
          type: 'is-error',
        })
      }
    },

    createShiftTime() {
      this.shiftTimes.push({
        startTime: null,
        endTime: null,
        price: null,
        type: null,
      })
    },

    updateShiftTime(index, value) {
      this.shiftTimes.splice(index, 1, value)
    },

    deleteShiftTime(value) {
      this.form.shifts.splice(value, 1)
    },
  },
}
</script>

<template>
  <b-modal
    v-model="isModalVisible"
    has-modal-card
    trap-focus
    destroy-on-hide
    aria-role="dialog"
    aria-label="Vacancy Modal"
    close-button-aria-label="Close"
    aria-modal
    @close="$emit('close')"
  >
    <form @submit.prevent="submit">
      <div class="modal-card" style="min-width: min(80%, 700px); height: 90vh">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ isEdit ? 'Edit Vacancy' : 'Create Vacancy' }}
          </p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Title">
            <b-input v-model="form.title" maxlength="100" required />
          </b-field>

          <b-field label="Description">
            <b-input
              v-model="form.description"
              maxlength="500"
              type="textarea"
            />
          </b-field>

          <b-field label="Dates">
            <!-- TODO: Add min max date selection validation -->
            <b-datepicker v-model="form.shifts" required multiple inline />
          </b-field>

          <template v-if="form.shifts">
            <ShiftTimeCard
              v-for="(date, i) in form.shifts"
              :key="i"
              :shift-date="isEdit ? date.date : date"
              @updateShiftTime="updateShiftTime(i, $event)"
              @deleteShiftTime="deleteShiftTime(i)"
            />
          </template>
        </section>

        <footer class="modal-card-foot">
          <b-button label="Close" @click="$emit('close')" />
          <b-button
            :label="isEdit ? 'Update' : 'Create'"
            :disabled="isSubmitDisabled"
            type="is-primary"
            native-type="submit"
          />
        </footer>
      </div>
    </form>
  </b-modal>
</template>
