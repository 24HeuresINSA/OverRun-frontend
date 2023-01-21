<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Modification course</h4>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-5 my-4 text-start" @submit.prevent="updateRace()">
        <div class="mb-3 fw-bold">
          <label for="inputName" class="form-label">Nom de la course</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            aria-describedby="emailHelp"
            required
            v-model="race.name"
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
            v-model="race.maxParticipants"
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
            v-model="race.maxTeams"
          />
        </div>
        <div class="mb-3 fw-bold">
          <label for="exampleInputEmail1" class="form-label"
            >Categorie de la course</label
          >
          <select class="form-select" required v-model="race.category.id">
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
            >Disciplines de la course:</label
          >
          <select class="form-select" multiple>
            <option
              v-for="discipline in disciplines"
              :key="discipline.id"
              value="1"
              class=""
              @click="toggleSelectionDiscipline(discipline.id, discipline.name)"
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
        <div v-if="selectedRaceDisciplines.length > 0">
          <div
            v-for="selectedDiscipline in selectedRaceDisciplines"
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
        <div class="error" v-show="error">Une erreur est survenue</div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-3">Modifier</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Category, Race } from "@/types/interface";
import axios from "axios";
import { defineComponent } from "vue";

export interface Discipline {
  id: number;
  name: string;
  duration?: number;
}

export default defineComponent({
  name: "UpdateRace",
  props: {
    race: {
      type: Object as () => Race,
      required: true,
    },
  },
  data() {
    return {
      disciplines: [] as Discipline[],
      categories: [] as Category[],
      selectedRaceDisciplines: [] as Discipline[],
      registrationPrice: 0,
      vaRegistrationPrice: 0,
      error: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeUpdateRace");
    },
    centimesToEuros(price: number) {
      return price / 100;
    },
    eurosToCentimes(price: number) {
      return price * 100;
    },
    toggleSelectionDiscipline(id: number, name: string) {
      let i = 0;
      let isAlreadySelected = false;
      this.selectedRaceDisciplines.forEach(function (
        selectedRaceDiscipline,
        index
      ) {
        if (selectedRaceDiscipline.id === id) {
          isAlreadySelected = true;
          i = index;
        }
      });
      if (isAlreadySelected) {
        this.selectedRaceDisciplines.splice(i, 1);
      } else {
        const discipline: Discipline = {
          id: id,
          name: name,
          duration: 0,
        };
        this.selectedRaceDisciplines.push(discipline);
      }
    },
    isDisciplineSelected(id: number): boolean {
      this.selectedRaceDisciplines.forEach(function (
        selectedDiscipline,
        index
      ) {
        if (selectedDiscipline.id === id) {
          return true;
        }
      });
      return false;
    },
    async updateRace() {
      const response = await axios.put("races/" + this.race.id, {
        name: this.race.name,
        registrationPrice: this.eurosToCentimes(this.registrationPrice),
        vaRegistrationPrice: this.eurosToCentimes(this.vaRegistrationPrice),
        maxParticipants: this.race.maxParticipants,
        maxTeams: this.race.maxTeams,
        disciplineIds: this.selectedRaceDisciplines,
        categoryId: this.race.category.id,
      });
      this.error = response.status >= 300;
      if (this.error) {
        return;
      }
      this.$emit("updateRaceSuccess");
      this.closeModal();
    },
  },
  async mounted() {
    this.registrationPrice = this.centimesToEuros(this.race.registrationPrice);
    this.vaRegistrationPrice = this.centimesToEuros(
      this.race.vaRegistrationPrice
    );
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
    this.selectedRaceDisciplines = this.race.disciplines.map(function (elt) {
      return {
        id: elt.discipline.id,
        name: elt.discipline.name,
        duration: elt.duration,
      };
    });
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
