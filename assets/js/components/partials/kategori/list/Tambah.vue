<template>
  <form action="#" class="modal fade" id="kategoriTambah" @submit.prevent="submitTambah">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          Tambah Kategori
        </div>
        <div class="modal-body">
          <div class="form-group mb-0">
            <label for="name">
              Nama
            </label>
            <input type="text"
                   id="name"
                   placeholder="Nama Kategori"
                   v-model="$v.name.$model"
                   :class="['form-control', $v.name.$error ? 'is-invalid' : '']">
            <template v-if="$v.name.$error">
              <div v-if="!$v.name.required" class="invalid-feedback">
                Nama field harus diisi
              </div>
            </template>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">
            Tambah
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        name: ''
      }
    },
    validations: {
      name: {required}
    },
    methods: {
      async submitTambah() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('Kategori/add', {
            name: this.name
          })
          $(this.$el).modal('hide')
          this.$notify({
            group: 'alert-group',
            title: 'Berhasil',
            type: 'success',
            text: 'Behasil tambah kategori'
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
        this.name = ''
        this.$v.$reset()
      })
    }
  }
</script>
