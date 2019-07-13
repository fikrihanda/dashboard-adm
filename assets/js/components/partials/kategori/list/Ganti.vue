<template>
  <form action="#" class="modal fade" @submit.prevent="submitGanti">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          Ganti Kategori
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
            Ganti
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'

  export default {
    props: ['kategori'],
    data() {
      return {
        id: '',
        name: ''
      }
    },
    validations: {
      name: {required}
    },
    watch: {
      kategori(newOne) {
        if (_.isEmpty(newOne) || (_.isUndefined(newOne.id) || _.isUndefined(newOne.name))) return
        this.id = newOne.id
        this.name = newOne.name
      }
    },
    methods: {
      async submitGanti() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('Kategori/update', {
            id: this.id,
            name: this.name
          })
          $(this.$el).modal('hide')
          this.$notify({
            group: 'alert-group',
            title: 'Berhasil',
            type: 'success',
            text: 'Behasil ganti kategori'
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
        this.$emit('delete-kategori')
        this.id = ''
        this.name = ''
        this.$v.$reset()
      })
    }
  }
</script>
