import Supplier from '@/js/components/pages/Supplier'
import List from '@/js/components/pages/supplier/List'
import Print from '@/js/components/pages/supplier/Print'

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
    },
    {
      path: 'print',
      component: Print,
      meta: {
        requiresAuth: true,
        layout: 'Home',
        name: 'Print Supplier',
        icon: 'fa-print'
      }
    }
  ],
  meta: {
    requiresAuth: true,
    layout: 'Home'
  }
}
