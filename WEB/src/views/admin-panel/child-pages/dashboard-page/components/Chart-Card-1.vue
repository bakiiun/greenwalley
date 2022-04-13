<template>
  <v-card>
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </v-card>
</template>

<script>
import apexchart from "vue-apexcharts";
export default {
  components: {
    apexchart,
  },
  data() {
    return {
      chartOptions: {},
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    };
  },

  mounted() {
    this.chartOptions = {
      grid: {
        show: false,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        row: {
          colors: undefined,
          opacity: 0.5,
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex }) {
          return "<span>" + series[seriesIndex][dataPointIndex] + "</span>";
        },
        fillSeriesColor: false,
        theme: false,
      },

      chart: {
        zoom: {
          enabled: false,
        },
        width: "99%",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    };
  },
};
</script>
