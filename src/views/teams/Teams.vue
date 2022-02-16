<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Teams" />
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
          <SearchBarVue />
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

      <div class="row border-top bg-light m-2 shadow-sm" v-if="filterMenuActive">
         <div class="row mx-2">
           <div class="col-2 p-2 text-start">
          <p class="fw-bolder mb-0">Course:</p>
          <select class="form-select" aria-label="Default select example">
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
                <th scope="col">Course</th>
                <th scope="col">Membres</th>
                <th scope="col">Inscriptions Complétées</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                    :to="{ name: 'TeamDetails', params: { id: 'test' } }"
                  >
                    Random Team
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{ name: 'RaceDetails', params: { id: 'test' } }"
                  >
                    Random Race
                  </router-link>
                </td>
                <td>7/10</td>
                <td>5/7</td>
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
import SearchBarVue from "../../components/searchBar/SearchBar.vue";
import SideBar from "../../components/SideBar/SideBar.vue";
import TopBar from "../../components/TopBar/TopBar.vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
  },
  mounted() {},
});
</script>

<style></style>
