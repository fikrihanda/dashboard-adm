import Login from '@/js/components/pages/auth/Login'

export default {
  path: '/login',
  component: Login,
  meta: {
    requiresAuth: false,
    layout: 'LogReg'
  }
}
