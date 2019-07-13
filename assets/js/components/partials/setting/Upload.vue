<template>
  <div class="card card-primary">
    <div class="card-header">
      Upload
    </div>
    <label for="file" class="setting-upload">
      <img v-if="avatar" :src="'/uploads/' + avatar" class="setting-upload-img">
      <img v-else src="/images/img-profile.png" class="setting-upload-img">
      <input type="file" id="file" class="d-none" accept="image/jpeg, image/png" ref="upload" @change="changeUpload">
    </label>
    <up-modal ref="modal" :url="url" @clear-url="clearUrl"></up-modal>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import UpModal from '@/js/components/partials/setting/upload/Modal'

  export default {
    data() {
      return {
        url: ''
      }
    },
    components: {
      UpModal
    },
    computed: {
      ...mapGetters('Users', [
        'avatar'
      ])
    },
    methods: {
      async changeUpload(e) {
        try {
          let files = e.target.files
          await this.validationFile(files)
          let file = files[0]
          if (URL) this.doneRead(URL.createObjectURL(file))
          else if (FileReader) {
            let reader = new FileReader()
            reader.onload = () => {
              this.doneRead(reader.result)
            }
            reader.readAsDataURL(file)
          } else {
            this.$refs.upload.value = ''
            this.$notify({
              group: 'alert-group',
              title: 'Kesalahan',
              type: 'danger',
              text: 'Silahkan upgrade browser anda'
            })
          }
        } catch (err) {
          this.$refs.upload.value = ''
          this.$notify({
            group: 'alert-group',
            title: 'Kesalahan',
            type: 'danger',
            text: err.message
          })
        }
      },
      async validationFile(files) {
        if (_.isEmpty(files)) return Promise.reject(
          this.$utils.error({
            name: 'fileNotFound',
            message: 'File gambar upload tidak ada'
          })
        )
        let fileSize = files[0].size / 1024 / 1024
        if (fileSize > 4) return Promise.reject(
          this.$utils.error({
            name: 'fileLarge',
            message: 'File gambar melibihi 4MB'
          })
        )
        return Promise.resolve()
      },
      doneRead(url) {
        this.url = url
        this.$refs.upload.value = ''
      },
      clearUrl() {
        this.url = ''
      }
    }
  }
</script>
