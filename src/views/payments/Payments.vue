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
            <p class="fw-bolder mb-0">Status:</p>
            <select class="form-select" aria-label="Default select example">
              <option value="" disabled selected hidden>Choix status</option>
              <option value="1">Validé</option>
              <option value="2">A validé</option>
            </select>
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
      PaymentStatus,
    };
  },
  methods: {
    isAthleteMinor,
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
        },
      });
      if (response.status < 300) {
        this.payments = response.data.data;
      }
    },
  },
  mounted() {
    this.reloadTable();
  },
  watch: {
    search() {
      this.reloadTable();
    },
  },
});
</script>

<style></style>
