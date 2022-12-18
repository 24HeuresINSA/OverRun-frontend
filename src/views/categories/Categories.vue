<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Categories" />

    <div v-show="showCategoryModal">
      <CreateCategoryVue @closeCategoryModal="toggleCategoryModal" />
    </div>

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Categorie</h2>
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
              @click="toggleCategoryModal"
            >
              Ajouter categorie
            </button>
            <button type="button" class="btn btn-danger">Supprimer</button>
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
                <th scope="col">Nombre d'équipiers</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody v-if="categories.length > 0">
              <tr v-for="category in categories" :key="category.id">
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
                    :to="{ name: 'CategoryDetails', params: { id: 'test' } }"
                  >
                    {{ category.name }}
                  </router-link>
                </td>
                <td>
                  <div
                    v-if="
                      category.minTeamMembers === 1 &&
                      category.maxTeamMembers === 1
                    "
                  >
                    1
                  </div>
                  <div v-else>
                    {{ category.minTeamMembers }}-{{ category.maxTeamMembers }}
                  </div>
                </td>
                <td>
                  <a
                    href=""
                    class="badge bg-danger"
                    @click.prevent="deleteCategory(category.id)"
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
import { defineComponent } from "vue";
import SearchBarVue from "../../components/searchBar/SearchBar.vue";
import SideBar from "../../components/SideBar/SideBar.vue";
import TopBar from "../../components/TopBar/TopBar.vue";
import CreateCategoryVue from "../../components/modals/CreateCategory.vue";
import axios from "axios";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
    CreateCategoryVue,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      showCategoryModal: false,
      categories: [
        {
          id: 0,
          name: "",
          description: "",
          maxTeamMembers: 0,
          minTeamMembers: 0,
        },
      ],
      search: null as unknown,
    };
  },
  methods: {
    toggleCategoryModal() {
      this.showCategoryModal = !this.showCategoryModal;
      this.reloadTable();
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    async deleteCategory(id: number) {
      const response = await axios.delete("categories/" + id, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
        },
      });
      if (response.status < 300) {
        this.reloadTable();
      }
    },
    async reloadTable() {
      const response = await axios.get("categories", {
        params: {
          search: this.search,
        },
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
        },
      });
      if (response.status < 300) {
        this.categories = response.data.data;
        console.log(response);
        console.log(JSON.stringify(this.categories));
      }
    },
    async setSearch(search: string) {
      this.search = search;
      this.reloadTable();
    },
  },
  async mounted() {
    const response = await axios.get("categories", {
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
      },
    });
    if (response.status < 300) {
      this.categories = response.data.data;
      console.log(response);
      console.log(JSON.stringify(this.categories));
    }
    console.log(response);
  },
});
</script>

<style></style>
