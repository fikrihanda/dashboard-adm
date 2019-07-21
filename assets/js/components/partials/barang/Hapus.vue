<template>
  <div class="modal fade">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="modal-danger-icon">
                <i class="fa fa-warning fa-fw"></i>
              </div>
            </div>
            <div class="col-12">
              <p class="lead text-center mb-0">
                Anda yakin menghapus barang ini ?
              </p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">
            Tutup
          </button>
          <button type="button" class="btn btn-danger" @click="clickHapus">
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['barang'],
    data() {
      return {
        id: ''
      }
    },
    watch: {
      barang(newOne) {
        if (_.isEmpty(newOne) || _.isUndefined(newOne.id)) return
        this.id = newOne.id
      }
    },
    methods: {
      async clickHapus() {
        try {
          await this.$store.dispatch('Barang/delete', {
            id: this.id,
          })
          $(this.$el).modal('hide')
          this.$notify({
            group: 'alert-group',
            title: 'Berhasil',
            type: 'success',
            text: 'Behasil hapus barang'
          })
        } catch (err) {
          $(this.$el).modal('hide')
          this.$notify({
            group: 'alert-group',
            title: 'Kesalahan',
            type: 'danger',
            text: err.message
          })
        }
      }
    },
    mounted() {
      $(this.$el).on('hide.bs.modal', () => {
        this.$emit('delete-barang')
        this.id = ''
      })
    }
  }
</script>
