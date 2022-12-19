<template>
  <div class="container-fluid p-0 h-100">
    <div class="row" id="certificate-row">
      <div class="col-1" id="left-arrow">
        <span class="centered-element">
          <button class="side-btn" @click="previousInscription">
            <span
              class="material-icons-outlined text-light fs-1"
              v-if="previous"
            >
              arrow_circle_left
            </span>
          </button>
        </span>
      </div>
      <div class="col-10 h-100 p-4">
        <div class="certificate" id="certificate-container">
          <img
            src="../../assets/certificat.jpeg"
            class="h-100 w-100"
            id="certificate-img"
            alt=""
          />
        </div>
      </div>
      <div class="col-1" id="right-arrow">
        <span class="centered-element">
          <button class="side-btn" @click="nextInscription">
            <span class="material-icons-outlined text-light fs-1" v-if="next">
              arrow_circle_right
            </span>
          </button>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div
          class="btn-group light-text"
          role="group"
          aria-label="Basic mixed styles example"
        >
          <button type="button" class="btn menue-btn valide">Valider</button>
          <button type="button" class="btn menue-btn skip">
            Passer {{ inscriptionId }}
          </button>
          <button type="button" class="btn menue-btn reject">Refuser</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    next: Boolean,
    previous: Boolean,
    inscriptionId: Number,
  },
  methods: {
    nextInscription() {
      this.$emit("next");
    },
    previousInscription() {
      this.$emit("previous");
    },
  },
  watch: {
    inscriptionId(newId, oldId) {
      console.log(newId);
    },
  },
});
</script>

<style scoped>
#certificate-row {
  height: calc(100vh - 70px);
  max-height: calc(100vh - 70px) !important;
}

#certificate-container {
  height: 100%;
  width: auto;
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.centered-element {
  min-height: calc(100% - 70px);
  display: inline-flex;
  align-items: center;
}

.valide {
  background: #f2938d;
}

.skip {
  background: #fbe786;
}

.reject {
  background: #a94341;
}

.menue-btn {
  width: 100px;
  height: 50px;
  font-weight: bolder;
  color: #413d3c;
}

.side-btn {
  background: none;
  border: none;
}
</style>
