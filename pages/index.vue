<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      vacancies: [],
    }
  },

  computed: {
    ...mapState('vacancy', { vacanciesFromStore: 'vacancies' }),
  },

  mounted() {
    this.vacancies = [...this.vacanciesFromStore]
  },

  methods: {
    ...mapActions({ deleteVacancyFromStore: 'vacancy/deleteVacancy' }),

    async deleteVacancy(id) {
    },

    openVacancyModal(id) {
    },
  },
}
</script>

<template>
  <main class="container">
    <div class="column mt-3">
      <div class="columns">
        <div class="column is-10">
          <h1 class="title">Vacancies</h1>
        </div>
        <div class="column">
          <b-button type="is-primary btn-add" @click="openVacancyModal"
            >Add Vacancy</b-button
          >
        </div>
      </div>
    </div>

    <template v-if="vacancies.length">
      <VacancyCard
        v-for="vacancy in vacancies"
        :key="vacancy.id"
        :vacancy="vacancy"
        @openVacancyModal="openVacancyModal"
        @deleteVacancy="deleteVacancy(vacancy.id)"
      />
    </template>

    <template v-else>
      <div class="columns is-centered ma-5">
        <div class="column notification is-10">
          <h2 class="title">No Vacancies</h2>
        </div>
      </div>
    </template>
  </main>
</template>

<style scoped>
.btn-add {
  width: 100%;
}
</style>
