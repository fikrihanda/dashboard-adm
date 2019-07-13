import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueNotification from 'vue-notification'
import VueUtils from '@/js/utils'

import store from '@/js/store'
import router from '@/js/router'

import App from '@/js/components/App'

Vue.use(Vuelidate)
Vue.use(VueNotification)
Vue.use(VueUtils)

new Vue({
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
