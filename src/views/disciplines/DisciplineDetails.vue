<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Disciplines" />
    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>{{ discipline.name }} (Discipline)</h2>
        </div>
        <div class="col-6"></div>
        <div class="col-2 text-end">
          <button class="btn btn-warning" @click="toogleDisciplineModal">
            Modifier
          </button>
        </div>
      </div>
      <div class="row mt-4 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Description:</p>
            <p class="d-inline">
              {{ discipline.description }}
            </p></span
          >
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div class="col text-start border-bottom d-inline">
          <h4>Courses</h4>
        </div>
      </div>

      <div class="row m-2 bg-light rounded shadow-sm">
        <div class="col">
          <table class="table table-striped table-hover">
            <thead style="position: sticky; top: 0">
              <tr>
                <th scope="col">Course</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="race in discipline.races" :key="race.race.id">
                <td>
                  <router-link
                    :to="{ name: 'RaceDetails', params: { id: race.race.id } }"
                  >
                    {{ race.race.name }}
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <UpdateDiscipline
      :discipline="discipline"
      v-show="showUpdateDisciplineModal"
      @closeDisciplineModal="toogleDisciplineModal"
    />
  </div>
</template>

<script lang="ts">
import UpdateDiscipline from "@/components/modals/discipline/UpdateDiscipline.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import { Discipline } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    UpdateDiscipline,
  },
  data() {
    return {
      hideSideBar: false,
      discipline: {} as Discipline,
      showUpdateDisciplineModal: false,
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    toogleDisciplineModal(): void {
      this.showUpdateDisciplineModal = !this.showUpdateDisciplineModal;
    },
    async reloadTable() {
      const response = await axios.get(`disciplines/${this.$route.params.id}`);
      if (response.status < 300) {
        this.discipline = response.data;
      }
    },
  },
  beforeMount() {
    this.reloadTable();
  },
});
</script>

<style></style>
