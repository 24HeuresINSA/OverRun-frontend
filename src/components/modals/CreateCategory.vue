<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Creation catégorie</h4>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-5 my-4 text-start" @submit.prevent="createCategory">
        <div class="mb-3 fw-bold">
          <label for="inputName" class="form-label">Nom de la catégorie</label>
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
          <label for="inputDescription" class="form-label">Description</label>
          <input
            type="text"
            class="form-control"
            id="inputDescription"
            aria-describedby="emailHelp"
            v-model="description"
            required
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="inputMinTeamMember" class="form-label"
            >Nombre minimum d'équipiers
          </label>
          <input
            type="number"
            min="0"
            class="form-control"
            id="inputMinTeamMember"
            aria-describedby="emailHelp"
            v-model="minTeamMembers"
            required
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="inputMaxTeamMember" class="form-label"
            >Nombre maximum d'équipiers
          </label>
          <input
            type="number"
            min="0"
            class="form-control"
            id="inputMaxTeamMember"
            aria-describedby="emailHelp"
            v-model="maxTeamMembers"
            required
          />
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-3">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      name: null,
      description: null,
      maxTeamMembers: null,
      minTeamMembers: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeCategoryModal");
    },
    async createCategory() {
      const response = await axios.post(
        "categories",
        {
          name: this.name,
          description: this.description,
          maxTeamMembers: this.maxTeamMembers,
          minTeamMembers: this.minTeamMembers,
          editionId: this.$store.getters.getEditionId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          },
        }
      );
      if (response.status < 300) {
        this.closeModal();
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
