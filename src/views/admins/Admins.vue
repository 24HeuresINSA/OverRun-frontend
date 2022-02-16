<template>
<div>
  <TopBar @toggleSideBar="toggleSideBar" />

  <SideBar :hide="hideSideBar" activeVue="Admins" />

  <div v-show="showAdminInviteModal">
    <CreateAdminInviteVue @closeAdminInviteModal="toggleAdminInviteModal" />
  </div>

  <h1>Admins Vue</h1>

</div>
 
</template>

<script lang="ts">
import {defineComponent } from "vue";
import SideBar from "../../components/SideBar/SideBar.vue";
import TopBar from "../../components/TopBar/TopBar.vue";
import CreateAdminInviteVue from "../../components/modals/CreateAdminInvite.vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
    CreateAdminInviteVue
  },
  data () {
    return {
      hideSideBar: false,
      showAdminInviteModal: true
    };
  },
  methods: {
    toggleSideBar(): void{
      this.hideSideBar = !this.hideSideBar;
    },
    toggleAdminInviteModal() {
      this.showAdminInviteModal = !this.showAdminInviteModal;
    }
  },
  mounted () {}
});
</script>


<style>

</style>