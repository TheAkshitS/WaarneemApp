<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    selectedVacancyId: {
      type: String,
      default: '',
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
    ...mapGetters({
      getVacancyById: 'vacancy/getVacancyById',
    }),

    selectedVacancy() {
      return this.getVacancyById(this.selectedVacancyId)
    },

    isEdit() {
      return !!this.selectedVacancyId
    },

    isSubmitDisabled() {
      return false
      // return !this.shiftTimes.length || !this.form.title
    },
  },

  mounted() {
    if (this.isEdit) {
      // UPDATE FLOW -> map values
      this.shiftTimes = this.selectedVacancy.shifts
      this.form.id = this.selectedVacancy.id
      this.form.title = this.selectedVacancy.title
      this.form.description = this.selectedVacancy.description

      this.form.shifts = [...this.shiftTimes].map((shift) => shift.date)
    }
  },

  methods: {
    ...mapActions({
      createVacancy: 'vacancy/createVacancy',
      updateVacancy: 'vacancy/updateVacancy',
    }),

    async submit() {
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
        try {
          await this.updateVacancy({ id: payload.id, value: payload })

          this.$emit('close')

          this.$buefy.toast.open({
            message: 'Vacancy updated successfully.',
            position: 'is-bottom',
            type: 'is-success',
          })
        } catch (error) {
          console.error(error)

          this.$buefy.toast.open({
            message: 'Error while updating Vacancy!',
            position: 'is-bottom',
            type: 'is-error',
          })
        }
      } else {
        // CREATE FLOW
        try {
          await this.createVacancy(payload)

          this.$emit('close')

          this.$buefy.toast.open({
            message: 'Vacancy created successfully.',
            position: 'is-bottom',
            type: 'is-success',
          })
        } catch (error) {
          console.error(error)

          this.$buefy.toast.open({
            message: 'Error while creating Vacancy!',
            position: 'is-bottom',
            type: 'is-error',
          })
        }
      }
    },

    updateShift(index, value) {
      this.shiftTimes[index] = value
    },

    deleteShiftTime(index) {
      this.form.shifts = [...this.form.shifts].filter(
        (data, idx) => idx !== index
      )
      this.shiftTimes = [...this.shiftTimes].filter(
        (data, idx) => idx !== index
      )
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
              :shift-date="date"
              :shift-data.sync="shiftTimes[i]"
              @updateShift="updateShift(i, $event)"
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
