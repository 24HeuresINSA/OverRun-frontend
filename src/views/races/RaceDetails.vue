<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Races" />

    <UpdateRace
      :race="race"
      v-show="showUpdateRace"
      @closeUpdateRace="toggleUpdateRace"
      @updateRaceSuccess="reloadTable"
    />
    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>{{ race.name }}</h2>
        </div>
        <div class="col-6"></div>
        <div class="col-2 text-end">
          <button class="btn btn-warning" @click="toggleUpdateRace">
            Modifier
          </button>
        </div>
      </div>
      <div class="row mt-4 m-2">
        <div class="col text-start">
          <span class="d-inline">
            <p class="d-inline fw-bolder me-2">Catégorie:</p>
            <p class="d-inline">
              <router-link
                :to="{
                  name: 'CategoryDetails',
                  params: { id: race.category.id },
                }"
              >
                <a href="" class="badge rounded-pill bg-secondary">
                  {{ race.category.name }}</a
                >
              </router-link>
            </p>
          </span>
        </div>
      </div>
      <div class="row m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Disciplines:</p>
            <p
              class="d-inline"
              v-for="raceDiscipline in race.disciplines"
              :key="raceDiscipline.id"
            >
              <router-link
                :to="{
                  name: 'DisciplineDetails',
                  params: { id: raceDiscipline.discipline.id },
                }"
              >
                <a href="" class="badge rounded-pill bg-secondary">
                  {{ raceDiscipline.discipline.name }} ({{
                    raceDiscipline.duration
                  }}h)</a
                >
              </router-link>
            </p>
          </span>
        </div>
      </div>

      <div class="row m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Nombre d'inscriptions:</p>
            <p class="d-inline">
              {{
                race.inscriptions.filter(
                  (i) => i.status !== InscriptionStatus.CANCELLED
                ).length
              }}/{{ race.maxParticipants }}
            </p>
          </span>
        </div>
      </div>

      <div class="row m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Nombre d'Equipes:</p>
            <p class="d-inline">{{ race.teams.length }}/{{ race.maxTeams }}</p>
          </span>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div
          class="col text-start border-bottom d-inline"
          @click="showAthletes = !showAthletes"
        >
          <h4>
            Athletes
            <span v-if="showAthletes" class="material-icons-outlined d-inline">
              expand_more
            </span>
            <span v-else class="material-icons-outlined"> navigate_next </span>
          </h4>
        </div>
      </div>

      <div v-if="showAthletes" class="row m-2 bg-light rounded shadow-sm">
        <div class="col">
          <table class="table table-striped table-hover">
            <thead style="position: sticky; top: 0">
              <tr>
                <th scope="col">Athlète</th>
                <th scope="col">Email</th>
                <th scope="col">Equipe</th>
                <th scope="col">VA</th>
                <th scope="col">Certificat</th>
                <th scope="col">Paiement</th>
                <th scope="col">Inscription</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="inscription in inscriptions"
                :key="inscription.id"
                :class="
                  isAthleteMinor(inscription.athlete.dateOfBirth)
                    ? 'bg-warning'
                    : ''
                "
              >
                <td>
                  <router-link
                    :to="{
                      name: 'InscriptionDetails',
                      params: { id: inscription.id },
                    }"
                  >
                    {{ inscription.athlete.firstName }}
                    {{ inscription.athlete.lastName }}
                  </router-link>
                </td>
                <td>{{ inscription.athlete.user.email }}</td>
                <td>
                  <router-link
                    v-if="inscription.team?.id"
                    :to="{
                      name: 'TeamDetails',
                      params: { id: inscription.team.id },
                    }"
                  >
                    {{ inscription.team.name }}
                  </router-link>
                </td>
                <td>
                  <ValidationsChips
                    :status="inscription.va?.id ? 1 : undefined"
                  />
                </td>
                <td>
                  <ValidationsChips :status="inscription.certificate?.status" />
                </td>
                <td>
                  <router-link
                    v-if="inscription.payment?.id"
                    :to="{
                      name: 'PaymentDetails',
                      params: { id: inscription.payment.id },
                    }"
                  >
                    <ValidationsChipsPayment
                      :status="inscription.payment?.status"
                    />
                  </router-link>
                  <ValidationsChipsPayment
                    v-else
                    :status="inscription.payment?.status"
                  />
                </td>
                <td>
                  <ValidationChipsInscription :status="inscription.status" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div
          class="col text-start border-bottom"
          @click="showTeams = !showTeams"
        >
          <h4>
            Equipes
            <span v-if="showTeams" class="material-icons-outlined d-inline">
              expand_more
            </span>
            <span v-else class="material-icons-outlined"> navigate_next </span>
          </h4>
        </div>
      </div>

      <div v-if="showTeams" class="row m-2 bg-light rounded shadow-sm">
        <div class="col">
          <table class="table table-striped table-hover">
            <thead style="position: sticky; top: 0">
              <tr>
                <th scope="col">Équipe</th>
                <th scope="col">Membres</th>
                <th scope="col">Inscriptions Complétées</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="team in teams" :key="team.id">
                <td>
                  <router-link
                    :to="{ name: 'TeamDetails', params: { id: team.id } }"
                  >
                    {{ team.name }}
                  </router-link>
                </td>
                <td>
                  {{
                    team.members.filter(
                      (m) => m.status !== InscriptionStatus.CANCELLED
                    ).length
                  }}/{{ team.race.category.maxTeamMembers }}
                </td>
                <td>
                  {{ countValidatedMembers(team) }}/{{ team.members?.length }}
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
import UpdateRace from "@/components/modals/race/UpdateRace.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import ValidationChipsInscription from "@/components/validationChips/ValidationChipsInscription.vue";
import ValidationsChipsPayment from "@/components/validationChips/ValidationsChipsPayment.vue";
import {
  Inscription,
  InscriptionStatus,
  Member,
  Race,
  Team,
} from "@/types/interface";
import { isAthleteMinor } from "@/utils/mixins/athlete";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    ValidationChipsInscription,
    UpdateRace,
    ValidationsChipsPayment,
  },
  data() {
    return {
      hideSideBar: false,
      showAthletes: true,
      showTeams: true,
      showUpdateRace: false,
      race: {} as Race,
      teams: [] as Team[],
      inscriptions: [] as Inscription[],
      InscriptionStatus,
    };
  },
  methods: {
    isAthleteMinor,
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    toggleUpdateRace() {
      this.showUpdateRace = !this.showUpdateRace;
    },
    async reloadTable() {
      const response = await axios.get(`races/${this.$route.params.id}`);
      if (response.status < 300) {
        this.race = response.data;

        const resTeams = await axios.get(`teams`);
        if (resTeams.status < 300) {
          const teamsIds = this.race.teams.map((team: any) => team.id);
          this.teams = resTeams.data.data.filter((team: Team) =>
            teamsIds.includes(team.id)
          );
        }

        const resInscritptions = await axios.get(`inscriptions`);
        if (resInscritptions.status < 300) {
          const inscriptionsIds = this.race.inscriptions.map(
            (inscription: any) => inscription.id
          );
          this.inscriptions = resInscritptions.data.data.filter(
            (inscription: any) => inscriptionsIds.includes(inscription.id)
          );
        }
      }
    },
    countValidatedMembers(team: Team): number {
      return team.members.filter(
        (member: Member) => member.status !== InscriptionStatus.CANCELLED
      ).length;
    },
  },
  beforeMount() {
    this.reloadTable();
  },
});
</script>

<style></style>
