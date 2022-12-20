<template>
  <div v-if="status" class="d-inline">
    <a v-if="status === 1" class="badge text-dark rounded-pill bg-success mx-1"
      >Validé</a
    >
    <a
      v-else-if="status > 1 && status < 5"
      class="badge text-dark rounded-pill bg-warning mx-1"
      >A validé</a
    >
    <a
      v-else-if="status === 5"
      class="badge text-dark rounded-pill bg-danger mx-1"
      >Refusé</a
    >
  </div>
  <div v-else class="d-inline">-</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ValidationChips",
  props: {
    status: Number,
  },
});
</script>
