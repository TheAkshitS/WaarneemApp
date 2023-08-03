<template>
  <div class="column">
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column is-11">
            <h3 class="title has-text-grey">
              {{ vacancy.title }}

              <br />

              <span class="subtitle has-text-grey">{{
                vacancy.description
              }}</span>
            </h3>
          </div>

          <div class="column">
            <b-tooltip label="Edit Vacancy" position="is-bottom" :delay="300">
              <span class="mr-2" @click="editVacancy">
                <b-icon icon="pencil is-clickable" size="is-small"
              /></span>
            </b-tooltip>

            <b-tooltip label="Delete Vacancy" position="is-bottom" :delay="300">
              <span @click="deleteVacancy">
                <b-icon icon="delete is-clickable" size="is-small" />
              </span>
            </b-tooltip>
          </div>
        </div>

        <div class="content">
          <h3 class="subtitle has-text-grey">Shifts</h3>
          <ShiftTable :shifts="vacancy.shifts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vacancy: {
      type: Object,
      required: true,
    },
  },

  methods: {
    editVacancy() {
      this.$emit('openVacancyModal', this.vacancy.id)
    },

    deleteVacancy() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure, you want to delete?',
        onConfirm: () => this.$emit('deleteVacancy', this.vacancy.id),
      })
    },
  },
}
</script>
