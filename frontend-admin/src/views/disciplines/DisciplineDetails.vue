<template>
   <div class="container-fluid">
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Random Discipline (Discipline)</h2>
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
            A random description for a random Discipline
          </p></span
        >
      </div>
    </div>

    <div class="row m-2 mt-3">
      <div
        class="col text-start border-bottom d-inline"
      >
        <h4>
          Courses
        </h4>
      </div>
    </div>

    <div class="row m-2 bg-light rounded">
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
export default defineComponent ({
    mounted() {
    this.$emit("isActive", "Disciplines");
  },

});
</script>

<style>

</style>