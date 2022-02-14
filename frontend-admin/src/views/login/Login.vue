<template>
  <div class="container-fluid h-100 m-0" id="background">
    <div class="row h-100">
      <div class="col h-100 d-table">
        <div class="" id="form-container">
          <div id="form" class="bg-light">
            <img src="../../assets/logo.png" alt="Logo 24 heures" id="logo" />

            <form class="text-start px-5 mt-4">
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
                  />
                  <label class="form-check-label" for="exampleCheck1"
                    >Rester connecté</label
                  >
                </div>
              </div>
              <div class="w-100 d-flex">
                <button
                  type="button"
                  class="btn btn-primary text-center align-middle"
                  id="submit-btn"
                  @click="login"
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
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("auth", {
      getLoginApiStatus: "getLoginApiStatus",
    }),
  },
  methods: {
    ...mapActions("auth", {
      actionLoginApi: "LOGIN_API",
    }),
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      await this.actionLoginApi(payload);
      if (this.getLoginApiStatus == "success") {
        console.log("hello world");
        this.$router.push("/");
      } else {
        alert("failed");
      }
    },
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
