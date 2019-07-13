import List from '@/js/components/pages/kategori/List'

export default {
  path: '/kategori',
  component: List,
  meta: {
    requiresAuth: true,
    layout: 'Home',
    name: 'Kategori',
    icon: 'fa-tags'
  }
}
