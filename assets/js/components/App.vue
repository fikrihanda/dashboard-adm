<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
  import LayHome from '@/js/components/layouts/Home'
  import LayLogReg from '@/js/components/layouts/LogReg'
  import LayError from '@/js/components/layouts/Error'

  export default {
    components: {
      LayHome,
      LayLogReg,
      LayError
    },
    computed: {
      layout() {
        let layout = this.$route.meta.layout || 'Error'
        return 'Lay' + layout
      }
    }
  }
</script>
