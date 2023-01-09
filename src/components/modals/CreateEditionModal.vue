<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Création édition</h4>
        </div>
        <div class="col-1">
          <button id="close-arrow" @click="closeModal">
            <span class="material-icons-outlined"> close </span>
          </button>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-2 my-4 text-start" @submit.prevent="createEdition">
        <div class="mt-4">
          <div class="col-4">
            <label for="name" class="form-label">Nom</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="edition.name"
              required
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-6">
            <label for="startDate" class="form-label">Date de début</label>
            <input
              type="dateTime-local"
              class="form-control"
              id="startDate"
              v-model="edition.startDate"
              required
            />
          </div>
          <div class="col-6">
            <label for="endDate" class="form-label">Date de fin</label>
            <input
              type="dateTime-local"
              class="form-control"
              id="endDate"
              v-model="edition.endDate"
              required
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-6">
            <label for="registrationStartDate" class="form-label"
              >Date de début des inscriptions</label
            >
            <input
              type="dateTime-local"
              class="form-control"
              id="registrationStartDate"
              v-model="edition.registrationStartDate"
              required
            />
          </div>
          <div class="col-6">
            <label for="registrationEndDate" class="form-label"
              >Date de fin des inscriptions</label
            >
            <input
              type="dateTime-local"
              class="form-control"
              id="registrationEndDate"
              v-model="edition.registrationEndDate"
              required
            />
          </div>
        </div>
        <div v-show="error" class="error">Une erreur s'est produite.</div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-3">Créer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Edition } from "@/types/edition";
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "CreationEditionModal",
  data() {
    return {
      edition: {} as Edition,
      error: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeCreationEditionModal");
    },
    async createEdition() {
      const response = await axios.post("editions", {
        ...this.edition,
        active: false,
      });
      this.error = response.status !== 200;
      console.log("create edition:" + this.error);
      if (this.error) return;
      this.closeModal();
      this.$emit("createdEditionSuccess");
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

.error {
  color: red;
}

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}
</style>
