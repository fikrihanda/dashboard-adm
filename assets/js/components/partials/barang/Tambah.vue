<template>
  <form action="#" class="modal fade" id="barangTambah" @submit.prevent="submitTambah">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          Tambah Barang
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="name">
              Nama
            </label>
            <input type="text"
                   id="name"
                   placeholder="Nama Barang"
                   v-model="$v.name.$model"
                   :class="['form-control', $v.name.$error ? 'is-invalid' : '']">
            <template v-if="$v.name.$error">
              <div v-if="!$v.name.required" class="invalid-feedback">
                Nama field harus diisi
              </div>
            </template>
          </div>
          <div class="form-group">
            <label for="qty">
              Quantity
            </label>
            <input type="number"
                   id="qty"
                   placeholder="Quantity Kategori"
                   v-model="$v.qty.$model"
                   :class="['form-control', $v.qty.$error ? 'is-invalid' : '']">
            <template v-if="$v.qty.$error">
              <div v-if="!$v.qty.required" class="invalid-feedback">
                Quantity field harus diisi
              </div>
              <div v-if="!$v.qty.numeric" class="invalid-feedback">
                Quantity field harus berupa angka
              </div>
            </template>
          </div>
          <div class="form-group">
            <label for="price">
              Harga
            </label>
            <input type="number"
                   id="price"
                   placeholder="Harga Kategori"
                   v-model="$v.price.$model"
                   :class="['form-control', $v.price.$error ? 'is-invalid' : '']">
            <template v-if="$v.price.$error">
              <div v-if="!$v.price.required" class="invalid-feedback">
                Harga field harus diisi
              </div>
              <div v-if="!$v.price.numeric" class="invalid-feedback">
                Harga field harus berupa angka
              </div>
            </template>
          </div>
          <div class="form-group mb-0">
            <label for="kategori">
              Kategori
            </label>
            <select id="kategori"
                    v-model="$v.kategori.$model"
                    :class="['form-control', $v.kategori.$error ? 'is-invalid' : '']">
              <option value="">Pilih Kategori</option>
              <option v-for="(kat, index) in kategoris" :key="index" :value="kat.id">
                {{kat.name}}
              </option>
            </select>
            <template v-if="$v.kategori.$error">
              <div v-if="!$v.kategori.required" class="invalid-feedback">
                Kategori field harus diisi
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
  import {mapGetters} from 'vuex'
  import {required, numeric} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        name: '',
        qty: '',
        price: '',
        kategori: ''
      }
    },
    validations: {
      name: {required},
      qty: {required, numeric},
      price: {required, numeric},
      kategori: {required}
    },
    computed: {
      ...mapGetters('Kategori', [
        'kategoris'
      ])
    },
    methods: {
      async submitTambah() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('Barang/add', {
            name: this.name,
            qty: this.qty,
            price: this.price,
            kategori: this.kategori
          })
          $(this.$el).modal('hide')
          this.$notify({
            group: 'alert-group',
            title: 'Berhasil',
            type: 'success',
            text: 'Behasil tambah barang'
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
    }
  }
</script>
