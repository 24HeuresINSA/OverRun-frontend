<template>
  <div class="container-fluid">
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Athletes</h2>
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
              <th scope="col">Prénom - Nom</th>
              <th scope="col">Course</th>
              <th scope="col">Equipe</th>
              <th scope="col">VA</th>
              <th scope="col">Certificat</th>
              <th scope="col">Payement</th>
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
                <router-link :to="{ name: 'InscriptionDetails', params: {id: 'test'}}">
                  Random Athlete
                </router-link>
              </td>
              <td>
                <router-link :to="{name: 'RaceDetails', params: {id: 'test'} }">
                  Random Race
                  </router-link>
              </td>
              <td>
                <router-link :to="{name: 'TeamDetails', params: {id: 'test'} }">
                  Random Team
                </router-link>
              </td>
              <td>
                <span class="material-icons-outlined">
                done
                </span>
              </td>
              <td @click="showCertificate">
                <a class="badge rounded-pill bg-success mx-1">Validé</a>
              </td>
              <td>
                <a href="" class="badge rounded-pill bg-success mx-1">Validé</a>
              </td>
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
import CertificateModalVue from "@/components/CertificateModal/CertificateModal.vue";

export default defineComponent({
  components: {
    SearchBarVue,
    CertificateModalVue
  },
  data() {
    return {
        filterMenuActive: false,
        selectAllRows: false,
        showCertificateModal: false,
    }
  },
  methods: {
    showCertificate () {
      this.$emit('showCertificate', true, [1,2,3], 1)
    }
  },
  mounted () {
    this.$emit('isActive', 'Inscriptions');
  }
});
</script>

<style>

</style>