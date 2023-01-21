<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Payments" />
    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Paiement #{{ payment.id }} (Paiement)</h2>
        </div>
        <div class="col-6"></div>
        <div class="col-2 text-end">
          <button class="btn btn-primary" @click="syncPayment(payment.id)">
            Synchroniser
          </button>
        </div>
      </div>
      <div class="row mt-4 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Athlète:</p>
            <p class="d-inline" v-show="payment.inscription">
              <router-link
                :to="{
                  name: 'InscriptionDetails',
                  params: { id: payment.inscription.athlete.id },
                }"
              >
                {{
                  payment.inscription.athlete.firstName +
                  " " +
                  payment.inscription.athlete.lastName
                }}
              </router-link>
            </p></span
          >
        </div>
      </div>
      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Carte VA:</p>
            <p class="d-inline">
              <span
                class="material-icons-outlined"
                style="color: green"
                v-if="payment.inscription.va"
              >
                done
              </span>
              <span class="material-icons-outlined" v-else style="color: red">
                close
              </span>
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline">
            <div class="d-inline fw-bolder me-2">
              Statut:
              <ValidationsChipsPayment :status="payment.status" />
            </div>
          </span>
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Course:</p>
            <p class="d-inline">
              <router-link
                :to="{
                  name: 'RaceDetails',
                  params: { id: payment.inscription.race.id },
                }"
              >
                {{ payment.inscription.race.name }}
              </router-link>
            </p></span
          >
        </div>
      </div>
      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">
              Montant du don pour la course caritative:
            </p>
            <p class="d-inline">
              {{ centimesToEuros(payment.donationAmount) }}€
            </p></span
          >
        </div>
      </div>
      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Prix de la course:</p>
            <p class="d-inline">
              {{ centimesToEuros(payment.raceAmount) }}
              €
            </p></span
          >
        </div>
      </div>

      <div
        v-show="payment.status !== PaymentStatus.NOT_STARTED"
        class="row mt-2 m-2"
      >
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Montant total réglé:</p>
            <p class="d-inline">
              {{ centimesToEuros(payment.totalAmount) }}€
            </p></span
          >
        </div>
      </div>

      <div
        v-show="payment.status === PaymentStatus.PENDING"
        class="row mt-2 m-2"
      >
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">
              Expiration du lien de paiement:
            </p>
            <p class="d-inline">
              {{ payment.helloassoCheckoutExpiresAt }}
            </p></span
          >
        </div>
      </div>
      <div v-show="payment.helloassoPaymentReceiptUrl" class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Reçu HelloAsso</p>
            <p class="d-inline">
              <a
                :href="payment.helloassoPaymentReceiptUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ payment.helloassoPaymentReceiptUrl }}
              </a>
            </p></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import ValidationsChipsPayment from "@/components/validationChips/ValidationsChipsPayment.vue";
import { Payment, PaymentStatus } from "@/types/payment";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    ValidationsChipsPayment,
  },
  data() {
    return {
      hideSideBar: false,
      payment: {} as Payment,
      PaymentStatus,
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    async syncPayment(id: number) {
      const response = await axios.patch(
        "/payments/" + id + "/setstatusbyhelloasso"
      );
      if (response.status >= 300) return;
      this.loadPayment();
    },
    centimesToEuros(cents: number) {
      return cents / 100;
    },
    async loadPayment() {
      const response = await axios.get(`payments/${this.$route.params.id}`);
      console.log(response);
      if (response.status >= 300) return;
      this.payment = response.data;
    },
  },
  beforeMount() {
    this.loadPayment();
  },
});
</script>

<style></style>
