<template>
  <div class="container-fluid">
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Random Team (Équipe)</h2>
      </div>
      <div class="col-6"></div>
      <div class="col-2">
        <SearchBarVue />
      </div>
    </div>
    <div class="row mt-4 m-2">
        <div class="col text-start">
            Course: <router-link :to="{ name: 'RaceDetails', params: {id: 'test'}}">
                  Random Race
                </router-link>
        </div>
    </div>
     <div class="row  m-2">
        <div class="col text-start">
            Nombre d'équipier: 7/10
        </div>
    </div>

     <div class="row  m-2">
        <div class="col text-start">
            Nombre d'inscriptions complètes: 5/7
        </div>
    </div>

     <div class="row m-2 mt-3">
      <div class="col text-start border-bottom" >
        <h4>Membres</h4>
        
      </div>
    </div>

    <div class="row m-2 bg-light rounded">
      <div class="col">
        <table class="table table-striped table-hover">
          <thead style="position: sticky; top: 0">
            <tr>
              <th scope="col"></th>
              <th scope="col">Athlète</th>
              <th scope="col">Email</th>
              <th scope="col">Inscription</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <span class="material-icons-outlined">
                military_tech
                </span>
              </th>
              <td>
                <router-link :to="{ name: 'InscriptionDetails', params: {id: 'test'}}">
                  Random Athlète
                </router-link>
              </td>
              <td>
                random-athlete@random.com
              </td>
              <td>
                  <a href="" class="badge rounded-pill bg-success mx-1">Complète</a>
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
  mounted() {
    this.$emit("isActive", "Teams");
  },
});
</script>

<style></style>
