<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Admins" />

    <ConfirmationDeletionModal
      v-show="showDeletionModal"
      @closeConfirmationDeletionModal="toggleDeletionModal(-1)"
      @confirmDeletion="deleteAdmin(adminToDelete)"
    />

    <div v-show="showAdminInviteModal">
      <CreateAdminInviteVue @closeAdminInviteModal="toggleAdminInviteModal" />
    </div>

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Administrateurs</h2>
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
              @click="toggleAdminInviteModal"
            >
              Ajouter un administrateur
            </button>
            <button type="button" class="btn btn-danger">Supprimer</button>
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
                <th scope="col">Pseudo</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="admin in admins" :key="admin.id">
                <th scope="row">
                  <input
                    class="form-check-input mt-0"
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                    :checked="selectAllRows"
                  />
                </th>
                <td class="text-black">
                  {{ admin.user.username }}
                </td>
                <td>
                  {{ admin.user.email }}
                </td>
                <td>
                  <div class="error" v-show="hasError(admin.id)">
                    Suppression impossible
                  </div>
                  <button
                    class="badge bg-danger"
                    @click="toggleDeletionModal(admin.id)"
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
import CreateAdminInviteVue from "@/components/modals/CreateAdminInvite.vue";
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import axios from "axios";
import { defineComponent } from "vue";

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Admin {
  id: number;
  user: User;
}

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    CreateAdminInviteVue,
    SearchBarVue,
    ConfirmationDeletionModal,
  },
  data() {
    return {
      hideSideBar: false,
      showAdminInviteModal: false,
      showDeletionModal: false,
      selectAllRows: false,
      search: null as unknown,
      admins: [] as Admin[],
      adminToDelete: -1,
      adminError: -1,
    };
  },
  methods: {
    hasError(id: number) {
      return id === this.adminError;
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    toggleDeletionModal(toDelete: number) {
      this.showDeletionModal = !this.showDeletionModal;
      this.adminToDelete = this.showDeletionModal ? toDelete : -1;
    },
    toggleAdminInviteModal() {
      this.showAdminInviteModal = !this.showAdminInviteModal;
    },
    async deleteAdmin(id: number) {
      const response = await axios.delete("admins/" + id);
      if (response.status >= 300) {
        this.adminError = id;
        return;
      }
      this.reloadTable();
    },
    async reloadTable() {
      this.adminError = -1;
      const response = await axios.get("admins", {
        params: {
          search: this.search,
        },
      });
      if (response.status < 300) {
        this.admins = response.data.data;
      }
    },
    setSearch(search: string) {
      this.search = search;
    },
  },
  mounted() {
    this.reloadTable();
  },
  watch: {
    search(newSearch, oldSearch) {
      this.reloadTable();
    },
  },
});
</script>

<style>
.error {
  color: red;
}
</style>
