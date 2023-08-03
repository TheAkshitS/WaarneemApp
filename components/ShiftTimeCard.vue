<script>
import { formattedDate } from '../utils/formatting'

export default {
  props: {
    shiftDate: {
      type: Date,
      required: true,
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

  watch: {
    form: {
      handler() {
        this.$emit('updateShiftTime', {
          ...this.form,
          ...{
            date: this.shiftDate,
          },
        })
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    formattedDate,

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
          v-model="form.startTime"
          required
          inline
          size="is-small"
          hour-format="24"
          :default-minutes="0"
        />
      </b-field>

      <b-field label="End time" class="column">
        <b-timepicker
          v-model="form.endTime"
          required
          inline
          size="is-small"
          hour-format="24"
          :default-minutes="0"
          :min-time="form.startTime"
        />
      </b-field>

      <b-field label="Price" class="column">
        <b-input
          v-model.number="form.price"
          required
          type="number"
          :min="0"
          :max="500"
        />
      </b-field>

      <b-field label="Type" class="column">
        <b-select v-model="form.type">
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
