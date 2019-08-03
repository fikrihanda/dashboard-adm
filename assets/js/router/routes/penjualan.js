import Penjualan from '@/js/components/pages/Penjualan'
import List from '@/js/components/pages/penjualan/List'
import Tambah from '@/js/components/pages/penjualan/Tambah'

export default {
  path: '/penjualan',
  component: Penjualan,
  children: [
    {
      path: '',
      component: List,
      meta: {
        requiresAuth: true,
        layout: 'Home',
        name: 'Penjualan',
        icon: 'fa-cart-arrow-down'
      }
    },
    {
      path: 'tambah',
      component: Tambah,
      meta: {
        requiresAuth: true,
        layout: 'Home',
        name: 'Tambah Penjualan',
        icon: 'fa-plus'
      }
    }
  ],
  meta: {
    requiresAuth: true,
    layout: 'Home'
  }
}
