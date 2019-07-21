<template>
  <div class="row">
    <div class="col-12">
      <bar-table>
        <template v-slot:modal>
          <div class="btn-group btn-group-sm ml-auto">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#barangTambah">
              <i class="fa fa-plus fa-fw"></i>
            </button>
            <router-link to="/barang/print" class="btn btn-info">
              <i class="fa fa-print fa-fw"></i>
            </router-link>
          </div>
        </template>
        <template v-slot:actions="props">
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-primary" @click="modalGanti(props.rowData)">
              <i class="fa fa-edit fa-fw"></i>
            </button>
            <button type="button" class="btn btn-danger" @click="modalHapus(props.rowData)">
              <i class="fa fa-trash fa-fw"></i>
            </button>
          </div>
        </template>
      </bar-table>
      <bar-tambah ref="tambah"></bar-tambah>
      <bar-ganti ref="ganti" :barang="barangGanti" @delete-barang="deleteBarang"></bar-ganti>
      <bar-hapus ref="hapus" :barang="barangHapus" @delete-barang="deleteBarang"></bar-hapus>
    </div>
  </div>
</template>

<script>
  import BarTable from '@/js/components/partials/barang/Table'
  import BarTambah from '@/js/components/partials/barang/Tambah'
  import BarGanti from '@/js/components/partials/barang/Ganti'
  import BarHapus from '@/js/components/partials/barang/Hapus'

  export default {
    components: {
      BarTable,
      BarTambah,
      BarGanti,
      BarHapus
    },
    data() {
      return {
        barangGanti: {},
        barangHapus: {}
      }
    },
    methods: {
      modalGanti(data) {
        let barang = this.$store.getters['Barang/barangsFind'](data.id)
        if (_.isEmpty(barang)) return
        this.barangGanti = barang
        $(this.$refs.ganti.$el).modal('show')
      },
      modalHapus(data) {
        let barang = this.$store.getters['Barang/barangsFind'](data.id)
        if (_.isEmpty(barang)) return
        this.barangHapus = barang
        $(this.$refs.hapus.$el).modal('show')
      },
      deleteBarang() {
        this.barangGanti = {}
        this.barangHapus = {}
      }
    }
  }
</script>
