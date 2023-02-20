<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Teams" />

    <ConfirmationDeletionModal
      v-show="showDeletionModal"
      @closeConfirmationDeletionModal="toggleDeletionModal(-1)"
      @confirmDeletion="deleteTeam(teamToDelete)"
    />

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Equipes</h2>
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
              v-model="raceId"
            >
              <option :value="null">Tous</option>
              <option v-for="race in races" :key="race.id" :value="race.id">
                {{ race.name }}
              </option>
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
                <th scope="col">Course</th>
                <th scope="col">Membres</th>
                <th scope="col">Inscriptions Complétées</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="team in teams" :key="team.id">
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
                    :to="{ name: 'TeamDetails', params: { id: team.id } }"
                  >
                    {{ team.name }}
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'RaceDetails', params: { id: team.race.id } }"
                  >
                    {{ team.race.name }}
                  </router-link>
                </td>
                <td>
                  {{
                    team.members.filter(
                      (member) => member.status !== InscriptionStatus.CANCELLED
                    ).length
                  }}/{{ team.race.category.maxTeamMembers }}
                </td>
                <td>
                  {{ getValidatedInscriptions(team) }}/
                  {{
                    team.members.filter(
                      (member) => member.status !== InscriptionStatus.CANCELLED
                    ).length
                  }}
                </td>
                <td>
                  <div class="error" v-show="hasError(team.id)">
                    Suppression impossible
                  </div>
                  <button
                    class="badge bg-danger"
                    @click="toggleDeletionModal(team.id)"
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
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import { Team, InscriptionStatus, Race } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
    ConfirmationDeletionModal,
  },
  data() {
    return {
      showDeletionModal: false,
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      search: null as unknown,
      teams: [] as Team[],
      teamToDelete: -1,
      teamError: -1,
      InscriptionStatus,
      raceId: null,
      races: [] as Race[],
    };
  },
  methods: {
    hasError(id: number) {
      return id === this.teamError;
    },
    toggleDeletionModal(toDelete: number) {
      this.showDeletionModal = !this.showDeletionModal;
      this.teamToDelete = this.showDeletionModal ? toDelete : -1;
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    setSearch(search: string) {
      this.search = search;
      this.reloadTable();
    },
    deleteTeam(id: number) {
      // TODO : call API
      this.teamError = id;
    },
    async reloadTable() {
      this.teamError = -1;
      const response = await axios.get("teams", {
        params: {
          editionId: this.$store.getters["edition/getEditionId"],
          search: this.search,
          raceId: this.raceId,
        },
      });
      if (response.status < 300) {
        this.teams = response.data.data;
      }
    },
    getValidatedInscriptions(team: Team) {
      let nbValidatedInscriptions = 0;
      team.members.forEach((member, index) => {
        if (member.status === InscriptionStatus.VALIDATED) {
          nbValidatedInscriptions += 1;
        }
      });
      return nbValidatedInscriptions;
    },
  },
  async beforeMount() {
    this.reloadTable();

    const response = await axios.get("races", {
      params: {
        editionId: this.$store.getters["edition/getEditionId"],
        minTeamMembers: 2,
      },
    });
    if (response.status !== 200) return;
    this.races = response.data.data;
  },
  watch: {
    raceId() {
      this.reloadTable();
    },
  },
});
</script>

<style>
.error {
  color: red;
}
</style>
