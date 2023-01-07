<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Mise à jour discipline</h4>
        </div>
        <div class="col-1">
          <button id="close-arrow" @click="closeModal">
            <span class="material-icons-outlined"> close </span>
          </button>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-5 my-4 text-start" @submit.prevent="updateDiscipline">
        <div class="mb-3 fw-bold">
          <label for="inputName" class="form-label"
            >Nom de la discipline:</label
          >
          <input
            type="text"
            class="form-control"
            id="inputName"
            aria-describedby="emailHelp"
            v-model="discipline.name"
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
            v-model="discipline.description"
            required
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-3">
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Discipline } from "@/types/disscipline";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    discipline: {
      type: Object as () => Discipline,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeDisciplineModal");
    },
    async updateDiscipline() {
      const response = await axios.put(
        `disciplines/${this.discipline.id}`,
        this.discipline
      );
      if (response.status < 300) {
        this.closeModal();
      }
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

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}
</style>
