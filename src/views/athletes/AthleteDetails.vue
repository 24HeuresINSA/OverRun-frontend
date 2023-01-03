<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Detail de l'utilisateur" />

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-6 text-start border-bottom p-0">
          <h2>
            {{ athlete.firstName }}
            {{ athlete.lastName }}
            ({{ athlete.user.username }})
          </h2>
        </div>
        <div class="col-6"></div>
      </div>

      <br />

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Prénom:</p>
            <p class="d-inline">
              {{ athlete.firstName }}
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Nom:</p>
            <p class="d-inline">
              {{ athlete.lastName }}
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Sexe:</p>
            <p class="d-inline">
              {{ athlete.sex ? "Femme" : "Homme" }}
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Téléphone:</p>
            <p class="d-inline">{{ athlete.phoneNumber }}</p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Email:</p>
            <p class="d-inline">{{ athlete.user.email }}</p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Date d'anniversaire :</p>
            <p class="d-inline">
              {{ new Date(athlete.dateOfBirth).toLocaleDateString("fr") }}
            </p></span
          >
        </div>
      </div>

      <div class="row mt-2 m-2">
        <div class="col text-start">
          <h4>Adresse</h4>
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Pays:</p>
            <p class="d-inline">{{ athlete.country }}</p></span
          >
          <br />
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Voie:</p>
            <p class="d-inline">{{ athlete.address }}</p></span
          >
          <br />
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Ville:</p>
            <p class="d-inline">{{ athlete.city }}</p></span
          >
          <br />
          <span class="d-inline"
            ><p class="d-inline fw-bolder me-2">Code postal:</p>
            <p class="d-inline">{{ athlete.zipCode }}</p></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
  },
  data() {
    return {
      hideSideBar: false,
      showCertificateModal: false,
      athlete: {
        address: "",
        city: "",
        country: "",
        zipCode: "",
        dateOfBirth: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        sex: "",
        user: {
          email: "",
          username: "",
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
      const response = await axios.get(`athletes/${this.$route.params.id}`);
      if (response.status < 300) {
        this.athlete = response.data;
      }
    },
  },
  mounted() {
    this.reloadTable();
  },
});
</script>

<style></style>
