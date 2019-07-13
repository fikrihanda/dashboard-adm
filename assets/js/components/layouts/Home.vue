<template>
  <div :class="['home', toggle ? 'toggle' : '']">
    <hom-header @toggle="changeToggle"></hom-header>
    <div class="home-content">
      <hom-sidebar ref="sidebar"></hom-sidebar>
      <div class="home-container">
        <h4 class="home-title">
          <i :class="['fa', 'fa-fw', $route.meta.icon]"></i>
          {{$route.meta.name}}
        </h4>
        <div class="container-fluid">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HomHeader from '@/js/components/partials/home/Header'
  import HomSidebar from '@/js/components/partials/home/Sidebar'

  export default {
    data() {
      return {
        toggle: false
      }
    },
    components: {
      HomHeader,
      HomSidebar
    },
    methods: {
      changeToggle() {
        this.toggle = !this.toggle
        let menus = this.$refs.sidebar.menus
        _.forEach(menus, (menu) => {
          if (_.has(menu, 'toggle')) menu.toggle = false
        })
      }
    }
  }
</script>
