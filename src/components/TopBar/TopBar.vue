<template>
  <div id="top-bar" class="sticky-top bg-primary">
    <div id="top-logo">
      <span id="overun">
        <h1 class="m-0 text-light">Overun</h1>
      </span>
    </div>
    <div id="top-side" class="container-fluid p-0 shadow-sm">
      <div class="row m-0 p-0 h-100">
        <div class="col-2 h-100">
          <span
            id="hide-sidebar-icon"
            class="material-icons fs-2 primary-text"
            @click="toggleSideBar"
          >
            menu
          </span>
        </div>
        <div class="col-3 h-100"></div>
        <div class="col-7 h-100">
          <div id="img-container" class="h-100 dropdown">
            <a
              id="dropdownUserLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                id="profile-picture"
                src="../../assets/profim-picture.jpeg"
                alt="Profil image"
              />
            </a>

            <ul
              id="dropdownUserMenu"
              class="dropdown-menu p-0"
              aria-labelledby="dropdownUserLink"
            >
              <li class="inactiveLink">
                <span class="dropdown-item text-center pt-2 pb-2" href="#"
                  >Pintade</span
                >
              </li>
              <li><hr class="dropdown-divider m-0 p-0" /></li>
              <li>
                <a class="dropdown-item text-dark pt-2 pb-2" href="#">
                  <span class="material-icons-outlined icon d-inline m-0 p-0">
                    settings
                  </span>
                  <p class="d-inline">Paramètre</p>
                </a>
              </li>
              <li><hr class="dropdown-divider m-0 p-0" /></li>
              <li>
                <a
                  class="dropdown-item bg-danger text-light pt-2 pb-2"
                  href="#"
                >
                  <span class="material-icons-outlined icon d-inline m-0 p-0">
                    meeting_room
                  </span>
                  <p class="d-inline">Deconnection</p>
                </a>
              </li>
            </ul>
          </div>
          <div id="edition-button" class="h-100">
            <a
              id="dropdownEditionLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div class="centered-text">
                <p>Edition</p>
              </div>
              <div class="h-100 w-10" id="edition-arrow">
                <span class="material-icons d-inline" id="test">
                  expand_more
                </span>
              </div>
            </a>

            <ul
              id="dropdownEditionMenu"
              class="dropdown-menu p-0"
              aria-labelledby="dropdownEditionLink"
            >
              <li class="inactiveLink">
                <span class="dropdown-item text-center pt-2 pb-2" href="#"
                  >Pintade</span
                >
              </li>
              <li><hr class="dropdown-divider m-0 p-0" /></li>
              <li>
                <a class="dropdown-item text-dark pt-2 pb-2" href="#">
                  <span class="material-icons-outlined icon d-inline m-0 p-0">
                    settings
                  </span>
                  <p class="d-inline">Paramètre</p>
                </a>
              </li>
              <li><hr class="dropdown-divider m-0 p-0" /></li>
              <li>
                <a
                  class="dropdown-item bg-danger text-light pt-2 pb-2"
                  href="#"
                >
                  <span class="material-icons-outlined icon d-inline m-0 p-0">
                    meeting_room
                  </span>
                  <p class="d-inline">Deconnection</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    toggleSideBar() {
      this.$emit("toggleSideBar");
    },
  },
});
</script>

<style scoped>
#top-bar {
  height: 60px;
}

#top-logo {
  height: 100%;
  line-height: 60px;
  text-align: center;
  width: 320px;
  background: #24305e;
  float: left;
}

#top-side {
  height: 100%;
  background: white;
}

#top-admin {
  width: calc(100vw - 320px);
}

#overun {
  margin-top: 8px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

#hide-sidebar-icon {
  height: 30px;
  margin-top: 14px;
  margin-left: 30px;
  float: left;
}

#img-container {
  width: 50px;
  margin: 0 6px 0 20px;
  float: right;
}

#profile-picture {
  border: 2px solid #374785;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
  margin-top: 8px;
}

#edition-button {
  line-height: 60px;
  text-align: center;
  width: 150px;
  display: block;
  float: right;
  color: white;
  background: #374785;
}

#edition-button:hover {
  font-weight: bolder;
}

.centered-text {
  margin-top: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

#edition-arrow {
  display: inline-block;
  margin-left: 3px;
  line-height: 60px;
}

#test {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

#dropdownUserMenu {
  margin-top: 22px !important;
}

#dropdownEditionMenu {
   margin-top: 22px !important;
   margin-right: 60px !important;
}


.icon {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

.inactiveLink {
  pointer-events: none;
  cursor: default;
}
</style>
