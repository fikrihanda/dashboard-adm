import Setting from '@/js/components/pages/Setting'
import Form from '@/js/components/pages/setting/Form'

export default {
  path: '/setting',
  component: Setting,
  children: [
    {
      path: '',
      component: Form,
      meta: {
        requiresAuth: true,
        layout: 'Home',
        name: 'Setting',
        icon: 'fa-cogs'
      }
    }
  ],
  meta: {
    requiresAuth: true,
    layout: 'Home'
  }
}
