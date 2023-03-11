<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Home" />

    <CertificateModalVue
      v-show="showCertificateModal"
      @hideCertificate="toggleCertificateModal"
      @updateData="reloadTable"
      :certificates="certificates"
      :index="index"
    />

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Dashboard</h2>
        </div>
        <div class="col-6"></div>
      </div>

      <div class="row m-2 mt-4">
        <div class="col bg-light me-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3 pb-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Nombre d'inscrits</h5>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-6 border-end">
                <h1 class="mb-0">
                  {{
                    getPendingInscriptionsLength() +
                    getValidatedInscriptionsLength()
                  }}
                </h1>
              </div>
              <div class="col-6 text-success">
                <h2 class="d-block m-auto">+ {{ countLast24h }}</h2>
                <div class="form-text d-block">sur les dernières 24h</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col bg-light mx-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3 pb-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Statut Inscriptions</h5>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-4 text-success border-end">
                <h2 class="d-block m-auto">
                  {{ getValidatedInscriptionsLength() }}
                </h2>
                <div class="form-text d-block">Validées</div>
              </div>
              <div class="col-4 text-warning border-end">
                <h2 class="d-block m-auto">
                  {{ getPendingInscriptionsLength() }}
                </h2>
                <div class="form-text d-block">En cours</div>
              </div>
              <div class="col-4 text-danger">
                <h2 class="d-block m-auto">
                  {{ getCancelledInscriptionsLength() }}
                </h2>
                <div class="form-text d-block">Annulées</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col bg-light mx-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Début de la course dans :</h5>
              </div>
            </div>
            <div class="row pt-2">
              <Countdown :end="new Date(endDate)"></Countdown>
            </div>
          </div>
        </div>
        <div class="col bg-light ms-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Solde</h5>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-6 border-end">
                <h2 class="d-block m-auto">
                  {{ centimesToEuros(validatedPaymentTotal) }} €
                </h2>
                <div class="form-text d-block">Courses</div>
              </div>
              <div class="col-6 text-success">
                <h2 class="d-block m-auto">
                  {{ centimesToEuros(donationPaymentTotal) }} €
                </h2>
                <div class="form-text d-block">Dons</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div class="col bg-light me-2 rounded-3 shadow-sm">
          <InscriptionInTime
            :dataset="chartInscriptionDataset"
          ></InscriptionInTime>
        </div>
        <div class="col-4 bg-light ms-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>
                  Certificats à valider ({{
                    certificates.filter(
                      (c) =>
                        c.inscription.status !== InscriptionStatus.CANCELLED
                    ).length
                  }})
                </h5>
              </div>
            </div>
            <div class="row">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Athlète</th>
                    <th scope="col">Certificat</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr
                    v-for="certificate in certificates
                      .filter(
                        (c) =>
                          c.inscription.status !== InscriptionStatus.CANCELLED
                      )
                      .slice(0, 5)"
                    :key="certificate.id"
                    :class="
                      isAthleteMinor(
                        certificate.inscription.athlete.dateOfBirth
                      )
                        ? 'bg-warning'
                        : ''
                    "
                  >
                    <td>
                      <router-link
                        :to="{
                          name: 'InscriptionDetails',
                          params: { id: certificate.inscription.id },
                        }"
                      >
                        {{ certificate.inscription.athlete.firstName }}
                        {{ certificate.inscription.athlete.lastName }}
                      </router-link>
                    </td>
                    <td
                      @click="
                        toggleCertificateModal(
                          certificates.indexOf(certificate)
                        )
                      "
                    >
                      <ValidationChips :status="certificate.status" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div class="col-4 bg-light me-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Paiements en cours</h5>
              </div>
            </div>
            <div class="row">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Statut</th>
                    <th scope="col">Prix de la course</th>
                    <th scope="col">Don</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr
                    v-for="payment in payments
                      .filter(
                        (p) =>
                          p.inscription.status !== InscriptionStatus.CANCELLED
                      )
                      .slice(0, 5)"
                    :key="payment.id"
                  >
                    <td>
                      <router-link
                        :to="{
                          name: 'PaymentDetails',
                          params: { id: payment.id },
                        }"
                      >
                        <ValidationsChipsPayment :status="payment.status" />
                      </router-link>
                    </td>
                    <td>
                      <p>{{ centimesToEuros(payment.raceAmount) }} €</p>
                    </td>
                    <td>
                      <p>{{ centimesToEuros(payment.donationAmount) }} €</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col bg-light ms-2 rounded-3 shadow-sm">
          <PaymentInTime :dataset="chartPaymentDataset"></PaymentInTime>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CertificateModalVue from "@/components/CertificateModal/CertificateModal.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import InscriptionInTime from "@/components/charts/InscriptionInTime.vue";
import PaymentInTime from "@/components/charts/PaymentInTime.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import Countdown from "@/components/countdown/Countdown.vue";
import ValidationChips from "@/components/validationChips/ValidationsChips.vue";
import ValidationsChipsPayment from "@/components/validationChips/ValidationsChipsPayment.vue";
import { Certificate, Inscription, InscriptionStatus } from "@/types/interface";
import { Payment, PaymentStatus } from "@/types/payment";
import { isAthleteMinor } from "@/utils/mixins/athlete";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    CertificateModalVue,
    InscriptionInTime,
    PaymentInTime,
    ValidationChips,
    ValidationsChipsPayment,
    Countdown,
  },

  data() {
    return {
      chartInscriptionDataset: {} as {
        labels: string[];
        data: { simple: number[]; cumulative: number[] };
      },
      chartPaymentDataset: {} as {
        labels: string[];
        data: {
          simpleRace: number[];
          cumulativeRace: number[];
          simpleDonation: number[];
          cumulativeDonation: number[];
        };
      },
      hideSideBar: false,
      showCertificateModal: false,
      inscriptions: [] as Inscription[],
      InscriptionStatus,
      certificates: [] as Certificate[],
      payments: [] as Payment[],
      validatedPaymentTotal: 0,
      donationPaymentTotal: 0,
      countLast24h: 0,
      index: 0,
    };
  },
  computed: {
    endDate() {
      return this.$store.getters["edition/getEdition"].startDate;
    },
  },
  methods: {
    isAthleteMinor,
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    toggleCertificateModal(index: number): void {
      this.index = index;
      this.showCertificateModal = !this.showCertificateModal;
    },
    centimesToEuros(cents: number) {
      return cents / 100;
    },
    async reloadTable() {
      const inscriptionsResponse = await axios.get("inscriptions/", {
        params: {
          editionId: this.$store.getters["edition/getEditionId"],
        },
      });
      if (inscriptionsResponse.status < 300) {
        this.inscriptions = inscriptionsResponse.data.data;
      }

      const certificateResponse = await axios.get("certificates/", {
        params: {
          editionId: this.$store.getters["edition/getEditionId"],
        },
      });
      if (certificateResponse.status < 300) {
        this.certificates = certificateResponse.data.data.filter(
          (certificate: Certificate) => {
            return certificate.status !== 1 && certificate.status !== 5;
          }
        );
      }

      const paymentResponse = await axios.get("payments", {
        params: {
          order: "asc",
        },
      });
      if (paymentResponse.status < 300) {
        this.payments = paymentResponse.data.data.filter((p: Payment) => {
          return (
            p.status === PaymentStatus.NOT_STARTED ||
            p.status === PaymentStatus.PENDING
          );
        });
      }

      this.getTotalPaymentAmounts();
      this.getCountLast24hInscriptions();
      this.getChartDatasetInscriptions();
      this.getChartDatasetPayments();
    },
    async getTotalPaymentAmounts() {
      const paymentResponse = await axios.get("payments/total", {
        params: {
          editionId: this.$store.getters["edition/getEditionId"],
        },
      });
      if (paymentResponse.status >= 300) return;
      if (paymentResponse.data.length === 0) return;

      this.validatedPaymentTotal = paymentResponse.data[0]._sum.raceAmount;
      this.donationPaymentTotal = paymentResponse.data[0]._sum.donationAmount;
    },
    async getCountLast24hInscriptions() {
      const lastResponse = await axios.get("inscriptions/countLast24h");
      if (lastResponse.status >= 300) return;
      this.countLast24h = lastResponse.data;
    },
    async getChartDatasetInscriptions() {
      const datasetResponse = await axios.get("inscriptions/countByDate", {
        params: { edition: this.$store.getters["edition/getEditionId"] },
      });
      if (datasetResponse.status >= 300) return;
      this.chartInscriptionDataset = datasetResponse.data;
    },
    async getChartDatasetPayments() {
      const datasetResponse = await axios.get("payment/amountByDate", {
        params: { edition: this.$store.getters["edition/getEditionId"] },
      });
      if (datasetResponse.status >= 300) return;
      this.chartPaymentDataset = datasetResponse.data;
    },
    getValidatedInscriptionsLength() {
      return this.inscriptions.filter((inscription) => {
        return inscription.status === this.InscriptionStatus.VALIDATED;
      }).length;
    },
    getPendingInscriptionsLength() {
      return this.inscriptions.filter((inscription) => {
        return inscription.status === this.InscriptionStatus.PENDING;
      }).length;
    },
    getCancelledInscriptionsLength() {
      return this.inscriptions.filter((inscription) => {
        return inscription.status === this.InscriptionStatus.CANCELLED;
      }).length;
    },
  },
  mounted() {
    this.reloadTable();
  },
});
</script>

<style></style>
