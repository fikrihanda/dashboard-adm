<template>
  <form action="#" class="modal fade" @submit.prevent="submitGanti">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          Ganti Barang
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
            Ganti
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
    props: ['barang'],
    data() {
      return {
        id: '',
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
    watch: {
      barang(newOne) {
        if (
          _.isEmpty(newOne) || (
            _.isUndefined(newOne.id) || _.isUndefined(newOne.name)
            || _.isUndefined(newOne.qty) || _.isUndefined(newOne.price)
            || _.isUndefined(newOne.kategori)
          )
        ) return
        this.id = newOne.id
        this.name = newOne.name
        this.qty = newOne.qty
        this.price = newOne.price
        this.kategori = newOne.kategori.id
      }
    },
    methods: {
      async submitGanti() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('Barang/update', {
            id: this.id,
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
            text: 'Behasil ganti barang'
          })
        } catch (e) {
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
        this.name = ''
        this.qty = ''
        this.price = ''
        this.kategori = ''
        this.$v.$reset()
      })
    }
  }
</script>
