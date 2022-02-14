<template>
  <div v-show="showCertificateModal">
    <CertificateModal
      @hideCertificate="toggleCertificateModal"
      :inscriptions="inscriptions"
      :index="index"
    />
  </div>

  <div v-show="!getLoginApiStatus">
    <Login />
  </div>

  <div v-show="showCategoryModal">
    <CreateCategoryVue @closeCategoryModal="toggleCategoryModal" />
  </div>

  <div v-show="showDisciplineModal">
    <CreateDisciplineVue @closeDisciplineModal="toggleDisciplineModal" />
  </div>

  <div v-show="showEditionModal">
    <CreateEditionModalVue @closeEditionModal="toggleEditionModal" />
  </div>

  <div v-show="showRaceModal">
    <CreateRaceModalVue @closeRaceModal="toggleRaceModal" />
  </div>

  <div v-show="showAdminInviteModal">
    <CreateAdminInviteVue @closeAdminInviteModal="toggleAdminInviteModal" />
  </div>

  <TopBar @toggleSideBar="toggleSideBar" />

  <SideBar :hide="hideSideBar" :activeVue="activeVue" />

  <div
    class="container-fluid"
    id="main-container"
    :class="{ fullScreen: hideSideBar, notFullScreen: !hideSideBar }"
  >
    <router-view
      @isActive="setActiveVue"
      @showCertificate="toggleCertificateModal"
      @showCategoryModal="toggleCategoryModal"
      @showDisciplineModal="toggleDisciplineModal"
      @showEditionModal="toggleEditionModal"
      @showRaceModal="toggleRaceModal"
      @showAdminInviteModal="toggleAdminInviteModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./components/SideBar/SideBar.vue"
import TopBar from "./components/TopBar/TopBar.vue"
import CertificateModal from "./components/CertificateModal/CertificateModal.vue";
import CreateAdminInviteVue from "./components/modals/CreateAdminInvite.vue";
import CreateRaceModalVue from "./components/modals/CreateRaceModal.vue";
import CreateEditionModalVue from "./components/modals/CreateEditionModal.vue";
import CreateCategoryVue from "./components/modals/CreateCategory.vue";
import CreateDisciplineVue from "./components/modals/CreateDiscipline.vue";
import Login from "./components/login/Login.vue";
import { mapGetters } from "vuex";

export default defineComponent ({
  components: {
    SideBar,
    TopBar,
    CertificateModal,
    Login,
    CreateCategoryVue,
    CreateDisciplineVue,
    CreateEditionModalVue,
    CreateRaceModalVue,
    CreateAdminInviteVue,
  },
  data () {
    return {
      hideSideBar: false,
      activeVue: "Home",
      showCertificateModal: false,
      showCategoryModal: false,
      showDisciplineModal: false,
      showEditionModal: false,
      showRaceModal: false,
      showAdminInviteModal: false,
      inscriptions: [] as Array<number>,
      index: 0,
      logged: false,
    }
  },
  methods: {
    toggleSideBar(): void{
      this.hideSideBar = !this.hideSideBar;
    },
    setActiveVue(elem: string) {
      console.log(elem);
      this.activeVue = elem;
    },
    toggleCertificateModal(show: boolean = true, inscriptions: Array<number> = [], index: number = 0) {
        this.showCertificateModal = !this.showCertificateModal;
        this.inscriptions = inscriptions;
        this.index = index;
    },
    toggleCategoryModal() {
      this.showCategoryModal = !this.showCategoryModal;
    },
    toggleDisciplineModal() {
      this.showDisciplineModal = !this.showDisciplineModal;
    },
    toggleEditionModal() {
      this.showEditionModal = !this.showEditionModal;
    },
    toggleRaceModal(){
      this.showRaceModal = !this.showRaceModal;
    },
    toggleAdminInviteModal() {
      this.showAdminInviteModal = !this.showAdminInviteModal;
    }
  },
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

#main-container {
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
