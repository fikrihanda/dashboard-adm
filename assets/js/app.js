import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueNotification from 'vue-notification'

import store from '@/js/store'
import router from '@/js/router'

import App from '@/js/components/App'

Vue.use(Vuelidate)
Vue.use(VueNotification)

new Vue({
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
