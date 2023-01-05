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
          <h2>{{ team.name }} (Équipe)</h2>
        </div>
        <div class="col-6"></div>
        <div class="col-2">
          <SearchBarVue />
        </div>
      </div>
      <div class="row mt-4 m-2">
        <div class="col text-start">
          Course:
          <router-link
            :to="{ name: 'RaceDetails', params: { id: team.race.id } }"
          >
            {{ team.race.name }}
          </router-link>
        </div>
      </div>
      <div class="row m-2">
        <div class="col text-start">
          Nombre d'équipier: {{ team.members.length }}/{{
            team.race.category.maxTeamMembers
          }}
        </div>
      </div>

      <div class="row m-2">
        <div class="col text-start">
          Nombre d'inscriptions complètes: {{ countValidatedMembers(team) }}/{{
            team.members?.length
          }}
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div class="col text-start border-bottom">
          <h4>Membres</h4>
        </div>
      </div>

      <div class="row m-2 bg-light rounded shadow-sm">
        <div class="col">
          <table class="table table-striped table-hover">
            <thead style="position: sticky; top: 0">
              <tr>
                <th scope="col"></th>
                <th scope="col">Athlète</th>
                <th scope="col">Email</th>
                <th scope="col">Inscription</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in team.members" :key="member.id">
                <th scope="row">
                  <span
                    v-show="isTeamAdmin(member.athlete.id)"
                    class="material-icons-outlined"
                  >
                    military_tech
                  </span>
                </th>
                <td>
                  <router-link
                    :to="{
                      name: 'InscriptionDetails',
                      params: { id: member.id },
                    }"
                  >
                    {{ member.athlete.firstName }} {{ member.athlete.lastName }}
                  </router-link>
                </td>
                <td>{{ member.athlete.user.email }}</td>
                <td>
                  <ValidationsChips
                    :status="member.validated ? 1 : undefined"
                  />
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
import ValidationsChips from "@/components/validationChips/ValidationsChips.vue";
import { Admin, Member, Team } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    ValidationsChips,
  },
  data() {
    return {
      hideSideBar: false,
      team: {} as Team,
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    async reloadTable() {
      const response = await axios.get(`teams/${this.$route.params.id}`);
      if (response.status < 300) {
        this.team = response.data;
      }
    },
    countValidatedMembers(team: Team): number {
      return team.members.filter((member: Member) => member.validated).length;
    },
    isTeamAdmin(id: number): boolean {
      return this.team.admins.some(
        (admin: Admin) => admin.adminInscription.athleteId === id
      );
    },
  },
  beforeMount() {
    this.reloadTable();
  },
});
</script>

<style></style>
