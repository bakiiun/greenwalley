<template>
  <v-card>
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </v-card>
</template>

<script>
import apexchart from "vue-apexcharts";
import moment from "moment";
import { api } from "../../../../../plugins/axios/Req-Module";

export default {
  components: {
    apexchart,
  },
  data() {
    return {
      chartOptions: {},
      series: [
        {
          name: "payList",
          data: [],
        },
      ],
    };
  },

  mounted() {
    api("get", "/invoice_daily_list").then((i) => {
      let dateList = Object.keys(i.data).map((key) => moment(i.data[key].payday).format("DD-MM"));
      let costList = Object.keys(i.data).map((key) => i.data[key].totalCost);

      this.series[0].data = costList;

      this.chartOptions = {
        grid: {
          show: false,
          padding: {
            top: 0,
            right: 10,
            bottom: 0,
            left: 10,
          },
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex }) {
            return '<div class="arrow_box">' + "<span>" + series[seriesIndex][dataPointIndex] + "</span>" + "</div>";
          },
          fillSeriesColor: false,
          theme: false,
          marker: {
            show: false,
          },
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
          categories: dateList,
          max: 30,
          labels: {
            style: {
              fontSize: "10px",
            },
          },
          tooltip: {
            enabled: false,
          },
        },
      };
    });
  },
};
</script>
