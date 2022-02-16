<template>
  <div class="container-fluid text-light" id="side-bar-main-link" @mouseover="hover = true" @mouseout="hover = false" :class="{active: activeVue === route}">
    <router-link :to="{ name: route}">
    <div class="row text-start m-0 p-0">
      <div class="col-1 p-0" id="left-icon-column">
        <div v-if="hover">
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
    </div>
     </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent ({
  props: {
    'route': String,
    'title': String,
    'icon': String,
    'activeVue': String
  },
  data () {
    return {
      hover: false,
    }
  }
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
  border-left-style: solid;
  border-left-width: 10px;
  border-left-color: white;
  padding-left: 30px !important;
  padding-right: 30px;
}

#left-icon-column {
    width: 20px;
   
}

#left-icon {
  margin-top: 6px;
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
  color: white
}

</style>
