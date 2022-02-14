<template>
  <TopBar @toggleSideBar="toggleSideBar" />

  <SideBar :hide="hideSideBar" activeVue="AdminInvites" />
  <div class="container-fluid main-container" :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }">
    <div class="row m-2 mt-4">
      <div class="col-4 text-start border-bottom p-0">
        <h2>Invitations Administrateurs</h2>
      </div>
      <div class="col-6"></div>
      <div class="col-2">
        <SearchBoxVue />
      </div>
    </div>
    <div class="row m-2 mt-4">
      <div class="col text-end">
        <button class="btn btn-primary mx-3">+ Invitation</button>
        <button class="btn btn-danger">Supprimer</button>
      </div>
    </div>

    <div class="row m-2 mt-4 bg-light rounded">
      <div class="col">
        <table class="table table-striped table-hover">
          <thead style="position: sticky; top: 0">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody class="overflow-scroll" id="table-body">
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";
import SearchBoxVue from "../../components/searchBar/SearchBar.vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    SearchBoxVue,
  },
  data() {
    return {
      hideSideBar: false,
    };
  },
  methods: {
    toggleSideBar(): void {
      this.hideSideBar = !this.hideSideBar;
    },
  },
  mounted() {
    this.$emit("isActive", "AdminInvites");
  },
});
</script>

<style scoped>
button {
  border-radius: 0 !important;
}

/* table {
  display: block;
  overflow: scroll;
  width: 100%;
  height: 200px;
} */
</style>
