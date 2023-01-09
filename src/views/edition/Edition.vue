<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="" />
    <CreationEditionModal @closeCreationEditionModal="toggleCreationEditionModal"
      v-show="showCreationEditionModal"
      @createdEditionSuccess="reloadTable"/> 

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Editions</h2>
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
              @click="toggleCreationEditionModal"
            >
              Ajouter édition
            </button>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-4 bg-light rounded shadow-sm">
        <div class="col">
          <table class="table table-striped table-hover">
            <thead style="position: sticky; top: 0">
              <tr>
                <th>Nom</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Date de début des inscriptions</th>
                <th>Date de fin des inscriptions</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="edition in editions" :key="edition.id">
                <td>
                  <router-link
                    :to="{
                      name: 'EditionsDetails',
                      params: { id: edition.id },
                    }"
                  >
                    {{ edition.name }}
                  </router-link>
                </td>
                <td>{{ formateDate(edition.startDate) }}</td>
                <td>{{ formateDate(edition.endDate) }}</td>
                <td>{{ formateDate(edition.registrationStartDate) }}</td>
                <td>{{ formateDate(edition.registrationEndDate) }}</td>
                <td>{{ edition.active ? "Oui" : "Non" }}</td>
                <td>
                  <a
                    href=""
                    class="badge bg-danger"
                    @click.prevent="toogleActiveEdition(edition)"
                  >
                    {{ edition.active ? "Désactiver" : "Activer" }}</a
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
import CreationEditionModal from "@/components/modals/CreateEditionModal.vue";
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
    CreationEditionModal,
  },
  data() {
    return {
      hideSideBar: false,
      editions: [] as Edition[],
      showCreationEditionModal: false,
    };
  },
  methods: {
    toggleSideBar() {
      this.hideSideBar = !this.hideSideBar;
    },
    toggleCreationEditionModal() {
      this.showCreationEditionModal = !this.showCreationEditionModal;
    },
    async reloadTable() {
      const response = await axios.get("/editions");
      if (response.status !== 200)
        return alert("Erreur lors du chargement des données");
      this.editions = response.data.data;
    },
    formateDate(date: string) {
      return new Date(date).toLocaleDateString("FR-fr", dateFormat);
    },
    async toogleActiveEdition(edition: Edition) {
      const newEdition = { ...edition, active: !edition.active };
      const response = await axios.put(`/editions/${edition.id}`, newEdition);
      if (response.status !== 200)
        return alert("Erreur lors de la mise à jour de l'édition");
      await this.reloadTable();
    },
  },
  async mounted() {
    await this.reloadTable();
  },
});
</script>

<style></style>
