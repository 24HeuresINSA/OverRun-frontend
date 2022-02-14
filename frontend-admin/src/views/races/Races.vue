<template>
  <TopBar @toggleSideBar="toggleSideBar" />

  <SideBar :hide="hideSideBar" activeVue="Races" />
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
          <button type="button" class="btn btn-primary" @click="showRaceModal">
            Ajouter course
          </button>
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

    <div class="row border-top bg-light m-2" v-if="filterMenuActive">
      <div class="col text-start">test</div>
    </div>

    <div class="row m-2 mt-4 bg-light rounded">
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
                  :to="{ name: 'RaceDetails', params: { id: 'test' } }"
                >
                  Random Race
                </router-link>
              </td>
              <td>105/200</td>
              <td>7/10</td>
              <td>
                <router-link
                  :to="{ name: 'DisciplineDetails', params: { id: 'test' } }"
                >
                  <a href="" class="badge rounded-pill bg-secondary mx-1"
                    >Discipline 1</a
                  >
                </router-link>
                <router-link
                  :to="{ name: 'DisciplineDetails', params: { id: 'test' } }"
                >
                  <a href="" class="badge rounded-pill bg-secondary mx-1"
                    >Discipline 1</a
                  >
                </router-link>
                <router-link
                  :to="{ name: 'DisciplineDetails', params: { id: 'test' } }"
                >
                  <a href="" class="badge rounded-pill bg-secondary mx-1"
                    >Discipline 1</a
                  >
                </router-link>
              </td>
              <td>
                <router-link
                  :to="{ name: 'CategoryDetails', params: { id: 'test' } }"
                >
                  <a href="" class="badge rounded-pill bg-secondary mx-1"
                    >Category 1</a
                  >
                </router-link>
              </td>
              <td>12.5€</td>
              <td>12€</td>
              <td>
                <a href="" class="badge bg-danger"> Supprimer</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";

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
    showRaceModal() {
      this.$emit("showRaceModal");
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
  },
  mounted() {
    this.$emit("isActive", "Races");
  },
});
</script>

<style>
a {
  text-decoration: none;
  text-align: center;
}
</style>
