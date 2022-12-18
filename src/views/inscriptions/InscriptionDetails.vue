<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Inscriptions" />

    <div v-show="showCertificateModal">
      <CertificateModalVue
        @hideCertificate="toggleCertificateModal"
        :inscriptions="[$route.params.id]"
        :index="0"
      />
    </div>

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-6 text-start border-bottom p-0">
          <h2>
            {{ inscription.athlete.firstName }}
            {{ inscription.athlete.lastName }} (Inscription)
          </h2>
        </div>
        <div class="col-6"></div>
      </div>
      <div class="row mt-4 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Prénom Nom:</p>
            <p class="d-inline">
              {{ inscription.athlete.firstName }}
              {{ inscription.athlete.lastName }}
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Téléphone:</p>
            <p class="d-inline">{{ inscription.athlete.phoneNumber}}</p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Email:</p>
            <p class="d-inline">{{ inscription.athlete.user.email }}</p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Course:</p>
            <p class="d-inline">
              <router-link
                :to="{
                  name: 'RaceDetails',
                  params: { id: inscription.race.id },
                }"
              >
                {{ inscription.race.name }}
              </router-link>
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Equipe:</p>
            <p class="d-inline">
              <router-link
                :to="{
                  name: 'TeamDetails',
                  params: { id: inscription.team.id },
                }"
              >
                {{ inscription.team.name }}
              </router-link>
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Administrateur équipe:</p>
            <p class="d-inline">
              <span
                class="material-icons-outlined"
                style="color: green"
                v-if="inscription.teamAdmin"
              >
                done
              </span>
              <span class="material-icons-outlined" v-else style="color: red">
                close
              </span>
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Certificat médical:</p>
            <p class="d-inline">
              <a
                class="badge rounded-pill bg-success mx-1"
                v-if="inscription.certificate.status === 1"
                >Validé</a
              >
              <a
                class="badge rounded-pill bg-warning mx-1"
                v-if="inscription.certificate.status > 1 &&
                      inscription.certificate.status < 5"
                >A validé</a
              >
              <a
                class="badge rounded-pill bg-danger mx-1"
                v-if="inscription.certificate.status > 4"
                >Refusé</a
              >
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Carte VA:</p>
            <p class="d-inline">
              <span
                class="material-icons-outlined"
                style="color: green"
                v-if="inscription.va"
              >
                done
              </span>
              <span class="material-icons-outlined" v-else style="color: red">
                close
              </span>
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Payement:</p>
            <p class="d-inline" v-if="inscription.payment">
              <a
                class="badge rounded-pill bg-success mx-1"
                v-if="inscription.payment.status === 1"
                >Validé</a
              >
              <a
                class="badge rounded-pill bg-warning mx-1"
                v-if="inscription.payment.status > 1 &&
                      inscription.payment.status < 5"
                >A validé</a
              >
              <a
                class="badge rounded-pill bg-danger mx-1"
                v-if="inscription.payment.status > 4"
                >Refusé</a
              >
            </p></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "../../components/SideBar/SideBar.vue";
import TopBar from "../../components/TopBar/TopBar.vue";
import axios from "axios";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
  },
  data() {
    return {
      hideSideBar: false,
      showCertificateModal: false,
      inscription: {
        athlete: {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          user: {
            email: "",
          },
        },
        race: {
          name: "",
          id: 0,
        },
        team: {
          name: "",
          id: 0,
        },
        teamAdmin: {
          id: 0,
        },
        certificate: {
          id: 0,
          status: 0,
        },
        va: {
          id: 0,
        },
        payment: {
          id: 0,
          status: 0,
        },
      },
    };
  },
  methods: {
    toggleCertificateModal() {
      this.showCertificateModal = !this.showCertificateModal;
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    async reloadTable() {
      const response = await axios.get(
        `inscriptions/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          },
        }
      );
      if (response.status < 300) {
        this.inscription = response.data;
      }
    },
  },
  mounted() {
    this.reloadTable();
  },
});
</script>

<style></style>
