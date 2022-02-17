<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Disciplines" />

    <div v-show="showDisciplineModal">
      <CreateDisciplineVue @closeDisciplineModal="toggleDisciplineModal" />
    </div>

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
          <SearchBarVue @search="setSearch"/>
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
            <tbody v-if="disciplines.length > 0 ">
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
                    :to="{ name: 'DisciplineDetails', params: { id: 'test' } }"
                  >
                    {{ discipline.name}}
                  </router-link>
                </td>
                <td>{{ discipline.description}}</td>
                <td>
                  <a href="" class="badge bg-danger" @click.prevent="deleteDiscipline(discipline.id)"> Supprimer</a>
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
import SideBar from "../../components/SideBar/SideBar.vue";
import TopBar from "../../components/TopBar/TopBar.vue";
import SearchBarVue from "../../components/searchBar/SearchBar.vue";
import CreateDisciplineVue from "../../components/modals/CreateDiscipline.vue";
import axios from "axios";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
    CreateDisciplineVue,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      showDisciplineModal: false,
      search: null as unknown,
      disciplines: [
        { id: 0 , name: "", description: ""}
      ],
    };
  },
  methods: {
    toggleDisciplineModal() {
      this.showDisciplineModal = !this.showDisciplineModal;
      this.reloadTable();
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    async deleteDiscipline(id: number) {
      console.log(this.$store.getters.getAccessToken);
      const response = await axios.delete("disciplines/" + id,
      {
          headers: { Authorization : `Bearer ${this.$store.getters.getAccessToken}`}
      });
      if (response.status < 300) {
         this.disciplines = response.data.data;
          console.log(response);
          console.log(JSON.stringify(this.disciplines))
          this.reloadTable()
      }
    }, 
    async reloadTable() {
      console.log(this.$store.getters.getAccessToken);
      const response = await axios.get("disciplines",
      {
          headers: { Authorization : `Bearer ${this.$store.getters.getAccessToken}`}
      });
      if (response.status < 300) {
         this.disciplines = response.data.data;
          console.log(response);
          console.log(JSON.stringify(this.disciplines))
      }
    },
    setSearch(search: string){
      this.search=search;
    }
  },
  watch: {
    search(newSearch, oldSearch) {
      console.log(this.search)
    }
  },
  async mounted () {
    console.log(this.$store.getters.getAccessToken);
      const response = await axios.get("disciplines",
      {
          headers: { Authorization : `Bearer ${this.$store.getters.getAccessToken}`}
      });
      if (response.status < 300) {
         this.disciplines = response.data.data;
          console.log(response);
          console.log(JSON.stringify(this.disciplines))
      }
  }
});
</script>

<style>
</style>