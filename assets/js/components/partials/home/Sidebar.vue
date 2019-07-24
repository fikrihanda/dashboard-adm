<template>
  <nav class="sidebar">
    <div class="sidebar-profile">
      <img v-if="user.avatar" :src="'/uploads/' + user.avatar" class="sidebar-profile-img">
      <img v-else src="/images/img-profile.png" class="sidebar-profile-img">
      <div class="sidebar-profile-desc">
        <span class="sidebar-profile-desc-name">{{user.name}}</span>
        <span class="sidebar-profile-desc-email">{{user.email}}</span>
      </div>
    </div>
    <ul class="sidebar-menu">
      <li class="sidebar-menu-title">
        LIST MENU
      </li>
      <li v-for="(menu, index) in menus" :key="index" class="sidebar-menu-item">
        <template v-if="menu.subsmenu">
          <button type="button"
                  :class="['sidebar-menu-link', 'sidebar-menu-link-toggle',menu.toggle ? 'toggle' : '']"
                  @click="menuToggle(index)">
            <i :class="['fa', 'fa-fw', menu.icon]"></i>
            <span class="sidebar-menu-link-desc">{{menu.name}}</span>
          </button>
          <transition name="subsmenu"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @leave="leave"
                      :css="false">
            <ul v-if="menu.toggle" class="sidebar-subsmenu">
              <li class="sidebar-subsmenu-title">
                {{menu.name}}
              </li>
              <li v-for="(submenu, index) in menu.subsmenu" :key="index" class="sidebar-subsmenu-item">
                <router-link :to="submenu.path" class="sidebar-subsmenu-link">
                  <i :class="['fa', 'fa-fw', submenu.icon]"></i>
                  <span class="sidebar-subsmenu-link-desc">{{submenu.name}}</span>
                </router-link>
              </li>
            </ul>
          </transition>
        </template>
        <router-link v-else :to="menu.path" class="sidebar-menu-link">
          <i :class="['fa', 'fa-fw', menu.icon]"></i>
          <span class="sidebar-menu-link-desc">{{menu.name}}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        menus: [
          {
            path: '/',
            name: 'Dashboard',
            icon: 'fa-dashboard'
          },
          {
            name: 'Item',
            icon: 'fa-folder',
            toggle: false,
            subsmenu: [
              {
                path: '/kategori',
                icon: 'fa-tags',
                name: 'Kategori'
              },
              {
                path: '/barang',
                icon: 'fa-archive',
                name: 'Barang'
              }
            ]
          },
          {
            path: '/supplier',
            name: 'Supplier',
            icon: 'fa-truck'
          }
        ]
      }
    },
    computed: {
      ...mapGetters('Users', [
        'user'
      ])
    },
    methods: {
      menuToggle(i) {
        i = parseInt(i)
        _.forEach(this.menus, (val, index) => {
          if (index === i) this.menus[i].toggle = !this.menus[i].toggle
          else this.menus[index].toggle = false
        })
      },
      beforeEnter(el) {
        $(el).height(0)
      },
      enter(el, done) {
        let $el = $(el)
        $el.animate({
          height: $el.get(0).scrollHeight
        }, 150, function () {
          $el.height('auto')
          done()
        })
      },
      leave(el, done) {
        let $el = $(el)
        $el.animate({
          height: 0
        }, 150, function () {
          done()
        })
      }
    }
  }
</script>
