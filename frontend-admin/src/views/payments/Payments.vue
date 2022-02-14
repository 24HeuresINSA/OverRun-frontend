<template>
 <TopBar @toggleSideBar="toggleSideBar" />

  <SideBar :hide="hideSideBar" activeVue="Payments" />
  <div class="container-fluid main-container" :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }">
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Payement</h2>
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
          <button
            type="button"
            class="btn btn-warning"
            @click="filterMenuActive = !filterMenuActive"
          >
            Filtrer
          </button>
          <button type="button" class="btn btn-danger">Supprimer</button>
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
              <th scope="col">Transaction</th>
              <th scope="col">Athlète</th>
              <th scope="col">Course</th>
              <th scope="col">Montant payement</th>
              <th scope="col">Montant dû</th>
              <th scope="col">Status</th>
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
                <router-link :to="{ name: 'PaymentDetails', params: {id: 'test'}}">
                  Random Payment
                </router-link>
              </td>
              <td>
                <router-link :to="{ name: 'InscriptionDetails', params: {id: 'test'}}">
                  Random Athlete
                </router-link>
              </td>
              <td>
                <router-link
                  :to="{ name: 'RaceDetails', params: { id: 'test' } }"
                >
                  Random Race
                </router-link>
              </td>
              <td>12.5</td>
              <td>12.5</td>
              <td>
                <a href="" class="badge rounded-pill bg-success"> Payé</a>
              </td>
              <td>
                <a href="" class="badge bg-warning text-dark"> Valider payement</a>
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
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBarVue,
  },
  data() {
    return {
      hideSideBar: false,
      filterMenuActive: false,
      selectAllRows: false,
    };
  },
  methods: {
    toggleSideBar(): void{
      this.hideSideBar = !this.hideSideBar;
    },
  },
  mounted() {
    this.$emit("isActive", "Payments");
  },
});
</script>

<style></style>
