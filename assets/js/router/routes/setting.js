import Setting from '@/js/components/pages/auth/Setting'

export default {
  path: '/setting',
  component: Setting,
  meta: {
    requiresAuth: true,
    layout: 'Home',
    name: 'Setting',
    icon: 'fa-cogs'
  }
}
