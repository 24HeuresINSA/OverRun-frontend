<template>
<div id="top-bar" class="sticky-top bg-primary">
 
  <div id="top-logo">
    <span id="overun">
            <h1 class="m-0 text-light">
              Overun
            </h1>
          </span>
  </div>
  <div id="top-side" class="container-fluid p-0 shadow-sm ">
    <div class="row m-0 p-0 h-100">
      <div class="col-2 h-100">
         <span id="hide-sidebar-icon" class="material-icons fs-2 primary-text" @click="toggleSideBar">
                menu
          </span>
      </div>
      <div class="col-3 h-100"></div>
      <div class="col-7 h-100">
        <div id="img-container" class="h-100 dropdown">
          <a id="dropdownUserLink" data-bs-toggle="dropdown" aria-expanded="false">
            <img
                  id="profile-picture"
                  src="../../assets/profim-picture.jpeg"
                  alt="Profil image"
                />
          </a>

           <ul id="dropdownUserMenu" class="dropdown-menu" aria-labelledby="dropdownUserLink">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
          
        </div>
        <div id="edition-button" class="h-100">
          <div class="centered-text">
            <p>Edition</p>
          </div>
          <div class="h-100 w-10" id="edition-arrow" >
              <span class="material-icons d-inline" id="test">
                expand_more
            </span>
          </div>
          
            
        </div>
        
      </div>
    </div>
      
  </div>
</div>

</template>

<script lang="ts">
import {defineComponent } from "vue";

export default defineComponent ({
  methods: {
    toggleSideBar() {
      this.$emit('toggleSideBar');
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

#overun{
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

</style>
