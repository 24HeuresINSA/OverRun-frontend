<template>
  <div v-show="!status">-</div>
  <div
    v-show="status === InscriptionStatus.PENDING"
    class="badge text-dark rounded-pill bg-info mx-1"
  >
    À valider
  </div>
  <div
    v-show="status === InscriptionStatus.VALIDATED"
    class="badge text-dark rounded-pill bg-success mx-1"
  >
    Validée
  </div>
  <div
    v-show="status === InscriptionStatus.CANCELLED"
    class="badge text-dark rounded-pill bg-danger mx-1"
  >
    Annulé
  </div>
</template>

<script lang="ts">
import { InscriptionStatus } from "@/types/interface";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ValidationChipsInscription",
  props: {
    status: {
      required: true,
      type: String as () => InscriptionStatus,
    },
  },
  data() {
    return {
      InscriptionStatus,
    };
  },
});
</script>

<style></style>
