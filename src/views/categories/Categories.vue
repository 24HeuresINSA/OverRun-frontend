<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Categories" />

    <div v-show="showCategoryModal">
      <CreateCategoryVue @closeCategoryModal="toggleCategoryModal" />
    </div>

    <ConfirmationDeletionModal
      v-show="showDeletionModal"
      @closeConfirmationDeletionModal="toggleDeletionModal(-1)"
      @confirmDeletion="deleteCategory(categoryToDelete)"
    />

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
                    :to="{
                      name: 'CategoryDetails',
                      params: { id: category.id },
                    }"
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
                  <div class="error" v-show="error">Suppression impossible</div>
                  <button
                    class="badge bg-danger"
                    @click="toggleDeletionModal(category.id)"
                  >
                    <!-- @click.prevent="deleteCategory(category.id)" -->
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
import CreateCategoryVue from "@/components/modals/category/CreateCategory.vue";
import ConfirmationDeletionModal from "@/components/modals/ConfirmDeletionModal.vue";
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import { Category } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
    CreateCategoryVue,
    ConfirmationDeletionModal,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      showCategoryModal: false,
      showDeletionModal: false,
      categories: [] as Category[],
      search: null as unknown,
      categoryToDelete: -1,
      error: false,
    };
  },
  methods: {
    toggleCategoryModal() {
      this.showCategoryModal = !this.showCategoryModal;
      this.reloadTable();
    },
    toggleDeletionModal(toDelete: number) {
      this.showDeletionModal = !this.showDeletionModal;
      this.categoryToDelete = this.showDeletionModal ? toDelete : -1;
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    async deleteCategory(id: number) {
      const response = await axios.delete("categories/" + id);
      this.error = response.status >= 300;
      if (this.error) return;
      this.reloadTable();
    },
    async reloadTable() {
      const response = await axios.get("categories", {
        params: {
          editionId: this.$store.getters["edition/getEditionId"],
          search: this.search,
        },
      });
      if (response.status < 300) {
        this.categories = response.data.data;
      }
    },
    async setSearch(search: string) {
      this.search = search;
      this.reloadTable();
    },
  },
  async mounted() {
    this.reloadTable();
  },
});
</script>

<style>
.error {
  color: red;
}
</style>
