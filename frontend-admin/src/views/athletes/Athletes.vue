<template>
  <div class="container-fluid">
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Courses</h2>
      </div>
      <div class="col-6"></div>
      <div class="col-2">
        <SearchBarVue />
      </div>
    </div>
    <div class="row m-2 mt-4">
      <div class="col text-end">
        <div
          class="btn-group"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" class="btn btn-primary">Ajouter course</button>
          <button type="button" class="btn btn-warning" @click="filterMenuActive = !filterMenuActive">Filtrer</button>
          <button type="button" class="btn btn-danger">Supprimer</button>
        </div>
      </div>
    </div>

    <div class="row border-top bg-light m-2" v-if="filterMenuActive">
      <div class="col text-start">
          test
      </div>
    </div>

    <div class="row m-2 mt-4 bg-light rounded">
      <div class="col">
        <table class="table table-striped table-hover">
          <thead style="position: sticky; top: 0">
            <tr>
              <th scope="col">
                <input
                  class="form-check-input mt-0"
                  type="checkbox"
                  value=""
                  aria-label="Checkbox for following text input"
                  @change="selectAllRows=!selectAllRows" 
                />
              </th>
              <th scope="col">Nom</th>
              <th scope="col">Maximum participants</th>
              <th scope="col">Maximum équipes</th>
              <th scope="col">Disciplines</th>
              <th scope="col">Categories</th>
              <th scope="col">Tarif</th>
              <th scope="col">Tarif VA</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <input
                  class="form-check-input mt-0 "
                  type="checkbox"
                  value=""
                  aria-label="Checkbox for following text input"
                  :checked="selectAllRows"
                />
              </th>
              <td>
                <router-link :to="{ name: 'RaceDetails', params: {id: 'test'}}">
                  Random Race
                </router-link>
              </td>
              <td>200</td>
              <td>10</td>
              <td>
                <a href="" class="badge rounded-pill bg-primary mx-1">Discipline 2</a>
                <a href="" class="badge rounded-pill bg-primary mx-1">Discipline 3</a>
                <a href="" class="badge rounded-pill bg-primary mx-1">Discipline 1</a>
              </td>
              <td>
                <a href="" class="badge rounded-pill bg-primary mx-1">Discipline 1</a>
              </td>
              <td>12.5€</td>
              <td>12€</td>
              <td>
                <a href="" class="badge bg-danger"> Supprimer</a>
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
import SearchBarVue from "@/components/searchBar/SearchBar.vue";

export default defineComponent({
  components: {
    SearchBarVue,
  },
  data() {
    return {
        filterMenuActive: false,
        selectAllRows: false,
    }
  },
  mounted () {
    this.$emit('isActive', 'Athletes');
  }
});
</script>

<style>

</style>