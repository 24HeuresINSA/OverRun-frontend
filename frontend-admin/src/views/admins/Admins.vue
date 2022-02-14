<template>
  <h1>Admins Vue</h1>
</template>

<script lang="ts">
import {defineComponent } from "vue";

export default defineComponent({
  mounted () {
    this.$emit('isActive', 'Admins');
  }
});
</script>


<style>

</style>