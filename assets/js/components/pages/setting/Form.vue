<template>
  <div class="row">
    <div class="col-md-4 col-lg-3">
      <set-upload class="mb-3"></set-upload>
    </div>
    <div class="col-md-8 col-lg-9">
      <set-profile class="mb-3"></set-profile>
      <set-password></set-password>
    </div>
  </div>
</template>

<script>
  import SetUpload from '@/js/components/partials/setting/Upload'
  import SetProfile from '@/js/components/partials/setting/Profile'
  import SetPassword from '@/js/components/partials/setting/Password'

  export default {
    components: {
      SetUpload,
      SetProfile,
      SetPassword
    }
  }
</script>
