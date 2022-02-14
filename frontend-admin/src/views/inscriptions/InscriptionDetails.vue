<template>
 <TopBar @toggleSideBar="toggleSideBar" />

  <SideBar :hide="hideSideBar" activeVue="Inscriptions" />

  <div v-show="showCertificateModal">
    <CertificateModalVue
      @hideCertificate="toggleCertificateModal"
      :inscriptions="[$route.params.id]"
      :index="0"
    />
  </div>

  <div class="container-fluid main-container" :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }">
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Random Athletes (Inscription)</h2>
      </div>
      <div class="col-6"></div>
    </div>
    <div class="row mt-4 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Prénom Nom:</p>
          <p class="d-inline">
            François Rault
          </p></span
        >
      </div>
    </div>

    <div class="row mt-2 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Téléphone:</p>
          <p class="d-inline">
            François Rault
          </p></span>
      </div>
    </div>

    <div class="row mt-2 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Email:</p>
          <p class="d-inline">
            François Rault
          </p></span>
      </div>
    </div>

    <div class="row mt-2 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Course:</p>
          <p class="d-inline">
            François Rault
          </p></span
        >
      </div>
    </div>

    <div class="row mt-2 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Equipe:</p>
          <p class="d-inline">
            François Rault
          </p></span
        >
      </div>
    </div>

    <div class="row mt-2 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Administrateur équipe:</p>
          <p class="d-inline">
            François Rault
          </p></span
        >
      </div>
    </div>

    <div class="row mt-2 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Certificat médical:</p>
          <p class="d-inline">
            François Rault
          </p></span
        >
      </div>
    </div>

    <div class="row mt-2 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Carte VA:</p>
          <p class="d-inline">
            François Rault
          </p></span>
      </div>
    </div>

    <div class="row mt-2 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Payement:</p>
          <p class="d-inline">
            François Rault
          </p></span>
      </div>
    </div>
    

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";

export default defineComponent ({
  components: {
    SideBar,
    TopBar,
  },
  data () {
    return {
      hideSideBar: false,
      showCertificateModal: false
    };
  },
  methods: {
    toggleCertificateModal() {
        this.showCertificateModal = !this.showCertificateModal;
    },
    toggleSideBar(): void{
      this.hideSideBar = !this.hideSideBar;
    },
  },
    mounted() {},

});
</script>

<style>

</style>