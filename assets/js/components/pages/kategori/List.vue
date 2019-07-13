<template>
  <div class="row">
    <div class="col-12">
      <list-table>
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
      </list-table>
      <list-tambah ref="tambah"></list-tambah>
      <list-ganti ref="ganti" :kategori="kategori" @delete-kategori="deleteKategori"></list-ganti>
      <list-hapus ref="hapus" :kategori="kategori" @delete-kategori="deleteKategori"></list-hapus>
    </div>
  </div>
</template>

<script>
  import ListTable from '@/js/components/partials/kategori/list/Table'
  import ListTambah from '@/js/components/partials/kategori/list/Tambah'
  import ListGanti from '@/js/components/partials/kategori/list/Ganti'
  import ListHapus from '@/js/components/partials/kategori/list/Hapus'

  export default {
    data() {
      return {
        kategori: {}
      }
    },
    components: {
      ListTable,
      ListTambah,
      ListGanti,
      ListHapus
    },
    methods: {
      async getList() {
        try {
          await this.$store.dispatch('Kategori/list')
        } catch (err) {
          this.$notify({
            group: 'alert-group',
            title: 'Kesalahan',
            type: 'danger',
            text: err.message
          })
        }
        return Promise.resolve()
      },
      modalGanti(data) {
        let kategori = this.$store.getters['Kategori/kategorisFind'](data.id)
        if (_.isEmpty(kategori)) return
        this.kategori = kategori
        $(this.$refs.ganti.$el).modal('show')
      },
      modalHapus(data) {
        let kategori = this.$store.getters['Kategori/kategorisFind'](data.id)
        if (_.isEmpty(kategori)) return
        this.kategori = kategori
        $(this.$refs.hapus.$el).modal('show')
      },
      deleteKategori() {
        this.kategori = {}
      }
    },
    async mounted() {
      await this.getList()
    }
  }
</script>
