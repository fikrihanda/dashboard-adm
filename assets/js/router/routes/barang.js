import Barang from '@/js/components/pages/Barang'
import List from '@/js/components/pages/barang/List'

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
    }
  ],
  meta: {
    requiresAuth: true,
    layout: 'Home'
  }
}
