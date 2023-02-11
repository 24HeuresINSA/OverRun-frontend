<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />
    <SideBar :hide="hideSideBar" activeVue="Inscriptions" />
    <!-- TODO to change -->
    <div v-show="showCertificateModal">
      <CertificateModalVue
        @hideCertificate="toggleCertificateModal"
        :certificates="certificates"
        :index="index"
      />
    </div>
    <ConfirmationDeletionModal
      v-show="showDeletionModal"
      @closeConfirmationDeletionModal="toggleDeletionModal(-1)"
      @confirmDeletion="deleteInscription(inscriptionToDelete)"
    />

    <div
      class="container-fluid main-container"
      :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
    >
      <div class="row m-2 mt-4">
        <div class="col-4 text-start border-bottom p-0">
          <h2>Athletes</h2>
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
              class="btn btn-warning"
              @click="filterMenuActive = !filterMenuActive"
            >
              Filtrer
            </button>
            <button type="button" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
      </div>

      <div
        class="row border-top bg-light m-2 shadow-sm"
        v-if="filterMenuActive"
      >
        <div class="row mx-2">
          <div class="col-2 p-2 text-start">
            <p class="fw-bolder mb-0">Course:</p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="race"
            >
              <option value="" disabled selected hidden>Choix course</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-2 p-2 text-start">
            <p class="fw-bolder mb-0">Status Certificat:</p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="certificateStatus"
            >
              <option value="" disabled selected hidden>Choix status</option>
              <option value="1">Validé</option>
              <option value="3">En attente</option>
              <option value="2">Rejeté</option>
            </select>
          </div>
          <div class="col-2 p-2 text-start">
            <p class="fw-bolder mb-0">Statut Paiement:</p>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="paymentStatus"
            >
              <option value="" disabled selected hidden>Choix status</option>
              <option value="1">Validé</option>
              <option value="3">En attente</option>
              <option value="2">Rejeté</option>
            </select>
          </div>

          <div class="col-6 p-2 text-end light">
            <button class="btn bg-secondary">Reset</button>
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
                <th scope="col">Prénom - Nom</th>
                <th scope="col">Course</th>
                <th scope="col">Equipe</th>
                <th scope="col">VA</th>
                <th scope="col">Certificat</th>
                <th scope="col">Paiement</th>
                <th scope="col">Statut</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inscription in inscriptions" :key="inscription.id">
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
                    :to="{
                      name: 'InscriptionDetails',
                      params: { id: inscription.id },
                    }"
                  >
                    {{ inscription.athlete.firstName }}
                    {{ inscription.athlete.lastName }}
                  </router-link>
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'RaceDetails',
                      params: { id: inscription.race.id },
                    }"
                  >
                    {{ inscription.race.name }}
                  </router-link>
                </td>
                <td>
                  <div v-if="inscription.team?.id">
                    <router-link
                      :to="{
                        name: 'TeamDetails',
                        params: { id: inscription.team.id },
                      }"
                    >
                      {{ inscription.team.name }}
                    </router-link>
                  </div>
                  <div v-else>-</div>
                </td>
                <td>
                  <div v-if="inscription.va">
                    <span class="material-icons-outlined"> done </span>
                  </div>
                  <div v-else>-</div>
                </td>
                <td
                  @click="
                    toggleCertificateModal(
                      certificates.findIndex(
                        (x) => x.id === inscription.certificate?.id
                      )
                    )
                  "
                >
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
                <td>
                  <div
                    class="error"
                    v-show="hasError(inscription.id)"
                    @click="toggleInscription(inscription.id, true)"
                  >
                    {{ errorMsg }}
                  </div>

                  <button
                    v-if="inscription.status === InscriptionStatus.VALIDATED"
                    class="badge me-1 bg-warning"
                    @click="toggleInscription(inscription.id, false)"
                  >
                    Dévalider inscription
                  </button>
                  <button
                    v-else-if="
                      inscription.status !== InscriptionStatus.CANCELLED
                    "
                    class="badge me-1"
                    :class="validationButtonColor(inscription)"
                    @click="toggleInscription(inscription.id, true)"
                  >
                    Valider l'inscription
                  </button>
                  <button
                    v-show="inscription.status !== InscriptionStatus.CANCELLED"
                    class="badge me-1 bg-primary"
                    @click="cancelInscription(inscription.id)"
                  >
                    Annuler l'inscription
                  </button>
                  <button
                    class="badge me-1 bg-danger"
                    @click="toggleDeletionModal(inscription.id)"
                  >
                    Supprimer
                  </button>
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
import CertificateModalVue from "@/components/CertificateModal/CertificateModal.vue";
import ConfirmationDeletionModal from "@/components/modals/ConfirmDeletionModal.vue";
import SearchBarVue from "@/components/searchBar/SearchBar.vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import ValidationsChips from "@/components/validationChips/ValidationsChips.vue";
import ValidationsChipsPayment from "@/components/validationChips/ValidationsChipsPayment.vue";
import ValidationChipsInscription from "@/components/validationChips/ValidationChipsInscription.vue";
import { Certificate, Inscription, InscriptionStatus } from "@/types/interface";
import { PaymentStatus } from "@/types/payment";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
    CertificateModalVue,
    ValidationsChips,
    ConfirmationDeletionModal,
    ValidationsChipsPayment,
    ValidationChipsInscription,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
      showCertificateModal: false,
      showDeletionModal: false,
      index: 0,
      search: "",
      race: null,
      inscriptionToDelete: -1,
      inscriptionError: -1,
      certificateStatus: null,
      paymentStatus: null,
      inscriptions: [] as Inscription[],
      certificates: [] as Certificate[],
      PaymentStatus,
      InscriptionStatus,
      errorMsg: "",
    };
  },
  methods: {
    hasError(id: number) {
      return id === this.inscriptionError;
    },
    toggleCertificateModal(index: number): void {
      this.index = index;
      this.showCertificateModal = !this.showCertificateModal;
    },
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
    setSearch(search: string) {
      this.search = search;
    },
    toggleDeletionModal(toDelete: number) {
      this.showDeletionModal = !this.showDeletionModal;
      this.inscriptionToDelete = this.showDeletionModal ? toDelete : -1;
    },
    async deleteInscription(id: number) {
      // TODO
      this.inscriptionError = id;
      this.errorMsg = "Suppression impossible";
    },
    canValidateInscription(inscription: Inscription) {
      return (
        inscription.certificate?.status === 1 &&
        inscription.payment?.status === PaymentStatus.VALIDATED
      );
    },
    validationButtonColor(inscription: Inscription) {
      return this.canValidateInscription(inscription)
        ? "bg-success"
        : "bg-secondary";
    },
    async toggleInscription(id: number, newStatus: boolean) {
      const response = await axios.patch("inscriptions/" + id, {
        validated: newStatus,
      });
      if (response.status >= 300) {
        return;
      }
      this.reloadTable();
    },
    async cancelInscription(id: number) {
      const response = await axios.post(`inscriptions/${id}/cancelation`);
      if (response.status !== 200)
        return (
          (this.inscriptionError = id),
          (this.errorMsg = "Erreur lors de l'annulation de l'inscription")
        );
      this.reloadTable();
    },
    async reloadTable() {
      this.inscriptionError = -1;
      const response = await axios.get("inscriptions", {
        params: {
          editionId: this.$store.getters["edition/getEditionId"],
          search: this.search,
        },
      });
      if (response.status < 300) {
        this.inscriptions = response.data.data;
      }

      const certificatesResponse = await axios.get("certificates");
      if (certificatesResponse.status < 300) {
        this.certificates = certificatesResponse.data.data;
      }
    },
  },
  async beforeMount() {
    await this.reloadTable();
  },
  watch: {
    search(newSearch, oldSearch) {
      this.reloadTable();
    },
  },
});
</script>

<style>
.error {
  color: red;
}
</style>
