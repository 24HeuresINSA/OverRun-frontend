<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Inviter un nouvel administrateur</h4>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-5 my-4 text-start" @submit.prevent="sendInvite">
        <div class="mb-3 fw-bold">
          <label for="inputEmail" class="form-label">Adresse email: </label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            v-model="email"
            required
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-3">
            Envoyer invitation
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      email: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeAdminInviteModal");
    },
    async sendInvite(e: Event) {
      const response = await axios.post(
        "adminInvitations",
        {
          email: this.email,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          },
        }
      );
      if (response.status < 300) {
        this.closeModal();
        (e.target as HTMLFormElement)?.reset();
      }
      console.log(response);
    },
  },
});
</script>

<style scoped>
.custom-modal {
  width: 30%;
}
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10001;
}
</style>
