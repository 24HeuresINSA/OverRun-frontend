<template>
  <div
    class="container-fluid text-light"
    id="side-bar-main-link"
    @mouseover="hover = true"
    @mouseout="hover = false"
    @click="toggleDropdown"
    :class="{ active: isActive || childIsActive }"
  >
    <div class="row text-start m-0 p-0">
      <div class="col-1 p-0" id="left-icon-column">
        <div v-if="hover === true">
          <span class="material-icons centered-element" id="left-icon">
            {{ icon }}
          </span>
        </div>
        <div v-else>
          <span class="material-icons-outlined centered-element" id="left-icon">
            {{ icon }}
          </span>
        </div>
      </div>
      <div class="col p-0">
        <span class="centered-element text-start" id="text"> {{ title }} </span>
      </div>
      <div class="col p-0 text-end">
        <div v-if="isActive || childIsActive">
          <span class="material-icons centered-element" id="right-icon">
            expand_more
          </span>
        </div>
        <div v-else>
          <span class="material-icons centered-element" id="right-icon">
            navigate_next
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    route: String,
    title: String,
    icon: String,
    activeVue: String,
    childIsActive: Boolean,
  },
  data() {
    return {
      hover: false,
      isActive: false,
      saveChildIsActive: this.childIsActive,
    };
  },
  methods: {
    toggleDropdown() {
      console.log();
      if (!this.childIsActive) {
        this.isActive = !this.isActive;
        this.$emit("isActive", this.title, this.isActive);
      }
    },
  },
  watch: {
    childIsActive: function (newValue, oldValue) {
      if (!newValue) {
        this.isActive = false;
        this.$emit("isActive", this.title, this.isActive);
      }
    },
  },
});
</script>

<style scoped>
#side-bar-main-link {
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 320px;
  padding-left: 40px;
  padding-right: 30px;
}

#side-bar-main-link:hover {
  background: #24305e;
  font-weight: bolder;
}

.active {
  background: #24305e;
}

#left-icon-column {
  width: 20px;
}

#left-icon {
  margin-top: 6px;
}

#right-icon {
  margin-top: 10px;
}

#text {
  margin-top: 2px;
  margin-left: 20px;
}

.centered-element {
  min-height: 30px;
  display: inline-flex;
  align-items: center;
  line-height: normal;
}

a {
  text-decoration: none;
  color: white;
}
</style>
