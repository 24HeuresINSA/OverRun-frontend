<template>
  <div v-if="status" class="d-inline">
    <a
      v-if="status === paymentStatus.PENDING"
      class="badge text-dark rounded-pill bg-info mx-1"
      >En cours</a
    >
    <a
      v-else-if="status === paymentStatus.VALIDATED"
      class="badge text-dark rounded-pill bg-success mx-1"
      >Validé</a
    >
    <a
      v-else-if="status === paymentStatus.REFUSED"
      class="badge text-dark rounded-pill bg-danger mx-1"
      >Refusé</a
    >
    <a
      v-else-if="status === paymentStatus.NOT_STARTED"
      class="badge text-dark rounded-pill bg-secondary mx-1"
      >Non créé</a
    >
    <a
      v-else-if="status === paymentStatus.REFUNDING"
      class="badge text-dark rounded-pill bg-primary mx-1"
      >Remboursement en cours</a
    >
    <a
      v-else-if="status === paymentStatus.REFUND"
      class="badge text-dark rounded-pill bg-warning mx-1"
      >Remboursé</a
    >
  </div>
  <div v-else class="d-inline">
    <a class="badge text-dark rounded-pill bg-secondary mx-1">Non créé</a>
  </div>
</template>

<script lang="ts">
import { PaymentStatus } from "@/types/payment";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ValidationChips",
  props: {
    status: {
      type: Object as () => PaymentStatus,
      required: false,
    },
  },
  data() {
    return {
      paymentStatus: PaymentStatus,
    };
  },
});
</script>
