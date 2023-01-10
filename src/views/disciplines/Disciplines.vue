<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Disciplines" />

    <div v-show="showDisciplineModal">
      <CreateDisciplineVue @closeDisciplineModal="toggleDisciplineModal" />
    </div>

    <ConfirmationDeletionModal
      v-show="showDeletionModal"
      @closeConfirmationDeletionModal="toggleDeletionModal(-1)"
      @confirmDeletion="deleteDiscipline(disciplineToDelete)"
    />

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Disciplines</h2>
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
              class="btn btn-primary text-light"
              @click="toggleDisciplineModal"
            >
              Ajouter discipline
            </button>
            <button type="button" class="btn bg-danger text-light">
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <div class="row border-top bg-light m-2" v-if="filterMenuActive">
        <div class="col text-start">test</div>
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
                <th scope="col">Description</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-if="disciplines.length > 0">
              <tr v-for="discipline in disciplines" :key="discipline.id">
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
                      name: 'DisciplineDetails',
                      params: { id: discipline.id },
                    }"
                  >
                    {{ discipline.name }}
                  </router-link>
                </td>
                <td>{{ discipline.description }}</td>
                <td>
                  <div class="error" v-show="hasError(discipline.id)">
                    Suppression impossible
                  </div>
                  <button
                    class="badge bg-danger"
                    @click="toggleDeletionModal(discipline.id)"
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
import CreateDisciplineVue from "@/components/modals/discipline/CreateDiscipline.vue";
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import { Discipline } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
    CreateDisciplineVue,
    ConfirmationDeletionModal,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      showDisciplineModal: false,
      showDeletionModal: false,
      search: null as unknown,
      disciplines: [] as Discipline[],
      disciplineToDelete: -1,
      disciplineError: -1,
    };
  },
  methods: {
    hasError(id: number) {
      return id === this.disciplineError;
    },
    toggleDisciplineModal() {
      this.showDisciplineModal = !this.showDisciplineModal;
      this.reloadTable();
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    toggleDeletionModal(toDelete: number) {
      this.showDeletionModal = !this.showDeletionModal;
      this.disciplineToDelete = this.showDeletionModal ? toDelete : -1;
    },
    async deleteDiscipline(id: number) {
      const response = await axios.delete("disciplines/" + id);
      if (response.status >= 300) {
        this.disciplineError = id;
        return;
      }
      this.disciplines = response.data.data;
      this.reloadTable();
    },
    async reloadTable() {
      this.disciplineError = -1;
      const response = await axios.get("disciplines", {
        params: {
          editionId: this.$store.getters["edition/getEditionId"],
          search: this.search,
        },
      });
      if (response.status < 300) {
        this.disciplines = response.data.data;
      }
    },
    setSearch(search: string) {
      this.search = search;
    },
  },
  watch: {
    search() {
      this.reloadTable();
    },
  },
  mounted() {
    this.reloadTable();
  },
});
</script>

<style>
.error {
  color: red;
}
</style>
