<template>
  <div class="highcharts-container">
  </div>
</template>

<script>
import Highcharts from 'highcharts'
export default {
  props: ['options', 'styles'],
  name: 'highcharts',
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = new Highcharts.Chart(this.$el, this.options)
    }
  }
}
</script>

<style lang="stylus" scoped>
.hightcharts-container
  width 800px
  height 400px
</style>
