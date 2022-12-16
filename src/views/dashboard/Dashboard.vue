<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />

    <SideBar :hide="hideSideBar" activeVue="Home" />

    <CertificateModalVue
      v-show="showCertificateModal"
      @hideCertificate="toggleCertificateModal"
      :inscriptions="inscriptions"
      :index="index"
    />

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Dashboard</h2>
        </div>
        <div class="col-6"></div>
      </div>

      <div class="row m-2 mt-4">
        <div class="col bg-light me-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3 pb-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5 >Nombre d'inscrits</h5>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-8 border-end">
                <h1 class="mb-0">310</h1>
              </div>
              <div class="col-4 text-success">
                <h2 class="d-block m-auto">+10</h2>
                <div class="form-text d-block">last 24 h</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col bg-light mx-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3 pb-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Status Inscriptions</h5>
              </div>
            </div>
            <div class="row pt-3">

            </div>
          </div>
        </div>
        <div class="col bg-light mx-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Nombre d'inscrits</h5>
              </div>
            </div>
            <div class="row pt-3">
              
            </div>
          </div>
        </div>
        <div class="col bg-light ms-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Solde</h5>
              </div>
            </div>
            <div class="row pt-3">
              <div class="col-8 border-end">
                <h1>1250.2 €</h1>
              </div>
              <div class="col-4 text-danger">
                <h4 class="d-block m-auto">-750€</h4>
                <div class="form-text d-block">manquants</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div class="col bg-light me-2 rounded-3 shadow-sm"></div>
        <div class="col-5 bg-light ms-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Certificats à valider (3)</h5>
              </div>
            </div>
            <div class="row">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Athlète</th>
                    <th scope="col">Certificat</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr>
                    <td>
                      <router-link
                        :to="{
                          name: 'InscriptionDetails',
                          params: { id: 'test' },
                        }"
                      >
                        Random Athlete
                      </router-link>
                    </td>

                    <td @click="toggleCertificateModal">
                      <a class="badge rounded-pill bg-warning text-dark mx-1"
                        >A valider</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <router-link
                        :to="{
                          name: 'InscriptionDetails',
                          params: { id: 'test' },
                        }"
                      >
                        Random Athlete
                      </router-link>
                    </td>

                    <td @click="toggleCertificateModal">
                      <a class="badge rounded-pill bg-warning text-dark mx-1"
                        >A valider</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <router-link
                        :to="{
                          name: 'InscriptionDetails',
                          params: { id: 'test' },
                        }"
                      >
                        Random Athlete
                      </router-link>
                    </td>

                    <td @click="toggleCertificateModal">
                      <a class="badge rounded-pill bg-warning text-dark mx-1"
                        >A valider</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row m-2 mt-3">
        <div class="col-4 bg-light me-2 rounded-3 shadow-sm">
          <div class="container-fluid p-1 pt-3">
            <div class="row pt-1 pb-1">
              <div class="col border-bottom">
                <h5>Payement à valider (2)</h5>
              </div>
            </div>
            <div class="row">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Payement</th>
                    <th scope="col">Valeur</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr>
                    <td>
                     <a href="" class="badge rounded-pill bg-warning text-dark mx-1"
                    >A valider</a
                  >
                    </td>

                    <td >
                      12.5€
                    </td>
                  </tr>
                  <tr>
                     <td>
                     <a href="" class="badge rounded-pill bg-warning text-dark mx-1"
                    >A valider</a
                  >
                    </td>

                    <td >
                      12.5€
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col bg-light ms-2 rounded-3 shadow-sm"></div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "../../components/SideBar/SideBar.vue";
import TopBar from "../../components/TopBar/TopBar.vue";
import CertificateModalVue from "../../components/CertificateModal/CertificateModal.vue";
import Doughnut from "../../components/charts/Doughnut.vue";
import axios from "axios";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    CertificateModalVue,
    Doughnut,
  },

  data() {
    return {
      hideSideBar: false,
      showCertificateModal: false,
      inscriptions: [],
      index: 0,
      chartOptions: {
        hoverBorderWidth: 20
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Green", "Red", "Blue"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [1, 10, 5]
          }
        ]
      }
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    toggleCertificateModal() {
      this.showCertificateModal = !this.showCertificateModal;
    },
  },
   
});
</script>

<style>
</style>