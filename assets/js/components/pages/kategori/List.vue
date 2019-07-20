<template>
  <div class="row">
    <div class="col-12">
      <kat-table>
        <template v-slot:modal>
          <div class="btn-group btn-group-sm ml-auto">
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#kategoriTambah">
              <i class="fa fa-plus fa-fw"></i>
            </button>
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
      </kat-table>
      <kat-tambah ref="tambah"></kat-tambah>
      <kat-ganti ref="ganti" :kategori="kategoriGanti" @delete-kategori="deleteKategori"></kat-ganti>
      <kat-hapus ref="hapus" :kategori="kategoriHapus" @delete-kategori="deleteKategori"></kat-hapus>
    </div>
  </div>
</template>

<script>
  import KatTable from '@/js/components/partials/kategori/Table'
  import KatTambah from '@/js/components/partials/kategori/Tambah'
  import KatGanti from '@/js/components/partials/kategori/Ganti'
  import KatHapus from '@/js/components/partials/kategori/Hapus'

  export default {
    data() {
      return {
        kategoriGanti: {},
        kategoriHapus: {}
      }
    },
    components: {
      KatTable,
      KatTambah,
      KatGanti,
      KatHapus
    },
    methods: {
      modalGanti(data) {
        let kategori = this.$store.getters['Kategori/kategorisFind'](data.id)
        if (_.isEmpty(kategori)) return
        this.kategoriGanti = kategori
        $(this.$refs.ganti.$el).modal('show')
      },
      modalHapus(data) {
        let kategori = this.$store.getters['Kategori/kategorisFind'](data.id)
        if (_.isEmpty(kategori)) return
        this.kategoriHapus = kategori
        $(this.$refs.hapus.$el).modal('show')
      },
      deleteKategori() {
        this.kategoriGanti = {}
        this.kategoriHapus = {}
      }
    }
  }
</script>
