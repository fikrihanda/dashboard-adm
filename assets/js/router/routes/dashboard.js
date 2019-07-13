import Dashboard from '@/js/components/pages/auth/Dashboard'

export default {
  path: '/',
  component: Dashboard,
  meta: {
    requiresAuth: true,
    layout: 'Home',
    name: 'Dashboard',
    icon: 'fa-dashboard'
  }
}
