<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="AdminInvites" />

    <div v-show="showAdminInviteModal">
      <CreateAdminInviteVue @closeAdminInviteModal="toggleAdminInviteModal" />
    </div>

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Invitations administrateur</h2>
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
                <th scope="col">Email</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="adminInvite in adminInvites" :key="adminInvite.id">
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
                    {{ adminInvite.email}}
                </td>
                <td>
                  <a href="" class="badge bg-danger" @click.prevent="deleteAdminInvite(adminInvite.id)"> Supprimer</a>
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
import CreateAdminInviteVue from "../../components/modals/CreateAdminInvite.vue";
import SearchBarVue from "../../components/searchBar/SearchBar.vue";
import axios from "axios";

export interface AdminInvite {
  id: number,
  email: string
}

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    CreateAdminInviteVue,
    SearchBarVue,
  },
  data() {
    return {
      hideSideBar: false,
      showAdminInviteModal: false,
      search: null as unknown,
      adminInvites: [] as AdminInvite[],
      selectAllRows: false,
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    toggleAdminInviteModal() {
      this.showAdminInviteModal = !this.showAdminInviteModal;
      this.reloadTable();
    },
    async deleteAdminInvite(id: number) {
      console.log(this.$store.getters.getAccessToken);
      const response = await axios.delete("adminInvitations/" + id,
      {
          headers: { Authorization : `Bearer ${this.$store.getters.getAccessToken}`}
      });
      if (response.status < 300) {
          this.reloadTable()
      }
    }, 
    async reloadTable() {
      console.log(this.$store.getters.getAccessToken);
      const response = await axios.get("adminInvitations",
      {
          headers: { Authorization : `Bearer ${this.$store.getters.getAccessToken}`}
      });
      if (response.status < 300) {
         this.adminInvites = response.data.data;
          console.log(JSON.stringify(this.adminInvites))
      }
    },
    setSearch(search: string) {
      this.search = search;
    }
  },
  mounted() {
    this.reloadTable();
  },
  watch: {
    search(newValue, oldValue){
      console.log(this.search)
    },

  }
});
</script>


<style>
</style>
