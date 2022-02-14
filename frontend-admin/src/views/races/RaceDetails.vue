<template>
  <TopBar @toggleSideBar="toggleSideBar" />

  <SideBar :hide="hideSideBar" activeVue="Races" />
  <div
    class="container-fluid main-container"
    :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
  >
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Random Race (Course)</h2>
      </div>
      <div class="col-6"></div>
      <div class="col-2 text-end">
        <button class="btn btn-warning">Modifier</button>
      </div>
    </div>
    <div class="row mt-4 m-2">
      <div class="col text-start">
        <span class="d-inline">
          <p class="d-inline fw-bolder me-2">Categorie:</p>
          <p class="d-inline">
            <router-link
              :to="{ name: 'CategoryDetails', params: { id: 'test' } }"
            >
              <a href="" class="badge rounded-pill bg-secondary">
                Random Category</a
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
          <p class="d-inline">
            <router-link
              :to="{ name: 'DisciplineDetails', params: { id: 'test' } }"
            >
              <a href="" class="badge rounded-pill bg-secondary">
                Random Discipline</a
              >
            </router-link>
            <router-link
              :to="{ name: 'DisciplineDetails', params: { id: 'test' } }"
            >
              <a href="" class="badge rounded-pill bg-secondary ms-2">
                Random Discipline</a
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
          <p class="d-inline">103/200</p>
        </span>
      </div>
    </div>

    <div class="row m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Nombre d'Equipes:</p>
          <p class="d-inline">7/10</p>
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

    <div v-if="showAthletes" class="row m-2 bg-light rounded">
      <div class="col">
        <table class="table table-striped table-hover">
          <thead style="position: sticky; top: 0">
            <tr>
              <th scope="col">Athlète</th>
              <th scope="col">Email</th>
              <th scope="col">Equipe</th>
              <th scope="col">VA</th>
              <th scope="col">Certificat</th>
              <th scope="col">Payement</th>
              <th scope="col">Inscription</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <router-link
                  :to="{ name: 'InscriptionDetails', params: { id: 'test' } }"
                >
                  Random Athlète
                </router-link>
              </td>
              <td>random-athlete@random.com</td>
              <td>
                <router-link
                  :to="{ name: 'TeamDetails', params: { id: 'test' } }"
                >
                  Random Team
                </router-link>
              </td>
              <td>-</td>
              <td>
                <a href="" class="badge rounded-pill bg-success mx-1"
                  >Valider</a
                >
              </td>
              <td>
                <a href="" class="badge rounded-pill bg-success mx-1"
                  >Valider</a
                >
              </td>
              <td>
                <a href="" class="badge rounded-pill bg-success mx-1"
                  >Valider</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row m-2 mt-3">
      <div class="col text-start border-bottom" @click="showTeams = !showTeams">
        <h4>
          Equipes
          <span v-if="showTeams" class="material-icons-outlined d-inline">
            expand_more
          </span>
          <span v-else class="material-icons-outlined"> navigate_next </span>
        </h4>
      </div>
    </div>

    <div v-if="showTeams" class="row m-2 bg-light rounded">
      <div class="col">
        <table class="table table-striped table-hover">
          <thead style="position: sticky; top: 0">
            <tr>
              <th scope="col">Equipe</th>
              <th scope="col">Membres</th>
              <th scope="col">Inscriptions Complétées</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <router-link
                  :to="{ name: 'TeamDetails', params: { id: 'test' } }"
                >
                  Random Team
                </router-link>
              </td>
              <td>7/10</td>
              <td>5/10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
  },
  data() {
    return {
      hideSideBar: false,
      showAthletes: true,
      showTeams: true,
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
  },
  mounted() {
    this.$emit("isActive", "Races");
  },
});
</script>

<style></style>
