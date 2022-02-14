<template>
  <div class="container-fluid">
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Disciplines</h2>
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
          <button type="button" class="btn btn-primary text-light" @click="showDisciplineModal">Ajouter discipline</button>
          <!-- <button
            type="button"
            class="btn btn-warning"
            @click="filterMenuActive = !filterMenuActive"
          >
            Filtrer
          </button> -->
          <button type="button" class="btn bg-danger text-light">Supprimer</button>
        </div>
      </div>
    </div>

    <div class="row border-top bg-light m-2" v-if="filterMenuActive">
      <div class="col text-start">test</div>
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
                  @change="selectAllRows = !selectAllRows"
                />
              </th>
              <th scope="col">Nom</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <input
                  class="form-check-input mt-0"
                  type="checkbox"
                  value=""
                  aria-label="Checkbox for following text input"
                  :checked="selectAllRows"
                />
              </th>
              <td>
                <router-link
                  :to="{ name: 'DisciplineDetails', params: { id: 'test' } }"
                >
                  Random Discipline
                </router-link>
              </td>
              <td>A random description for a random discipline</td>
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
  methods: {
    showDisciplineModal() {
      this.$emit("showDisciplineModal")
    }
  },
  mounted () {
    this.$emit('isActive', 'Disciplines');
  }
});
</script>

<style>

</style>