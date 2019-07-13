<template>
  <div class="modal fade">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          Crop Gambar
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="setting-upload-modal-img">
                <img src="" ref="image">
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-12 col-lg-3 mb-2 mb-lg-0">
                  <div class="btn-group d-flex">
                    <button type="button" class="btn btn-primary w-100" @click="dragMode('move')">
                      <i class="fas fa-arrows-alt fa-fw"></i>
                    </button>
                    <button type="button" class="btn btn-primary w-100" @click="dragMode('crop')">
                      <i class="fa fa-crop-alt fa-fw"></i>
                    </button>
                  </div>
                </div>
                <div class="col-12 col-lg-3 mb-2 mb-lg-0">
                  <div class="btn-group d-flex">
                    <button type="button" class="btn btn-primary w-100" @click="zoom(0.1)">
                      <i class="fa fa-search-plus fa-fw"></i>
                    </button>
                    <button type="button" class="btn btn-primary w-100" @click="zoom(-0.1)">
                      <i class="fa fa-search-minus fa-fw"></i>
                    </button>
                  </div>
                </div>
                <div class="col-12 col-lg-3 mb-2 mb-lg-0">
                  <div class="btn-group d-flex">
                    <button type="button" class="btn btn-primary w-100" @click="move(-10, 0)">
                      <i class="fa fa-arrow-left fa-fw"></i>
                    </button>
                    <button type="button" class="btn btn-primary w-100" @click="move(10, 0)">
                      <i class="fa fa-arrow-right fa-fw"></i>
                    </button>
                    <button type="button" class="btn btn-primary w-100" @click="move(0, -10)">
                      <i class="fa fa-arrow-up fa-fw"></i>
                    </button>
                    <button type="button" class="btn btn-primary w-100" @click="move(0, 10)">
                      <i class="fa fa-arrow-down fa-fw"></i>
                    </button>
                  </div>
                </div>
                <div class="col-12 col-lg-3">
                  <div class="btn-group d-flex">
                    <button type="button" class="btn btn-primary w-100" @click="rotate(-45)">
                      <i class="fa fa-undo-alt fa-fw"></i>
                    </button>
                    <button type="button" class="btn btn-primary w-100" @click="rotate(45)">
                      <i class="fa fa-redo-alt fa-fw"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Tutup
          </button>
          <button type="button" class="btn btn-primary" @click="cropImage">
            Crop
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['url'],
    watch: {
      url(newOne) {
        if (_.isEmpty(newOne)) return
        $(this.$refs.image).attr('src', newOne)
        $(this.$el).modal({
          keyboard: false,
          show: true
        })
      }
    },
    methods: {
      cropImage() {
        let canvas = $(this.$refs.image).cropper('getCroppedCanvas')
        canvas.toBlob(async blob => {
          try {
            await this.upload(blob)
            this.$notify({
              group: 'alert-group',
              title: 'Berhasil',
              type: 'success',
              text: 'Berhasil upload gambar'
            })
          } catch (err) {
            if (err.name === 'UserNotFound') this.$router.push('/login')
            this.$notify({
              group: 'alert-group',
              title: 'Kesalahan',
              type: 'danger',
              text: err.message
            })
          }
        }, 'image/png')
      },
      async upload(blob) {
        try {
          let formData = new FormData()
          formData.append('method', 'upload')
          formData.append('avatar', blob)
          await this.$store.dispatch('Users/upload', formData)
          $(this.$el).modal('hide')
          return Promise.resolve()
        } catch (err) {
          $(this.$el).modal('hide')
          return Promise.reject(err)
        }
      },
      dragMode(mode) {
        $(this.$refs.image).cropper('setDragMode', mode)
      },
      zoom(zoom) {
        $(this.$refs.image).cropper('zoom', zoom)
      },
      move(x, y) {
        $(this.$refs.image).cropper('move', x, y)
      },
      rotate(deg) {
        $(this.$refs.image).cropper('rotate', deg)
      }
    },
    mounted() {
      $(this.$el).on('shown.bs.modal', () => {
        $(this.$refs.image).cropper({
          aspectRatio: 1,
          viewMode: 1
        })
      }).on('hide.bs.modal', () => {
        this.$emit('clear-url')
        $(this.$refs.image).attr('src', '')
        $(this.$refs.image).cropper('destroy')
      })
    }
  }
</script>
