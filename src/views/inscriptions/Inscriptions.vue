<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />
    <SideBar :hide="hideSideBar" activeVue="Inscriptions" />
    <!-- TODO to change -->
    <div v-show="showCertificateModal">
      <CertificateModalVue
        @hideCertificate="toggleCertificateModal"
        :inscriptions="inscriptions"
        :index="2"
      />
    </div>

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Athletes</h2>
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
          </div>
        </div>
      </div>

      <div
        class="row border-top bg-light m-2 shadow-sm"
        v-if="filterMenuActive"
      >
        <div class="row mx-2">
          <div class="col-2 p-2 text-start">
            <p class="fw-bolder mb-0">Course:</p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="race"
            >
              <option value="" disabled selected hidden>Choix course</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-2 p-2 text-start">
            <p class="fw-bolder mb-0">Status Certificat:</p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="certificateStatus"
            >
              <option value="" disabled selected hidden>Choix status</option>
              <option value="1">Validé</option>
              <option value="3">En attente</option>
              <option value="2">Rejeté</option>
            </select>
          </div>
          <div class="col-2 p-2 text-start">
            <p class="fw-bolder mb-0">Statut Payement:</p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="paymentStatus"
            >
              <option value="" disabled selected hidden>Choix status</option>
              <option value="1">Validé</option>
              <option value="3">En attente</option>
              <option value="2">Rejeté</option>
            </select>
          </div>

          <div class="col-6 p-2 text-end light">
            <button class="btn bg-secondary">Reset</button>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-4 bg-light rounded shadow-sm">
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
                <th scope="col">Prénom - Nom</th>
                <th scope="col">Course</th>
                <th scope="col">Equipe</th>
                <th scope="col">VA</th>
                <th scope="col">Certificat</th>
                <th scope="col">Payement</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inscription in inscriptions" :key="inscription.id">
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
                      params: { id: inscription.id },
                    }"
                  >
                    {{ inscription.athlete.firstName }}
                    {{ inscription.athlete.lastName }}
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'RaceDetails',
                      params: { id: inscription.race.id },
                    }"
                  >
                    {{ inscription.race.name }}
                  </router-link>
                </td>
                <td>
                  <div v-if="inscription.race">
                    <router-link
                      :to="{
                        name: 'TeamDetails',
                        params: { id: inscription.team.id },
                      }"
                    >
                      {{ inscription.team.name }}
                    </router-link>
                  </div>
                  <div v-else>-</div>
                </td>
                <td>
                  <div v-if="inscription.va">
                    <span class="material-icons-outlined"> done </span>
                  </div>
                  <div v-else>-</div>
                </td>
                <td @click="toggleCertificateModal">
                  <div v-if="inscription.certificate">
                    <div v-if="inscription.certificate.status === 1">
                      <a class="badge rounded-pill bg-success mx-1">Validé</a>
                    </div>
                    <div
                      v-else-if="
                        inscription.certificate.status > 1 &&
                        inscription.certificate.status < 5
                      "
                    >
                      <a class="badge text-dark rounded-pill bg-warning mx-1"
                        >A validé</a
                      >
                    </div>
                    <div v-else-if="inscription.certificate.status > 4">
                      <a class="badge text-dark rounded-pill bg-danger mx-1"
                        >Refusé</a
                      >
                    </div>
                  </div>
                  <div v-else>-</div>
                </td>

                <td @click="toggleCertificateModal">
                  <div v-if="inscription.payment">
                    <div v-if="inscription.payment.status === 1">
                      <a class="badge rounded-pill bg-success mx-1">Validé</a>
                    </div>
                    <div
                      v-else-if="
                        inscription.payment.status > 1 &&
                        inscription.payment.status < 5
                      "
                    >
                      <a class="badge text-dark rounded-pill bg-warning mx-1"
                        >A validé</a
                      >
                    </div>
                    <div v-else-if="inscription.payment.status > 4">
                      <a class="badge text-dark rounded-pill bg-danger mx-1"
                        >Refusé</a
                      >
                    </div>
                  </div>
                  <div v-else>-</div>
                </td>

                <td>
                  <a href="" class="badge bg-danger"> Supprimer</a>
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
import { defineComponent } from "vue";
import SideBar from "../../components/SideBar/SideBar.vue";
import TopBar from "../../components/TopBar/TopBar.vue";
import SearchBarVue from "../../components/searchBar/SearchBar.vue";
import CertificateModalVue from "../../components/CertificateModal/CertificateModal.vue";
import axios from "axios";

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Athlete {
  id: number;
  user: User;
  firstName: string;
  lastName: string;
}

export interface Team {
  id: number;
  name: string;
}

export interface VA {
  id: number;
}

export interface Race {
  id: number;
  name: string;
}

export interface Certifcate {
  id: number;
  status: number;
}

export interface Payment {
  id: number;
  status: number;
}

export interface Inscription {
  id: number;
  athlete: Athlete;
  team: Team;
  va: VA | null;
  race: Race;
  certificate: Certifcate | null;
  payment: Payment | null;
}

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
    CertificateModalVue,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      showCertificateModal: false,
      index: 0,
      races: [] as Race[],
      teams: [] as Team[],
      search: null as unknown,
      race: null,
      certificateStatus: null,
      paymentStatus: null,
      inscriptions: [] as Inscription[],
    };
  },
  methods: {
    toggleCertificateModal() {
      this.showCertificateModal = !this.showCertificateModal;
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    setSearch(search: string) {
      this.search = search;
    },
  },
  async mounted() {
    const response = await axios.get("inscriptions", {
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
      },
    });
    if (response.status < 300) {
      this.inscriptions = response.data.data;
      console.log(response);
      console.log(JSON.stringify(this.inscriptions));
    }
    console.log(response);
  },
  watch: {
    race(newRace, oldRace) {
      console.log("Hello");
    },
    certficateStatus(newStatus, oldStatus) {
      console.log("Helo");
    },
    paymentStatus(newStatus, oldStatus) {
      console.log("Hello");
    },
    search(newSearch, oldSearch) {
      console.log(this.search);
    },
  },
});
</script>

<style></style>
