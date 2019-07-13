import tools from '@/js/utils/tools'

export default {
  install(Vue) {
    Vue.utils = {}
    Vue.prototype.$utils = {}
    _.forEach(tools, function (tool, name) {
      Vue.utils[name] = tool
      Vue.prototype.$utils[name] = tool
    })
  }
}
