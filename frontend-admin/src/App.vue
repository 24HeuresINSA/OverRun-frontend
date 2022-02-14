<template>
 
  <router-view/>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent ({
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {
    ...mapGetters("auth", {
      getLoginApiStatus: "getLoginApiStatus",
    }),
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #eee;
}

body {
  height: 100%;
  width: 100%;
}

.main-container {
  height: calc(100vh - 60px);
  background: #eee;
  overflow-x: hidden;
}

.fullScreen {
  width: 100%;
  margin-left: 0;
}

.notFullScreen {
  width: calc(100vw - 320px) !important;
  margin-left: 320px;
}

.primary-bg {
  background-color: #374785;
  color: white;
}

.primary-text {
  color: #374785;
}

.success-bg {
  background-color: #f2938d;
}

.bg-secondary {
  background-color: #f2938d !important;
}

.bg-warning {
  background-color: #fbe786 !important;
}

.bg-danger {
  background-color: #ac3e3f !important;
}

.btn-danger {
  background-color: #ac3e3f;
  border-color: #ac3e3f;
}

.btn-primary {
  background-color: #374785;
  border-color: #374785;
}

.badge-danger {
  background-color: #ac3e3f;
  border-color: #ac3e3f;
}

.bg-success {
  background-color: #3fac3e !important;
}

.btn-warning {
  background-color: #f9dd55 !important;
  border: #f9dd55;
  color: black;
}

.danger-bg {
  background: #a94341;
  color: white;
}

.secondary-bg {
  background-color: #24305e;
}

.light-bg {
  background-color: #a8d0e6;
}

.light-text {
  color: #a8d0e6;
}

.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.nav-elem {
  min-height: 60px;
  display: inline-flex;
  align-items: center;
  margin: 0 30px;
  /* border: 1px solid aqua; */
}

.nav-elem2 {
  min-height: 60px;
  display: inline-flex;
  align-items: center;
}

.nav-elem3 {
  min-height: 60px;
  display: inline-flex;
  align-items: center;

  /* border: 1px solid aqua; */
}

.top-icon {
  font-size: 20pt;
  margin-left: 20px;
  margin-top: 50px;
  color: #374785;
  display: table-cell;
  vertical-align: middle;
}

.center-element {
  line-height: 60px;
}

.icon {
  width: 10px;
}

#toggle-icon {
  padding: 0 20px;
}

input[type="checkbox"]:checked {
  background-color: #f2938d;
  border-color: #bfbfbf;
}

input[type="checkbox"]:focus {
  border-color: #bfbfbf;
}

input[type="checkbox"]:focus {
  box-shadow: none;
}

a {
  color: black;
}

a:hover {
  color: white !important;
}
</style>
