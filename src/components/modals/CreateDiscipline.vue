<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Creation discipline</h4>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-5 my-4 text-start" @submit.prevent="createDiscipline">
        <div class="mb-3 fw-bold">
          <label for="inputName" class="form-label"
            >Nom de la discipline:</label
          >
          <input
            type="text"
            class="form-control"
            id="inputName"
            aria-describedby="emailHelp"
            v-model="name"
            required
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="exampleInputEmail1" class="form-label"
            >Description de la discipline:
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="description"
            required
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-3">Créer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MutationTypes } from "../../store/modules/auth";
import axios from "axios";
import { edition } from "@/main";

export default defineComponent({
  data() {
    return {
      name: null,
      description: null,
      editionId: 1,
     };
  },
  methods: {
    closeModal() {
      this.$emit("closeDisciplineModal");
    },
    async createDiscipline() {
       console.log(this.$store.getters.getAccessToken);
      const response = await axios.post("disciplines", {
        name: this.name,
        description: this.description,
        editionId: edition,
      },
      {
          headers: { Authorization : `Bearer ${this.$store.getters.getAccessToken}`}
      });
      if (response.status < 300) {
        this.closeModal();
      }
      console.log(response);
    }
  }
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
