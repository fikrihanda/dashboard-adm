<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
    <notifications group="alert-group"
                   position="bottom right">
      <template v-slot:body="props">
        <div :class="['alert', 'alert-msg', 'alert-' + props.item.type]">
          <h4 class="alert-heading">
            {{props.item.title}}
          </h4>
          <p class="mb-0">{{props.item.text}}</p>
        </div>
      </template>
    </notifications>
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
