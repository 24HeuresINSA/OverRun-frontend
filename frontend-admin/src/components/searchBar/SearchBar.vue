<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Rechercher"
      aria-label="Search"
      aria-describedby="button-addon2"
    />
    <button class="btn btn-outline-secondary" type="button" id="search-button">
      <span class="material-icons-outlined">
        search
      </span>
    </button>
  </div>
</template>

<style scoped>
.input-group{
  height: 20px;
    width: 300px;
    float: right;
}

input {
  height: 38px;
  box-shadow: none;
}

input:focus {
  box-shadow: none;
  border-color: #ced4da;
}

button {
  height: 38px;
  border-color: #ced4da;
}



button:hover {
  background: #374785;
  box-shadow: none;
}

</style>
