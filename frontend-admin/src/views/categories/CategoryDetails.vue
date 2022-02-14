<template>
  <div class="container-fluid">
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Random Categorie (Categorie)</h2>
      </div>
      <div class="col-6"></div>
      <div class="col-2 text-end">
        <button class="btn btn-warning">Modifier</button>
      </div>
    </div>
    <div class="row mt-4 m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Description:</p>
          <p class="d-inline">
            A random description for a random category
          </p></span
        >
      </div>
    </div>
    <div class="row m-2">
      <div class="col text-start">
        <span class="d-inline">
          <p class="d-inline fw-bolder me-2">Nombre minimum d'équipier:</p>
          <p class="d-inline">2</p>
        </span>
      </div>
    </div>
    <div class="row m-2">
      <div class="col text-start">
        <span class="d-inline"
          ><p class="d-inline fw-bolder me-2">Nombre maximum d'équipier:</p>
          <p class="d-inline">10</p>
          </span>
      </div>
    </div>

    <div class="row m-2 mt-3">
      <div
        class="col text-start border-bottom d-inline"
        @click="showRaces = !showRaces"
      >
        <h4>
          Courses
          <span v-if="showRaces" class="material-icons-outlined d-inline">
            expand_more
          </span>
          <span v-else class="material-icons-outlined"> navigate_next </span>
        </h4>
      </div>
    </div>

    <div v-if="showRaces" class="row m-2 bg-light rounded">
      <div class="col">
        <table class="table table-striped table-hover">
          <thead style="position: sticky; top: 0">
            <tr>
              <th scope="col">Course</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <router-link
                  :to="{ name: 'RaceDetails', params: { id: 'test' } }"
                >
                  Random Race
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      showRaces: true,
    };
  },
  mounted() {
    this.$emit("isActive", "Categories");
  },
});
</script>

<style></style>
