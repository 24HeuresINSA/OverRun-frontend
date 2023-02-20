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
          <h2>Paiement</h2>
        </div>
        <div class="col-6"></div>
        <div class="col-2">
          <SearchBarVue @search="setSearch" />
        </div>
      </div>
      <div class="row m-2 mt-4">
        <div class="col text-end">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              class="btn btn-warning"
              @click="filterMenuActive = !filterMenuActive"
            >
              Filtrer
            </button>

            <button type="button" class="btn btn-danger">Supprimer</button>
            <!-- TODO sync the validated paiements as well ? -->
            <button
              type="button"
              class="badge bg-primary"
              @click="reloadTable()"
            >
              Actualiser
            </button>
          </div>
        </div>
      </div>

      <div
        class="row border-top bg-light m-2 shadow-sm"
        v-if="filterMenuActive"
      >
        <div class="row mx-2">
          <div class="col-2 p-2 text-start">
            <p class="fw-bolder mb-0">Statut:</p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="paymentStatus"
            >
              <option :value="null">Tous</option>
              <option :value="PaymentStatus.NOT_STARTED">Non crée</option>
              <option :value="PaymentStatus.PENDING">En cours</option>
              <option :value="PaymentStatus.VALIDATED">Validé</option>
              <option :value="PaymentStatus.REFUSED">Refusé</option>
              <option :value="PaymentStatus.REFUNDING">
                Remboursement en cours
              </option>
              <option :value="PaymentStatus.REFUND">Remboursé</option>
            </select>
          </div>

          <div class="col-2 p-2 text-start">
            <p class="fw-bolder mb-0">Course:</p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="raceId"
            >
              <option :value="null">Tous</option>
              <option v-for="race in races" :key="race.id" :value="race.id">
                {{ race.name }}
              </option>
            </select>
          </div>

          <div class="col-2 p-2 text-start">
            <p class="fw-bolder mb-0">Statut de l'inscription:</p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="inscriptionStatus"
            >
              <option :value="null">Tous</option>
              <option :value="InscriptionStatus.PENDING">À valider</option>
              <option :value="InscriptionStatus.VALIDATED">Validée</option>
              <option :value="InscriptionStatus.CANCELLED">Annulée</option>
            </select>
          </div>

          <div class="col-6 p-2 text-end light">
            <button class="btn bg-secondary" @click="resetFilter">Reset</button>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-4 bg-light rounded shadow">
        <div class="col">
          <table class="table table-striped table-hover">
            <thead style="position: sticky; top: 0">
              <tr>
                <th scope="col">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                    @change="selectAllRows = !selectAllRows"
                  />
                </th>
                <th scope="col">Athlète</th>
                <th scope="col">Course</th>
                <th scope="col">Montant paiement</th>
                <th scope="col">Montant donation</th>
                <th scope="col">Inscription</th>
                <th scope="col">Statut</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="payment in payments"
                :key="payment.id"
                :class="
                  isAthleteMinor(payment.inscription.athlete.dateOfBirth)
                    ? 'bg-warning'
                    : ''
                "
              >
                <th scope="row">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                    :checked="selectAllRows"
                  />
                </th>
                <td>
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
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'RaceDetails',
                      params: { id: payment.inscription.race.id },
                    }"
                  >
                    {{ payment.inscription.race.name }}
                  </router-link>
                </td>
                <td>{{ centimesToEuros(payment.raceAmount) }}</td>
                <td>{{ centimesToEuros(payment.donationAmount) }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'InscriptionDetails',
                      params: { id: payment.inscription.id },
                    }"
                  >
                    <ValidationChipsInscription
                      :status="payment.inscription.status"
                    />
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'PaymentDetails', params: { id: payment.id } }"
                  >
                    <ValidationsChipsPayment :status="payment.status" />
                  </router-link>
                </td>
                <td>
                  <button
                    class="badge bg-secondary"
                    @click="syncPayment(payment.id)"
                  >
                    Synchroniser
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import ValidationsChipsPayment from "@/components/validationChips/ValidationsChipsPayment.vue";
import ValidationChipsInscription from "@/components/validationChips/ValidationChipsInscription.vue";
import { Payment, PaymentStatus } from "@/types/payment";
import { isAthleteMinor } from "@/utils/mixins/athlete";
import axios from "axios";
import { defineComponent } from "vue";
import { InscriptionStatus, Race } from "@/types/interface";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
    ValidationsChipsPayment,
    ValidationChipsInscription,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      search: null as unknown,
      payments: [] as Payment[],
      paymentStatus: null,
      PaymentStatus,
      raceId: null,
      races: [] as Race[],
      inscriptionStatus: null,
      InscriptionStatus,
    };
  },
  methods: {
    isAthleteMinor,
    resetFilter() {
      this.paymentStatus = null;
      this.raceId = null;
      this.inscriptionStatus = null;
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    setSearch(search: string) {
      this.search = search;
    },
    centimesToEuros(price: number) {
      return price / 100;
    },
    async syncPayment(id: number) {
      const response = await axios.patch(
        "/payments/" + id + "/setstatusbyhelloasso"
      );
      if (response.status >= 300) return;
      this.reloadTable();
    },
    async reloadTable() {
      const response = await axios.get("payments", {
        params: {
          editionId: this.$store.getters["edition/getEditionId"],
          order: "asc",
          search: this.search,
          status: this.paymentStatus,
          raceId: this.raceId,
          inscriptionStatus: this.inscriptionStatus,
        },
      });
      if (response.status < 300) {
        this.payments = response.data.data;
      }
    },
  },
  async mounted() {
    this.reloadTable();

    const response = await axios.get("races", {
      params: {
        editionId: this.$store.getters["edition/getEditionId"],
      },
    });
    if (response.status !== 200) return;
    this.races = response.data.data;
  },
  watch: {
    search() {
      this.reloadTable();
    },
    paymentStatus() {
      this.reloadTable();
    },
    raceId() {
      this.reloadTable();
    },
    inscriptionStatus() {
      this.reloadTable();
    },
  },
});
</script>

<style></style>
