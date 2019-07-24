<template>
  <div class="row">
    <div class="col-12">
      <sup-table>
        <template v-slot:modal>
          <div class="btn-group btn-group-sm ml-auto">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#supplierTambah">
              <i class="fa fa-plus fa-fw"></i>
            </button>
            <router-link to="/supplier/print" class="btn btn-info">
              <i class="fa fa-print fa-fw"></i>
            </router-link>
          </div>
        </template>
        <template v-slot:actions="props">
          <div class="btn-group btn-group-sm" @click="modalInfo(props.rowData)">
            <button type="button" class="btn btn-info">
              <i class="fa fa-eye fa-fw"></i>
            </button>
            <button type="button" class="btn btn-primary" @click="modalGanti(props.rowData)">
              <i class="fa fa-edit fa-fw"></i>
            </button>
            <button type="button" class="btn btn-danger" @click="modalHapus(props.rowData)">
              <i class="fa fa-trash fa-fw"></i>
            </button>
          </div>
        </template>
      </sup-table>
      <sup-tambah ref="tambah"></sup-tambah>
      <sup-info ref="info" :supplier="supplierInfo" @delete-supplier="deleteSupplier"></sup-info>
    </div>
  </div>
</template>

<script>
  import SupTable from '@/js/components/partials/supplier/Table'
  import SupTambah from '@/js/components/partials/supplier/Tambah'
  import SupInfo from '@/js/components/partials/supplier/Info'

  export default {
    components: {
      SupTable,
      SupTambah,
      SupInfo
    },
    data() {
      return {
        supplierInfo: {}
      }
    },
    methods: {
      modalInfo(data) {
        let supplier = this.$store.getters['Supplier/suppliersFind'](data.id)
        if (_.isEmpty(supplier)) return
        this.supplierInfo = supplier
        $(this.$refs.info.$el).modal('show')
      },
      modalGanti() {},
      modalHapus() {},
      deleteSupplier() {
        this.supplierInfo = {}
      }
    }
  }
</script>
