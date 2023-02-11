<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Home" />

    <CertificateModalVue
      v-show="showCertificateModal"
      @hideCertificate="toggleCertificateModal"
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
              <div class="col-8 border-end">
                <h1 class="mb-0">{{ inscriptions.length }}</h1>
              </div>
              <div class="col-4 text-success">
                <h2 class="d-block m-auto">+idk</h2>
                <div class="form-text d-block">last 24 h</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col bg-light mx-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3 pb-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Status Inscriptions</h5>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-6 text-success">
                <h2 class="d-block m-auto">
                  {{ getValidatedInscriptionsLength() }}
                </h2>
                <div class="form-text d-block">Validé</div>
              </div>
              <div class="col-6 text-danger">
                <h2 class="d-block m-auto">
                  {{ getNotValidatedInscriptionsLength() }}
                </h2>
                <div class="form-text d-block">Non validé</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col bg-light mx-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5></h5>
              </div>
            </div>
            <div class="row pt-3"></div>
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
              <div class="col-8 border-end">
                <h1>idk €</h1>
              </div>
              <div class="col-4 text-danger">
                <h4 class="d-block m-auto">idk €</h4>
                <div class="form-text d-block">manquants</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div class="col bg-light me-2 rounded-3 shadow-sm"></div>
        <div class="col-5 bg-light ms-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Certificats à valider ({{ certificates.length }})</h5>
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
                    v-for="certificate in certificates.slice(0, 5)"
                    :key="certificate.id"
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
                  <tr v-for="payment in payments.slice(0, 5)" :key="payment.id">
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
        <div class="col bg-light ms-2 rounded-3 shadow-sm"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CertificateModalVue from "@/components/CertificateModal/CertificateModal.vue";
// import Doughnut from "@/components/charts/Doughnut.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import ValidationChips from "@/components/validationChips/ValidationsChips.vue";
import ValidationsChipsPayment from "@/components/validationChips/ValidationsChipsPayment.vue";
import { Certificate, Inscription, InscriptionStatus } from "@/types/interface";
import { Payment, PaymentStatus } from "@/types/payment";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    CertificateModalVue,
    // Doughnut,
    ValidationChips,
    ValidationsChipsPayment,
  },

  data() {
    return {
      hideSideBar: false,
      showCertificateModal: false,
      inscriptions: [] as Inscription[],
      InscriptionStatus,
      certificates: [] as Certificate[],
      payments: [] as Payment[],
      index: 0,
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Green", "Red", "Blue"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [1, 10, 5],
          },
        ],
      },
    };
  },
  methods: {
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
      const inscriptionsResponse = await axios.get("inscriptions/");
      if (inscriptionsResponse.status < 300) {
        this.inscriptions = inscriptionsResponse.data.data;
      }

      const certificateResponse = await axios.get("certificates/");
      if (certificateResponse.status < 300) {
        this.certificates = certificateResponse.data.data.filter(
          (certificate: Certificate) => {
            return certificate.status !== 1;
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
    },
    getValidatedInscriptionsLength() {
      return this.inscriptions.filter((inscription) => {
        return inscription.status === this.InscriptionStatus.VALIDATED;
      }).length;
    },
    getNotValidatedInscriptionsLength() {
      return this.inscriptions.filter((inscription) => {
        return inscription.status !== this.InscriptionStatus.VALIDATED;
      }).length;
    },
  },
  mounted() {
    this.reloadTable();
  },
});
</script>

<style></style>
