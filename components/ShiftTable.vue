<script>
import {
  formattedTime,
  formattedDate,
  formattedCurrency,
} from '../utils/formatting'

const SHIFT_TYPES = [
  { value: '1', label: 'Consultation' },
  { value: '2', label: 'Telephone' },
  { value: '3', label: 'Ambulance' },
]

export default {
  props: {
    shifts: {
      type: Array,
      required: true,
    },
  },

  methods: {
    formattedTime,
    formattedDate,
    formattedCurrency,

    formatShiftLabel(value) {
      return SHIFT_TYPES.find((type) => type.value === value).label
    },
  },
}
</script>

<template>
  <div class="container">
    <b-table :data="shifts" bordered striped hoverable focusable mobile-cards>
      <b-table-column v-slot="props" field="date" label="Date" width="40">
        {{ formattedDate(props.row.date) }}
      </b-table-column>

      <b-table-column v-slot="props" field="startTime" label="Start time">
        {{ formattedTime(props.row.startTime) }}
      </b-table-column>

      <b-table-column v-slot="props" field="endTime" label="End time">
        {{ formattedTime(props.row.endTime) }}
      </b-table-column>

      <b-table-column v-slot="props" field="type" label="Type">
        {{ formatShiftLabel(props.row.type) || '-' }}
      </b-table-column>

      <b-table-column v-slot="props" numeric label="Price">
        {{ formattedCurrency(props.row.price) }}
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">No records</div>
      </template>
    </b-table>
  </div>
</template>
