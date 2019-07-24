import Supplier from '@/js/components/pages/Supplier'
import List from '@/js/components/pages/supplier/List'

export default {
  path: '/supplier',
  component: Supplier,
  children: [
    {
      path: '',
      component: List,
      meta: {
        requiresAuth: true,
        layout: 'Home',
        name: 'Supplier',
        icon: 'fa-truck'
      }
    }
  ],
  meta: {
    requiresAuth: true,
    layout: 'Home'
  }
}
