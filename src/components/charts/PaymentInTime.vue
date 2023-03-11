<template>
  <div>
    <canvas id="payment-in-time"></canvas>
  </div>
</template>

<script lang="ts">
import { Chart } from "chart.js";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaymentInTime",
  props: {
    dataset: {
      required: true,
      type: Object as () => {
        labels: string[];
        data: {
          simpleRace: number[];
          cumulativeRace: number[];
          simpleDonation: number[];
          cumulativeDonation: number[];
        };
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
              label: "Montant reçu",
              borderColor: "#876cdd",
              lineTension: 0.2,
              fill: false,
            },
            {
              data: {},
              label: "Montant reçu en cumulé",
              backgroundColor: "rgba(55, 71, 133, .5)",
              borderColor: "#671df7",
              lineTension: 0.2,
              fill: false,
            },
            {
              data: {},
              label: "Dons pour la course caritative",
              borderColor: "#9eb448",
              lineTension: 0.2,
              fill: false,
            },
            {
              data: {},
              label: "Dons pour la course caritative en cumulé",
              borderColor: "#22a649",
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
  methods: {
    centimesToEuros(price: number) {
      return price / 100;
    },
  },
  mounted() {
    const ctx = document.getElementById("payment-in-time");
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
          data: this.dataset.data.simpleRace.map(this.centimesToEuros),
        };
        this.chart.data.datasets[1] = {
          ...this.chartData.data.datasets[1],
          data: this.dataset.data.cumulativeRace.map(this.centimesToEuros),
        };
        this.chart.data.datasets[2] = {
          ...this.chartData.data.datasets[2],
          data: this.dataset.data.simpleDonation.map(this.centimesToEuros),
        };
        this.chart.data.datasets[3] = {
          ...this.chartData.data.datasets[3],
          data: this.dataset.data.cumulativeDonation.map(this.centimesToEuros),
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
