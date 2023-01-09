<template>
  <router-link :to="{ name: route }">
    <div
      class="container-fluid"
      id="side-bar-secondary-link"
      :class="{ active: activeVue === route }"
    >
      <div class="row text-start m-0 p-0">
        <div class="col-1 p-0" id="left-icon-column"></div>
        <div class="col p-0">
          <span class="centered-element text-start" id="text">
            ꞏ {{ title }}
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    route: String,
    title: String,
    activeVue: String,
  },
  data() {
    return {
      dropteddown: false,
      isActive: false,
    };
  },
  methods: {
    toggleDropdown() {
      if (!this.isActive) {
        this.$emit("dropDown", this.title);
        this.dropteddown = !this.dropteddown;
      }
    },
  },
});
</script>

<style scoped>
#side-bar-secondary-link {
  padding-left: 70px;
  background: #24305e;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

#side-bar-secondary-link:hover {
  font-weight: bolder;
}

.active {
  font-weight: bolder;
  border-left-style: solid;
  border-left-width: 5px;
  border-left-color: white;
  padding-left: 65px !important;
  padding-right: 30px;
}

#left-icon-column {
  width: 20px;
}

a {
  text-decoration: none;
  color: white;
}

#text {
  margin-top: 5px;
  margin-left: 0px;
  font-size: 11pt;
}
</style>
