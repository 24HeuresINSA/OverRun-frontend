<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Creation discipline</h4>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-5 my-4 text-start">
        <div class="mb-3 fw-bold">
          <label for="inputName" class="form-label">Nom de la course</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="inputRegularPrice" class="form-label"
            >Prix de l'inscription classique:</label
          >
          <input
            type="number"
            min="0"
            class="form-control"
            id="inputRegularPrice"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="inputVaPrice" class="form-label"
            >Prix de l'inscription VA:</label
          >
          <input
            type="number"
            min="0"
            class="form-control"
            id="inputVaPrice"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="inputMaxInscriptions" class="form-label"
            >Nombre maximum d'inscrits:</label
          >
          <input
            type="number"
            min="0"
            class="form-control"
            id="inputMaxInscriptions"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="exampleInputEmail1" class="form-label"
            >Categorie de la course</label
          >
          <select class="form-select" required>
            <option value="" disabled selected hidden></option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }} ({{ category.minTeamMembers }}-{{
                category.maxTeamMembers
              }})
            </option>
          </select>
        </div>
        <div class="mb-3 fw-bold">
          <label for="exampleInputEmail1" class="form-label"
            >Disciplines de la courses:</label
          >
          <select class="form-select" multiple>
            <option
              v-for="discipline in disciplines"
              :key="discipline.id"
              value="1"
              class=""
              @click="selectDiscipline(discipline.id)"
            >
              <span
                v-if="selectedDisciplines.includes(discipline.id)"
                class="material-icons-outlined"
              >
                done
              </span>
              {{ discipline.name }}
            </option>
          </select>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-3">Submit</button>
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
      disciplines: [{ id: 0, name: "" }],
      categories: [
        {
          id: 0,
          name: "",
          description: "",
          maxTeamMembers: 0,
          minTeamMembers: 0,
        },
      ],
      selectedDisciplines: [] as Array<number>,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeRaceModal");
    },
    selectDiscipline(id: number) {
      if (this.selectedDisciplines.includes(id)) {
        console.log("Hello");
        let index = this.selectedDisciplines.indexOf(id);
        if (index !== -1) {
          this.selectedDisciplines.splice(index, 1);
        }
      } else {
        this.selectedDisciplines.push(id);
      }
      console.log(this.selectedDisciplines);
    },
  },
  async mounted() {
    console.log(this.$store.getters.getAccessToken);
    let response = await axios.get("disciplines", {
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
      },
    });
    if (response.status < 300) {
      this.disciplines = response.data.data;
      console.log(response);
      console.log(JSON.stringify(this.disciplines));
    }
    response = await axios.get("categories", {
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
      },
    });
    if (response.status < 300) {
      this.categories = response.data.data;
      console.log(response);
      console.log(JSON.stringify(this.categories));
    }
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

.bg-white {
  background-color: white;
}

.discipline-option:checked {
  background-color: white;
}
</style>
