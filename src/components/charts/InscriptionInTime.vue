<template>
  <div>
    <canvas id="inscription-in-time"></canvas>
  </div>
</template>

<script lang="ts">
import { Chart } from "chart.js";
import { defineComponent } from "vue";

export default defineComponent({
  name: "InscriptionInTime",
  props: {
    dataset: {
      required: true,
      type: Object as () => {
        labels: string[];
        data: { simple: number[]; cumulative: number[] };
      },
    },
  },
  data() {
    return {
      chart: {} as Chart,
      chartData: {
        type: "line",
        data: {
          labels: [] as string[],
          datasets: [
            {
              data: {},
              label: "Nombre d'inscriptions par jour",
              borderColor: "#7c9fbf",
              lineTension: 0.2,
              fill: false,
            },
            {
              data: {},
              label: "Nombre cumulé d'inscriptions",
              borderColor: "#374785",
              lineTension: 0.2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "day",
                  displayFormats: {
                    day: "DD/MM",
                  },
                },
                ticks: {},
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      },
    };
  },
  mounted() {
    const ctx = document.getElementById("inscription-in-time");
    this.chart = new Chart(ctx as any, this.chartData as any);
  },
  computed: {
    minDate() {
      return Math.min(
        ...this.dataset.labels.map((date) => new Date(date).getTime())
      );
    },
  },
  watch: {
    dataset() {
      if (this.chart.data.datasets && this.chart.data.datasets.length > 0) {
        this.chart.data.datasets[0] = {
          ...this.chartData.data.datasets[0],
          data: this.dataset.data.simple,
        };
        this.chart.data.datasets[1] = {
          ...this.chartData.data.datasets[1],
          data: this.dataset.data.cumulative,
        };
        this.chart.data.labels = this.dataset.labels;
        if (
          this.chart.options.scales?.xAxes &&
          this.chart.options.scales.xAxes.length > 0
        ) {
          this.chart.options.scales.xAxes[0].ticks = {
            suggestedMin: this.minDate,
          };
        }
        this.chart.update();
      }
    },
  },
});
</script>
