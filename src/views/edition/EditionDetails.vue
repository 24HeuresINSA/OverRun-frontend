<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="" />

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Editions</h2>
        </div>
      </div>

      <div class="row m-2 mt-4 bg-light rounded shadow-sm">
        <div class="col">
          <form class="m-2">
            <div class="row mt-4">
              <div class="col-4">
                <label for="name" class="form-label">Nom</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="edition.name"
                />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-4">
                <label for="startDate" class="form-label">Date de début</label>
                <input
                  type="dateTime-local"
                  class="form-control"
                  id="startDate"
                  v-model="edition.startDate"
                />
              </div>
              <div class="col-4">
                <label for="endDate" class="form-label">Date de fin</label>
                <input
                  type="dateTime-local"
                  class="form-control"
                  id="endDate"
                  v-model="edition.endDate"
                />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-4">
                <label for="registrationStartDate" class="form-label"
                  >Date de début des inscriptions</label
                >
                <input
                  type="dateTime-local"
                  class="form-control"
                  id="registrationStartDate"
                  v-model="edition.registrationStartDate"
                />
              </div>
              <div class="col-4">
                <label for="registrationEndDate" class="form-label"
                  >Date de fin des inscriptions</label
                >
                <input
                  type="dateTime-local"
                  class="form-control"
                  id="registrationEndDate"
                  v-model="edition.registrationEndDate"
                />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-2">
                <div
                  class="form-check form-switch d-flex align-items-center justify-content-between"
                >
                  <label for="active">Active</label>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="active"
                    v-model="edition.active"
                  />
                </div>
              </div>
            </div>

            <div class="row mt-4">
              <div class="col-4">
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="modifyEdition(edition)"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import { dateFormat } from "@/types/dateFormat";
import { Edition } from "@/types/edition";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
  },
  data() {
    return {
      hideSideBar: false,
      edition: {} as Edition,
    };
  },
  methods: {
    toggleSideBar() {
      this.hideSideBar = !this.hideSideBar;
    },
    async reloadTable() {
      const response = await axios.get(`/editions/${this.$route.params.id}`);
      if (response.status !== 200)
        return alert("Erreur lors du chargement des données");
      this.edition = {
        ...response.data,
        startDate: this.htmlImputDateTime(response.data.startDate),
        endDate: this.htmlImputDateTime(response.data.endDate),
        registrationStartDate: this.htmlImputDateTime(
          response.data.registrationStartDate
        ),
        registrationEndDate: this.htmlImputDateTime(
          response.data.registrationEndDate
        ),
      };
    },
    htmlImputDateTime(date: string) {
      return new Date(date).toISOString().slice(0, 16);
    },
    formateDate(date: string) {
      return new Date(date).toLocaleDateString("FR-fr", dateFormat);
    },
    async modifyEdition(edition: Edition) {
      const response = await axios.put(`/editions/${edition.id}`, edition);
      if (response.status !== 200)
        return alert("Erreur lors de la mise à jour de l'édition");
      if (response.status === 200) alert("Edition mise à jour");
      await this.reloadTable();
    },
  },
  async mounted() {
    await this.reloadTable();
  },
});
</script>

<style></style>
