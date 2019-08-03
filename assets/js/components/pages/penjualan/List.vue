<template>
  <div class="row">
    <div class="col-12">
      <pen-table>
        <template v-slot:modal>
          <div class="btn-group btn-group-sm ml-auto">
            <router-link to="/penjualan/tambah" class="btn btn-primary">
              <i class="fa fa-plus fa-fw"></i>
            </router-link>
          </div>
        </template>
      </pen-table>
    </div>
  </div>
</template>

<script>
  import PenTable from '@/js/components/partials/penjualan/Table'

  export default {
    data() {
      return {}
    },
    components: {
      PenTable
    }
  }
</script>
