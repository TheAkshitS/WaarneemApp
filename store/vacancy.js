export const state = () => ({
  vacancies: [
    {
      id: '428ec6dc-0f07-4973-bde6-39fa29ad2d34',
      title: 'Vacancy 1',
      description: 'description 1',
      totalPrice: 70,
      shifts: [
        {
          id: 'ab8cbe69-fb6e-4cac-9455-5d78d6f20efc',
          date: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          price: 10,
          type: '1',
        },
        {
          id: '7832b0ad-08b3-497d-b089-3e84f4fe61da',
          date: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          price: 60,
          type: '2',
        },
      ],
    },
    {
      id: 'e778bd8f-2aeb-4b3a-8a20-b89ce3a6469b',
      title: 'Vacancy 2',
      description: 'description 2',
      totalPrice: 300,
      shifts: [
        {
          id: '35a7545d-d267-4c6d-9685-588ced0ef3b6',
          date: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          price: 90,
          type: '3',
        },
        {
          id: '64517055-f640-4bc0-877f-8682919f11de',
          date: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          price: 210,
          type: '1',
        },
      ],
    },
  ],
})

export const getters = {
  maxShiftPrice (state) {
    return state.vacancies.reduce((max, vacancy) => {
      const vacancyMaxPrice = vacancy.shifts.reduce(
        (max, shift) => Math.max(max, shift.price),
        -Infinity
      )
      return Math.max(max, vacancyMaxPrice)
    }, -Infinity)
  },

  minShiftPrice (state) {
    return state.vacancies.reduce((min, vacancy) => {
      const vacancyMinPrice = vacancy.shifts.reduce(
        (min, shift) => Math.min(min, shift.price),
        Infinity
      )
      return Math.min(min, vacancyMinPrice)
    }, Infinity)
  },
}

export const mutations = {
  createVacancy (state, value) {
    state.vacancies.push(value)
  },

  updateVacancy (state, id, value) {
    state.vacancies = state.vacancies.map((vacancy) => {
      if (vacancy.id === id) {
        return value
      }
      return vacancy
    })
  },

  deleteVacancy (state, id) {
    state.vacancies = state.vacancies.filter((vacancy) => vacancy.id !== id)
  },
}

export const actions = {
  async createVacancy ({ commit }, value) {
    await commit('createVacancy', value)

    return value
  },

  async updateVacancy ({ commit }, id, value) {
    await commit('updateVacancy', id, value)

    return id
  },

  async deleteVacancy ({ commit }, id) {
    await commit('deleteVacancy', id)

    return id
  },
}
