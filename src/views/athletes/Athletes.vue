<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Athletes" />
    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Utilisateurs</h2>
        </div>
        <div class="col-6"></div>
        <div class="col-2">
          <SearchBarVue @search="setSearch" />
        </div>
      </div>
      <div class="row m-2 mt-4">
        <div class="col text-end">
          <button type="button" class="btn btn-danger">Supprimer</button>
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
                <th scope="col">Pseudo</th>
                <th scope="col">Prénom - Nom</th>
                <th scope="col">Email</th>
                <th scope="col">Télephone</th>
                <th scope="col">Dernière inscription</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="athlete in athletes" :key="athlete.id">
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
                    :to="{ name: 'AthleteDetails', params: { id: athlete.id } }"
                  >
                    {{ athlete.user.username }}
                  </router-link>
                </td>
                <td>{{ athlete.firstName }} {{ athlete.lastName }}</td>
                <td>{{ athlete.user.email }}</td>
                <td>
                  {{ athlete.phoneNumber }}
                </td>
                <td>
                  {{
                    athlete.inscriptions?.length > 0
                      ? athlete.inscriptions[0].edition.name
                      : "-"
                  }}
                </td>
                <td>
                  <a
                    href=""
                    class="badge bg-danger"
                    @click.prevent="deleteAthlete(athlete.id)"
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
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import axios from "axios";
import { defineComponent } from "vue";

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Edition {
  edition: {
    id: number;
    name: string;
  };
}

export interface Athlete {
  id: number;
  user: User;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  inscriptions: Edition[];
}

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
      search: null as unknown,
      athletes: [] as Athlete[],
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    async deleteAthlete(id: number) {
      const response = await axios.delete("athletes/" + id);
      if (response.status < 300) {
        this.reloadTable();
      }
    },
    async reloadTable() {
      const response = await axios.get("athletes", {
        params: {
          search: this.search,
        },
      });
      if (response.status < 300) {
        this.athletes = response.data.data;
      }
    },
    setSearch(search: string) {
      this.search = search;
    },
  },
  watch: {
    search(newSearch, oldSearch) {
      this.reloadTable();
    },
  },
  mounted() {
    this.reloadTable();
  },
});
</script>

<style></style>
