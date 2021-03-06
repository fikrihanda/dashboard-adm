import Kategori from '@/js/components/pages/Kategori'
import List from '@/js/components/pages/kategori/List'

export default {
  path: '/kategori',
  component: Kategori,
  children: [
    {
      path: '',
      component: List,
      meta: {
        requiresAuth: true,
        layout: 'Home',
        name: 'Kategori',
        icon: 'fa-tags'
      }
    }
  ],
  meta: {
    requiresAuth: true,
    layout: 'Home'
  }
}
