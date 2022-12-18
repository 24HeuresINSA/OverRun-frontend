<template>
  <div class="container-fluid w-100 bg-light" id="side-info">
    <div class="row" v-if="athlete && athlete.user">
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
                <span class="badge ms-2 reject">Validé</span>
              </p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Par:</p>
              <p class="d-inline">Pintade</p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Date:</p>
              <p class="d-inline">11/08/2022</p></span
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
              <p class="d-inline">{{ athlete.firstName }}</p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Nom:</p>
              <p class="d-inline">{{ athlete.lastName }}</p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Date de naissance:</p>
              <p class="d-inline">{{ athlete.dateOfBirth }}</p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Email:</p>
              <p class="d-inline">{{ athlete.user.email }}</p></span
            >
          </div>
        </div>
        <div class="row text-start">
          <div class="col">
            <span class="d-inline"
              ><p class="d-inline fw-bolder me-2">Téléphone:</p>
              <p class="d-inline">{{ athlete.phoneNumber }}</p></span
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

            <p class="d-inline">Triathlon Loisir</p></span
          >
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Disciplines:</p>
            Vélo, Course à pied, Natation
            <p class="d-inline"></p
          ></span>
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Age limite:</p>
            18 ans
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
            <span class="badge ms-2 reject">Non valide</span>
          </span>
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Montant inscription:</p>
            17 euros
            <p class="d-inline"></p
          ></span>
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline text-start"
            ><p class="d-inline fw-bolder">Payé:</p>
            <span class="badge ms-2 valide">Payé</span>
          </span>
        </div>
      </div>

      <div class="row text-start">
        <div class="col">
          <span class="d-inline"
            ><p class="d-inline fw-bolder">Identifiant Transaction:</p>
            123456789
            <p class="d-inline"></p
          ></span>
        </div>
      </div>
      <div class="row text-start">
        <div class="col">
          <span class="d-inline text-start"
            ><p class="d-inline fw-bolder">Date transaction:</p>
            <p class="d-inline">11/11/21 à 10h51</p>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Athlete {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  phoneNumber: string;
  dateOfBirth: string;
  sex: boolean;
  user: User;
}

export default defineComponent({
  props: {
    athleteId: Number,
  },
  data() {
    return {
      athlete: {} as Athlete,
    };
  },
  methods: {
    closeModal() {
      this.$emit("hideCertificate");
    },
    async getAthlete() {
      const response = await axios.get("athletes/" + this.athleteId, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
        },
      });
      if (response.status < 300) {
        this.athlete = response.data.data;
        console.log(response);
        console.log(JSON.stringify(this.athlete));
      }
    },
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
