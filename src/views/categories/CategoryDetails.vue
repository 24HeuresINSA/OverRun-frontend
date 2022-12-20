<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Categories" />
    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>{{ categorie.name }} (Categorie)</h2>
        </div>
        <div class="col-6"></div>
        <div class="col-2 text-end">
          <button class="btn btn-warning">Modifier</button>
        </div>
      </div>
      <div class="row mt-4 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Description:</p>
            <p class="d-inline">
              {{ categorie.description }}
            </p></span
          >
        </div>
      </div>
      <div class="row m-2">
        <div class="col text-start">
          <span class="d-inline">
            <p class="d-inline fw-bolder me-2">Nombre minimum d'équipier:</p>
            <p class="d-inline">{{ categorie.minTeamMembers }}</p>
          </span>
        </div>
      </div>
      <div class="row m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Nombre maximum d'équipier:</p>
            <p class="d-inline">{{ categorie.maxTeamMembers }}</p>
          </span>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div
          class="col text-start border-bottom d-inline"
          @click="showRaces = !showRaces"
        >
          <h4>Courses</h4>
        </div>
      </div>

      <div v-if="showRaces" class="row m-2 bg-light rounded shadow-sm">
        <div class="col">
          <table class="table table-striped table-hover">
            <thead style="position: sticky; top: 0">
              <tr>
                <th scope="col">Course</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="race in categorie.races" :key="race.id">
                <td>
                  <router-link
                    :to="{ name: 'RaceDetails', params: { id: race.id } }"
                  >
                    {{ race.name }}
                  </router-link>
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
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import { Category } from "@/types/interface";
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
      showRaces: true,
      categorie: {} as Category,
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    async reloadTable() {
      const response = await axios.get(`categories/${this.$route.params.id}`);
      if (response.status < 300) {
        this.categorie = response.data;
      }
    },
  },
  beforeMount() {
    this.reloadTable();
  },
});
</script>

<style></style>
