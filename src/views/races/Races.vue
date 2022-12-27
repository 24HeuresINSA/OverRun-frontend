<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Races" />

    <div v-show="showRaceModal">
      <CreateRaceModalVue @closeRaceModal="toggleRaceModal" />
    </div>

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
                  {{ race.inscriptions.length }}/{{ race.maxParticipants }}
                </td>
                <td>{{ race.teams.length }}/{{ race.maxTeams }}</td>
                <td>
                  <router-link
                    v-for="discipline in race.disciplines"
                    :key="discipline.id"
                    :to="{
                      name: 'DisciplineDetails',
                      params: { id: discipline.discipline.id },
                    }"
                  >
                    <a href="" class="badge rounded-pill bg-secondary mx-1">{{
                      discipline.discipline.name
                    }}</a>
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
                <td>{{ race.registrationPrice }}</td>
                <td>{{ race.vaRegistrationPrice }}</td>
                <td>
                  <a
                    href=""
                    class="badge bg-danger"
                    @click.prevent="deleteRace(race.id)"
                  >
                    Supprimer</a
                  >
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
import CreateRaceModalVue from "@/components/modals/CreateRaceModal.vue";
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
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
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      showRaceModal: false,
      search: null as unknown,
      races: [] as Race[],
      race: null,
      teams: [{ id: 0, name: 0, members: [] }],
    };
  },
  methods: {
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
      if (response.status < 300) {
        this.reloadTable();
      }
    },
    async reloadTable() {
      const response = await axios.get("races", {
        params: {
          editionId: this.$store.getters.getEditionId,
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
</style>
