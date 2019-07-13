<template>
  <div class="row error align-items-center">
    <div class="col-12 col-md-10 col-lg-6 mx-md-auto">
      <div class="error-icon">
        <i class="fa fa-exclamation-circle fa-fw"></i>
      </div>
      <h1 class="text-center">
        {{message}}
      </h1>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Halaman Tidak Ada'
      }
    }
  }
</script>
