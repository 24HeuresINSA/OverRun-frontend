<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Suppression/Annulation</h4>
        </div>
        <div class="col-1">
          <button id="close-arrow" @click="closeModal">
            <span class="material-icons-outlined"> close </span>
          </button>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <div class="warning">
        Attention : toute suppression/annulation est irréversible.<br />Continuer
        ?
      </div>
      <div class="row pt-3 pb-3">
        <div class="col d-flex justify-content-center">
          <button class="btn btn-primary mx-2" @click="closeModal">
            Annuler
          </button>
          <button class="btn btn-danger mx-2" @click="confirmDeletion">
            Suppression
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ConfirmationDeletionModal",
  methods: {
    closeModal() {
      this.$emit("closeConfirmationDeletionModal");
    },
    confirmDeletion() {
      this.$emit("confirmDeletion");
      this.closeModal();
    },
  },
});
</script>

<style scoped>
.custom-modal {
  width: 30%;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10001;
}

.error {
  color: red;
}

.warning {
  color: orangered;
}

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}
</style>
