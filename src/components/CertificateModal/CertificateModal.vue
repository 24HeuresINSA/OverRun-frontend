<template>
  <div class="backdrop" v-if="inscriptions" >
    <div class="container-fluid h-100" >
      <div class="row h-100" >
        <div class="col-9" >
          <Certificate @next="nextInscription" @previous="previousInscription" :next="inscriptions?.length > (currentIndex +1)" :previous="currentIndex > 0" :inscriptionId="inscriptions[currentIndex]"/>
        </div>
        <div class="col-3" >
         <SideInfo @hideCertificate="closeModal" :athleteId="inscriptions.a" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Certificate from "./Certificate.vue"
import SideInfo from "./SideInfo.vue"


export default defineComponent ({
  props: {
    'inscriptions': Object, 
    'index': Number
  },
    components: {
        Certificate,
        SideInfo, 
    }, 
    data () {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      closeModal() {
        this.$emit("hideCertificate", false, [], 0)
      },
      nextInscription() {
        if(this.inscriptions){
          if(this.inscriptions?.length > this.currentIndex + 1) {
            this.currentIndex = this.currentIndex + 1;
          }
        }
        console.log("Current Index: "+ this.currentIndex)
      }, 
      previousInscription() {
        if(this.inscriptions) {
          if(this.currentIndex - 1 >= 0) {
            this.currentIndex = this.currentIndex - 1;
          }
        }
        console.log("Current Index: "+ this.currentIndex)
      }
    }, 
    watch: {
      index(newIndex, oldIndex) {
          this.currentIndex = newIndex;
      }
    }
});
</script>

<style scoped>
.modal {
  width: 400px;
  padding: 20px;
  margin: 100px;
  background: white;
  border-radius: 10px;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10001;
}

</style>
