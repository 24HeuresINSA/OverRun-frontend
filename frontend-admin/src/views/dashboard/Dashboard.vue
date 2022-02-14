<template>
  <div>
    <TopBar @toggleSideBar="toggleSideBar" />
    <SideBar :hide="hideSideBar" activeVue="Home" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "../../components/SideBar/SideBar.vue";
import TopBar from "../../components/TopBar/TopBar.vue";

export default defineComponent({
  components: {
    SideBar,
    TopBar,
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
  mounted() {},
});
</script>

<style>
</style>