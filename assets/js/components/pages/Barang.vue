<template>
  <div class="container-fluid">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      async getList() {
        try {
          await this.$store.dispatch('Kategori/list')
          await this.$store.dispatch('Barang/list')
        } catch (err) {
          this.$notify({
            group: 'alert-group',
            title: 'Kesalahan',
            type: 'danger',
            text: err.message
          })
        }
        return Promise.resolve()
      }
    },
    async mounted() {
      await this.getList()
    }
  }
</script>
