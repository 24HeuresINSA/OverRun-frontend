<template>
  <div class="backdrop overflow-scroll" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Raison du refus</h4>
          <p>
            Préciser pourquoi le certificat de l'athlète est refusé. Cette
            raison sera celle indiquée dans le mail envoyé à l'athlète
          </p>
        </div>
        <div class="col-1">
          <button id="close-arrow" @click="closeModal">
            <span class="material-icons-outlined"> close </span>
          </button>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-5 my-4" @submit.prevent="sendReason">
        <textarea v-model="reason" class="form-control" rows="5"></textarea>
        <div class="text-center">
          <button type="submit" class="btn btn-primary my-3">Envoyer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmRefuseCertificat",
  data() {
    return {
      reason: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeConfirmRefuseCertificat");
    },
    sendReason() {
      this.$emit("sendReason", this.reason);
    },
  },
});
</script>

<style>
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 10001;
}

.custom-modal {
  width: 30%;
}

#close-arrow {
  margin-top: -1vh;
  margin-right: 50px;
  background: none;
  border: none;
}
</style>
