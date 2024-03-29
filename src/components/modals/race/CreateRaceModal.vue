<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Creation course</h4>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-5 my-4 text-start" @submit.prevent="createRace($event)">
        <div class="mb-3 fw-bold">
          <label for="inputName" class="form-label">Nom de la course</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            aria-describedby="emailHelp"
            required
            v-model="name"
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
            required
            v-model="registrationPrice"
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
            required
            v-model="vaRegistrationPrice"
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="inputMaxInscriptions" class="form-label"
            >Nombre maximal d'inscrits:</label
          >
          <input
            type="number"
            min="0"
            class="form-control"
            id="inputMaxInscriptions"
            aria-describedby="emailHelp"
            required
            v-model="maxParticipants"
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="inputMaxInscriptions" class="form-label"
            >Nombre maximal d'équipes:</label
          >
          <input
            type="number"
            min="0"
            class="form-control"
            id="inputMaxInscriptions"
            aria-describedby="emailHelp"
            required
            v-model="maxTeams"
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="exampleInputEmail1" class="form-label"
            >Categorie de la course</label
          >
          <select class="form-select" required v-model="categoryId">
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
              @click="selectDiscipline(discipline.id, discipline.name)"
            >
              <span
                v-if="isDisciplineSelected(discipline.id)"
                class="material-icons-outlined"
              >
                done
              </span>
              {{ discipline.name }}
            </option>
          </select>
        </div>
        <div v-if="selectedDisciplines.length > 0">
          <div
            v-for="selectedDiscipline in selectedDisciplines"
            :key="selectedDiscipline.id"
            class="mb-3 fw-bold"
          >
            <label for="inputMaxInscriptions" class="form-label"
              >Durée de {{ selectedDiscipline.name }}</label
            >
            <input
              type="number"
              min="0"
              class="form-control"
              id="inputMaxInscriptions"
              aria-describedby="emailHelp"
              required
              v-model="selectedDiscipline.duration"
            />
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-3">Créer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export interface Discipline {
  id: number;
  name: string;
  duration?: number;
}

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
      selectedDisciplines: [] as Discipline[],
      name: null,
      registrationPrice: 0,
      vaRegistrationPrice: 0,
      maxParticipants: null,
      maxTeams: null,
      categoryId: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeRaceModal");
    },
    eurosToCentimes(price: number) {
      return price * 100;
    },
    selectDiscipline(id: number, name: string) {
      let i = 0;
      let isAlreadySelected = false;
      this.selectedDisciplines.forEach(function (selectedDiscipline, index) {
        if (selectedDiscipline.id === id) {
          isAlreadySelected = true;
          i = index;
        }
      });
      if (isAlreadySelected) {
        this.selectedDisciplines.splice(i, 1);
      } else {
        const discipline: Discipline = {
          id: id,
          name: name,
          duration: 0,
        };
        this.selectedDisciplines.push(discipline);
      }
    },
    isDisciplineSelected(id: number): boolean {
      this.selectedDisciplines.forEach(function (selectedDiscipline, index) {
        if (selectedDiscipline.id === id) {
          return true;
        }
      });
      return false;
    },
    async createRace(e: Event) {
      const response = await axios.post("races", {
        name: this.name,
        registrationPrice: this.eurosToCentimes(this.registrationPrice),
        vaRegistrationPrice: this.eurosToCentimes(this.vaRegistrationPrice),
        maxParticipants: this.maxParticipants,
        maxTeams: this.maxTeams,
        disciplineIds: this.selectedDisciplines,
        categoryId: this.categoryId,
        editionId: this.$store.getters["edition/getEditionId"],
      });
      if (response.status < 300) {
        this.closeModal();
        (e.target as HTMLFormElement)?.reset();
      }
    },
  },
  async mounted() {
    let response = await axios.get("disciplines", {
      params: {
        editionId: this.$store.getters["edition/getEditionId"],
      },
    });
    if (response.status < 300) {
      this.disciplines = response.data.data;
    }
    response = await axios.get("categories", {
      params: {
        editionId: this.$store.getters["edition/getEditionId"],
      },
    });
    if (response.status < 300) {
      this.categories = response.data.data;
    }
  },
});
</script>

<style scoped>
.custom-modal {
  width: 30%;
  max-height: 70%;
  overflow-y: scroll;
  overflow-x: hidden;
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
