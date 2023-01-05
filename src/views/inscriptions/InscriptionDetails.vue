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
            <p class="d-inline">{{ inscription.athlete.phoneNumber }}</p></span
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
          <span class="d-inline">
            <div class="d-inline fw-bolder me-2">
              Certificat médical:
              <ValidationsChips :status="inscription.certificate?.status" />
            </div>
          </span>
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
          <span class="d-inline">
            <div class="d-inline fw-bolder me-2">
              Payement:
              <ValidationsChips :status="inscription.payment?.status" />
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import ValidationsChips from "@/components/validationChips/ValidationsChips.vue";
import { Inscription } from "@/types/interface";
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
      showCertificateModal: false,
      inscription: {} as Inscription,
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
      const response = await axios.get(`inscriptions/${this.$route.params.id}`);
      if (response.status < 300) {
        this.inscription = response.data;
      }
    },
  },
  beforeMount() {
    this.reloadTable();
  },
});
</script>

<style></style>
