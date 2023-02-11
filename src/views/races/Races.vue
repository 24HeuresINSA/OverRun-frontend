<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Races" />

    <div v-show="showRaceModal">
      <CreateRaceModalVue @closeRaceModal="toggleRaceModal" />
    </div>

    <ConfirmationDeletionModal
      v-show="showDeletionModal"
      @closeConfirmationDeletionModal="toggleDeletionModal(-1)"
      @confirmDeletion="deleteRace(raceToDelete)"
    />

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Courses</h2>
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
              class="btn btn-primary"
              @click="toggleRaceModal"
            >
              Ajouter course
            </button>
            <!-- <button
              type="button"
              class="btn btn-warning"
              @click="filterMenuActive = !filterMenuActive"
            >
              Filtrer
            </button> -->
            <button type="button" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
      </div>

      <div class="row border-top bg-light m-2 shadow" v-if="filterMenuActive">
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
                <th scope="col">Nom</th>
                <th scope="col">Nombre participants</th>
                <th scope="col">Nombre équipes</th>
                <th scope="col">Disciplines</th>
                <th scope="col">Categories</th>
                <th scope="col">Tarif</th>
                <th scope="col">Tarif VA</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="race in races" :key="race.id">
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
                    :to="{ name: 'RaceDetails', params: { id: race.id } }"
                  >
                    {{ race.name }}
                  </router-link>
                </td>
                <td>
                  {{
                    race.inscriptions.filter(
                      (i) => i.status !== InscriptionStatus.CANCELLED
                    ).length
                  }}/{{ race.maxParticipants }}
                </td>
                <td>{{ race.teams.length }}/{{ race.maxTeams }}</td>
                <td>
                  <router-link
                    v-for="raceDiscipline in race.disciplines"
                    :key="raceDiscipline.id"
                    :to="{
                      name: 'DisciplineDetails',
                      params: { id: raceDiscipline.discipline.id },
                    }"
                  >
                    <a href="" class="badge rounded-pill bg-secondary mx-1"
                      >{{ raceDiscipline.discipline.name }} ({{
                        raceDiscipline.duration
                      }}h)</a
                    >
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'CategoryDetails',
                      params: { id: race.category.id },
                    }"
                  >
                    <a href="" class="badge rounded-pill bg-secondary mx-1">{{
                      race.category.name
                    }}</a>
                  </router-link>
                </td>
                <td>{{ centimesToEuros(race.registrationPrice) }}</td>
                <td>{{ centimesToEuros(race.vaRegistrationPrice) }}</td>
                <td>
                  <div class="error" v-show="hasError(race.id)">
                    Suppression impossible
                  </div>
                  <button
                    class="badge bg-danger"
                    @click="toggleDeletionModal(race.id)"
                  >
                    Supprimer
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
import ConfirmationDeletionModal from "@/components/modals/ConfirmDeletionModal.vue";
import CreateRaceModalVue from "@/components/modals/CreateRaceModal.vue";
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import { InscriptionStatus } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export interface Discipline {
  id: number;
  name: string;
}

export interface RaceDiscipline {
  id: number;
  discipline: Discipline;
  duration: number;
}

export interface Category {
  id: number;
  name: number;
}

export interface Inscription {
  id: number;
  status: InscriptionStatus;
}

export interface Team {
  id: number;
}

export interface Race {
  id: number;
  name: string;
  registrationPrice: number;
  vaRegistrationPrice: number;
  disciplines: RaceDiscipline[];
  maxParticipants: number;
  maxTeams: number;
  teams: Team[];
  inscriptions: Inscription[];
  category: Category;
}

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
    CreateRaceModalVue,
    ConfirmationDeletionModal,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      showRaceModal: false,
      showDeletionModal: false,
      search: null as unknown,
      races: [] as Race[],
      race: null,
      teams: [{ id: 0, name: 0, members: [] }],
      raceToDelete: -1,
      raceError: -1,
      InscriptionStatus,
    };
  },
  methods: {
    hasError(id: number) {
      return id === this.raceError;
    },
    centimesToEuros(price: number) {
      return price / 100;
    },
    toggleDeletionModal(toDelete: number) {
      this.showDeletionModal = !this.showDeletionModal;
      this.raceToDelete = this.showDeletionModal ? toDelete : -1;
    },
    toggleRaceModal() {
      this.showRaceModal = !this.showRaceModal;
      this.reloadTable();
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    setSearch(search: string) {
      this.search = search;
      this.reloadTable();
    },
    async deleteRace(id: number) {
      const response = await axios.delete("races/" + id);
      if (response.status >= 300) {
        this.raceError = id;
        return;
      }
      this.reloadTable();
    },
    async reloadTable() {
      this.raceError = -1;
      const response = await axios.get("races", {
        params: {
          editionId: this.$store.getters["edition/getEditionId"],
          search: this.search,
        },
      });
      if (response.status < 300) {
        this.races = response.data.data;
      }
    },
  },
  mounted() {
    this.reloadTable();
  },
});
</script>

<style>
a {
  text-decoration: none;
  text-align: center;
}
.error {
  color: red;
}
</style>
