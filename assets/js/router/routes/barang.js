import Barang from '@/js/components/pages/Barang'
import List from '@/js/components/pages/barang/List'
import Print from '@/js/components/pages/barang/Print'

export default {
  path: '/barang',
  component: Barang,
  children: [
    {
      path: '',
      component: List,
      meta: {
        requiresAuth: true,
        layout: 'Home',
        name: 'Barang',
        icon: 'fa-archive'
      }
    },
    {
      path: 'print',
      component: Print,
      meta: {
        requiresAuth: true,
        layout: 'Home',
        name: 'Barang Print',
        icon: 'fa-print'
      }
    }
  ],
  meta: {
    requiresAuth: true,
    layout: 'Home'
  }
}
