<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      sliderValues: [],
    }
  },

  computed: {
    ...mapGetters({
      maxShiftPrice: 'vacancy/maxShiftPrice',
      minShiftPrice: 'vacancy/minShiftPrice',
    }),
  },

  watch: {
    maxShiftPrice() {
      this.setSliderValues()
    },

    minShiftPrice() {
      this.setSliderValues()
    },
  },

  mounted() {
    this.setSliderValues()
  },

  methods: {
    sliderChanged() {
      this.$emit('updateShift', [...this.sliderValues])
    },

    setSliderValues() {
      this.sliderValues = [this.minShiftPrice, this.maxShiftPrice]
    },
  },
}
</script>

<template>
  <section class="columns is-align-items-center is-centered">
    <div class="column is-4">
      <h3 class="subtitle has-text-grey">Filter by Total Vacancy Price</h3>
    </div>

    <b-field class="column is-6">
      <b-slider
        v-model="sliderValues"
        tooltip-always
        ticks
        :min="0"
        :max="500"
        :step="50"
        class="column"
        @change="sliderChanged"
      />
    </b-field>
  </section>
</template>
