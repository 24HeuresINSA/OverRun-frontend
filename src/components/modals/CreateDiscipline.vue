<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="col bg-light custom-modal m-auto rounded-3 mt-5">
      <div class="row pt-3">
        <div class="col">
          <h4>Creation discipline</h4>
        </div>
      </div>
      <hr class="dropdown-divider my-2" />
      <form class="mx-5 my-4 text-start">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary mb-3">Submit</button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  methods: {
    closeModal() {
      this.$emit("closeDisciplineModal");
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
</style>
