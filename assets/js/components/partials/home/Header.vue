<template>
  <div class="header">
    <router-link to="/" class="header-title">
      <span class="header-title-full">
        DASHBOARD
        <b>ADM</b>
      </span>
      <span class="header-title-mini">
        ADM
      </span>
    </router-link>
    <div class="header-content">
      <button type="button" class="btn" @click="$emit('toggle')">
        <i class="fa fa-bars fa-fw"></i>
      </button>
      <div class="btn-group ml-auto">
        <router-link to="/setting" class="btn">
          <i class="fa fa-cogs fa-fw"></i>
        </router-link>
        <button type="button" class="btn" @click="clickLogout">
          <i class="fa fa-sign-out fa-fw"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      async clickLogout() {
        try {
          await this.$store.dispatch('Users/logout')
          this.$router.push('/login')
        } catch (err) {
          this.$notify({
            group: 'alert-group',
            title: 'Kesalahan',
            type: 'danger',
            text: err.message
          })
        }
      }
    }
  }
</script>
