import Register from '@/js/components/pages/auth/Register'

export default {
  path: '/register',
  component: Register,
  meta: {
    requiresAuth: false,
    layout: 'LogReg'
  }
}
