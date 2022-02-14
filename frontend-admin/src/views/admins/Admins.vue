<template>
 <TopBar @toggleSideBar="toggleSideBar" />

  <SideBar :hide="hideSideBar" activeVue="Admins" />
  <h1>Admins Vue</h1>
</template>

<script lang="ts">
import {defineComponent } from "vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import TopBar from "@/components/TopBar/TopBar.vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
  },
  data () {
    return {
      hideSideBar: false,
    };
  },
  methods: {
    toggleSideBar(): void{
      this.hideSideBar = !this.hideSideBar;
    },
  },
  mounted () {
    this.$emit('isActive', 'Admins');
  }
});
</script>


<style>

</style>