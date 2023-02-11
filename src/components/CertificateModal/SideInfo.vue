<template>
  <div class="container-fluid w-100 bg-light" id="side-info">
    <div class="row" v-if="inscription?.athlete?.user">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-1"></div>
          <div class="col">
            <h3>Informations</h3>
          </div>
          <div class="col-1">
            <button id="close-arrow" @click="closeModal">
              <span class="material-icons-outlined"> close </span>
            </button>
          </div>
        </div>
        <hr class="dropdown-divider mb-4" />
        <div class="row">
          <div class="col">
            <h5>Informations Certificat</h5>
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Satut:</p>
              <p class="d-inline">
                <ValidationChips :status="inscription.certificate?.status" /></p
            ></span>
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Par:</p>
              <p class="d-inline">
                {{ inscription.certificate?.statusUpdatedBy?.user.username }}
              </p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Date:</p>
              <p
                class="d-inline"
                v-if="inscription.certificate?.statusUpdatedAt"
              >
                {{
                  new Date(
                    inscription.certificate?.statusUpdatedAt
                  ).toLocaleDateString("fr", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })
                }}
              </p></span
            >
          </div>
        </div>
        <hr class="dropdown-divider my-4" />
        <div class="row">
          <div class="col">
            <h5>Informations Coureur</h5>
          </div>
        </div>

        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Prenom:</p>
              <p class="d-inline">{{ inscription.athlete.firstName }}</p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Nom:</p>
              <p class="d-inline">{{ inscription.athlete.lastName }}</p></span
            >
          </div>
        </div>
        <div
          class="row text-start"
          :class="
            isAthleteMinor(inscription.athlete.dateOfBirth) ? 'bg-warning' : ''
          "
        >
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Date de naissance:</p>
              <p class="d-inline">
                {{
                  new Date(inscription.athlete.dateOfBirth).toLocaleString(
                    "fr",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                }}
              </p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Email:</p>
              <p class="d-inline">{{ inscription.athlete.user.email }}</p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Téléphone:</p>
              <p class="d-inline">
                {{ inscription.athlete.phoneNumber }}
              </p></span
            >
          </div>
        </div>
      </div>
      <hr class="dropdown-divider my-4" />
      <div class="row">
        <div class="col">
          <h5>Informations Course</h5>
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Course:</p>

            <p class="d-inline">{{ inscription.race.name }}</p></span
          >
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Disciplines:</p>
            <p
              class="d-inline"
              v-for="discipline in inscription.race?.disciplines"
              :key="discipline?.id"
            >
              <span class="badge ms-2 bg-primary">{{
                discipline.discipline.name
              }}</span>
            </p>
          </span>
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Categorie:</p>

            <p class="d-inline">{{ inscription.race.category.name }}</p></span
          >
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Age limite:</p>
            idk ans
            <p class="d-inline"></p
          ></span>
        </div>
      </div>

      <hr class="dropdown-divider my-4" />
      <div class="row">
        <div class="col">
          <h5>Informations Inscription</h5>
        </div>
      </div>

      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">VA valide:</p>
            <ValidationChips :status="inscription.va ? 1 : undefined" />
          </span>
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline text-start"
            ><p class="d-inline fw-bolder">Payé:</p>
            <ValidationChipsPayment :status="inscription.payment?.status" />
          </span>
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Montant inscription:</p>
            {{ centimesToEuros(inscription.payment?.raceAmount) }} €
            <p class="d-inline"></p
          ></span>
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Montant donation:</p>
            {{ centimesToEuros(inscription.payment?.donationAmount) }} €
            <p class="d-inline"></p
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ValidationChips from "@/components/validationChips/ValidationsChips.vue";
import ValidationChipsPayment from "@/components/validationChips/ValidationsChipsPayment.vue";
import { Inscription } from "@/types/interface";
import { isAthleteMinor } from "@/utils/mixins/athlete";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ValidationChips,
    ValidationChipsPayment,
  },
  props: {
    inscriptionId: {
      type: Number,
      required: true,
    },
    reloadData: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inscription: {} as Inscription,
    };
  },
  methods: {
    isAthleteMinor,
    closeModal() {
      this.$emit("hideCertificate");
    },
    async getInscription() {
      if (!this.inscriptionId) return;
      const response = await axios.get("inscriptions/" + this.inscriptionId);
      if (response.status < 300) {
        this.inscription = response.data;
      }
      this.$emit("dataReloaded");
    },
    centimesToEuros(centimes: number | undefined) {
      if (!centimes) return 0;
      return centimes / 100;
    },
  },
  watch: {
    inscriptionId(newId, oldId) {
      this.getInscription();
    },
    reloadData(newVal) {
      if (newVal) this.getInscription();
    },
  },
  beforeMount() {
    this.getInscription();
  },
});
</script>

<style>
#side-info {
  margin: 25px 60px 30px 0;
  height: calc(100vh - 45px);
  border-radius: 15px;
  overflow: auto;
  overflow-x: hidden;
}

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}

.icon {
  font-size: 15pt;
  margin-left: -10px;
  margin-top: 10px;
}

.valide {
  background-color: #f2938d;
}

.skip {
  background: #fbe786;
}

.reject {
  background-color: #a94341;
}

.menue-btn {
  width: 100px;
  height: 50px;
  font-weight: bolder;
  color: #413d3c;
}
</style>
