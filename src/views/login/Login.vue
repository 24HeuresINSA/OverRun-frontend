<template>
  <div class="container-fluid h-100 m-0" id="background">
    <div class="row h-100">
      <div class="col h-100 d-table">
        <div class="" id="form-container">
          <div id="form" class="bg-light shadow-sm">
            <img src="../../assets/logo.png" alt="Logo 24 heures" id="logo" />

            <form class="text-start px-5 mt-4" @submit.prevent="login">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Adresse mail</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label"
                  >Mot de passe</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  v-model="password"
                />
                <div id="passwordHelpBlock" class="form-text">
                  <a href="" class="text-end" id="forget-password"
                    >Mot de passe oublié?</a
                  >
                </div>
              </div>
              <div class="mb-3 form-check">
                <div class="col">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    v-model="persistentLogin"
                  />
                  <label 
                  class="form-check-label" 
                  for="exampleCheck1"
                    >Rester connecté</label
                  >
                </div>
              </div>
              <div class="w-100 d-flex">
                <button
                  type="submit"
                  class="btn btn-primary text-center align-middle"
                  id="submit-btn"
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { MutationTypes } from "../../store/modules/auth";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      persistentLogin: false,
    };
  },

  methods: {
    async login() {
      const response = await axios.post("login", {
        email: this.email,
        password: this.password,
      });

      if (response.status === 200) {
        this.$store.commit(
          MutationTypes.SET_ACCESS_TOKEN,
          response.data.accessToken
        );
        this.$store.commit(
          MutationTypes.SET_REFRESH_TOKEN,
          response.data.refreshToken
        );
        const base64Url = this.$store.getters.getAccessToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        this.$store.commit(MutationTypes.SET_USER, JSON.parse(jsonPayload).id);
        this.$store.commit(MutationTypes.SET_ADMIN_ID, JSON.parse(jsonPayload).adminId);

        if (this.persistentLogin) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("userId", JSON.parse(jsonPayload).id);
          localStorage.setItem("adminId", JSON.parse(jsonPayload).adminId);
        }

        if (this.$store.getters.getAdminId === null) {
          alert("Vous n'êtes pas autorisé à accéder à cette page");
          return this.$router.go(-1);
        }
        this.$router.push({ name: "Home" });
      }
    }
    
  },
});
</script>

<style>
#form-container {
  margin-left: auto;
  margin-right: auto;
  vertical-align: middle;
  display: table-cell;
}

#form {
  margin-left: auto;
  margin-right: auto;
  margin-top: -10%;
  width: 400px;
  height: 420px;
  border-radius: 25px;
  /* border: 1px solid black; */
}

#logo {
  margin-top: 10px;
  width: 20%;
  height: auto;
}

#background {
  background-image: url("../../assets/blur-background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 10001;
  position: fixed;
}

#submit-btn {
  margin-left: auto;
  margin-right: auto;
}

#forget-password {
  font-size: 10pt;
}
</style>
