<script>
import { formattedDate } from '../utils/formatting'

export default {
  props: {
    shiftDate: {
      type: Date,
      required: true,
    },

    shiftData: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      form: {
        id: window.crypto.randomUUID(),
        startTime: null,
        endTime: null,
        price: null,
        type: null,
      },
      options: [
        { value: '1', label: 'Consultation' },
        { value: '2', label: 'Telephone' },
        { value: '3', label: 'Ambulance' },
      ],
    }
  },

  computed: {
    isEdit() {
      return this.shiftData !== {}
    },
  },

  mounted() {
    if (this.isEdit) {
      this.form = { ...this.shiftData }
    }
  },

  methods: {
    formattedDate,

    updateShift() {
      this.$emit('updateShift', {
        ...{...this.form},
        ...{
          date: this.shiftDate,
        },
      })
    },

    deleteShiftTime() {
      this.$emit('deleteShiftTime')
    },
  },
}
</script>

<template>
  <div class="box">
    <div class="columns">
      <div class="column is-11">
        <h3 class="has-text-weight-semibold">
          {{ formattedDate(shiftDate) }}
        </h3>
      </div>
      <div class="column" @click="deleteShiftTime">
        <b-icon icon="close is-clickable" size="is-small" />
      </div>
    </div>

    <div class="columns">
      <b-field label="Start time" class="column">
        <b-timepicker
          v-model.lazy="form.startTime"
          required
          inline
          size="is-small"
          hour-format="24"
          :default-minutes="0"
          @input="updateShift"
        />
        </b-field>

      <b-field label="End time" class="column">
        <b-timepicker
          v-model.lazy="form.endTime"
          required
          inline
          size="is-small"
          hour-format="24"
          :default-minutes="0"
          :min-time="form.startTime"
          @input="updateShift"
        />
      </b-field>

      <b-field label="Price" class="column">
        <b-input
          v-model.number.lazy="form.price"
          required
          type="number"
          :min="0"
          :max="500"
          @input="updateShift"
        />
      </b-field>

      <b-field label="Type" class="column">
        <b-select v-model.lazy="form.type" @input="updateShift">
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            required
          >
            {{ option.label }}
          </option>
        </b-select>
      </b-field>
    </div>
  </div>
</template>
