<template>
  <form action="#" class="modal fade" @submit.prevent="submitGanti">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          Ganti Supplier
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="name">
              Nama
            </label>
            <input type="text"
                   id="name"
                   placeholder="Nama Supplier"
                   v-model="$v.name.$model"
                   :class="['form-control', $v.name.$error ? 'is-invalid' : '']">
            <template v-if="$v.name.$error">
              <div v-if="!$v.name.required" class="invalid-feedback">
                Nama field harus diisi
              </div>
            </template>
          </div>
          <div class="form-group">
            <label for="street">
              Alamat
            </label>
            <input type="text"
                   id="street"
                   placeholder="Alamat Supplier"
                   v-model="$v.street.$model"
                   :class="['form-control', $v.street.$error ? 'is-invalid' : '']">
            <template v-if="$v.street.$error">
              <div v-if="!$v.street.required" class="invalid-feedback">
                Nama field harus diisi
              </div>
            </template>
          </div>
          <div class="form-group">
            <label>
              Telepon
            </label>
            <div v-for="(v, idx) in $v.phone.$each.$iter"
                 :class="['input-group', phone.length === (parseInt(idx) + 1) ? '' : 'mb-2']"
                 :key="idx">
              <select v-model="v.alias.$model"
                      :class="['form-control', v.alias.$error ? 'is-invalid': '']">
                <option value="">Alias</option>
                <option v-for="(p, i) in phoneAlias" :value="p" :key="i">
                  {{p}}
                </option>
              </select>
              <input type="tel"
                     placeholder="Telepon"
                     v-model="v.number.$model"
                     :class="['form-control', v.number.$error ? 'is-invalid': '']">
              <div class="input-group-append">
                <button v-if="idx !== '0'" type="button" class="btn btn-danger" @click="removePhone(parseInt(idx))">
                  <i class="fa fa-minus fa-fw"></i>
                </button>
                <button v-else type="button" class="btn btn-primary" @click="addPhone">
                  <i class="fa fa-plus fa-fw"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="form-group mb-0">
            <label>
              Bank
            </label>
            <div v-for="(v, idx) in $v.bank.$each.$iter"
                 :class="['input-group', bank.length === (parseInt(idx) + 1) ? '' : 'mb-2']"
                 :key="idx">
              <select v-model="v.alias.$model"
                      :class="['form-control', v.alias.$error ? 'is-invalid': '']">
                <option value="">Alias</option>
                <option v-for="(b, i) in bankAlias" :value="b" :key="i">
                  {{b}}
                </option>
              </select>
              <input type="text"
                     placeholder="Bank"
                     v-model="v.number.$model"
                     :class="['form-control', v.number.$error ? 'is-invalid': '']">
              <div class="input-group-append">
                <button v-if="idx !== '0'" type="button" class="btn btn-danger" @click="removeBank(parseInt(idx))">
                  <i class="fa fa-minus fa-fw"></i>
                </button>
                <button v-else type="button" class="btn btn-primary" @click="addBank">
                  <i class="fa fa-plus fa-fw"></i>
                </button>
              </div>
            </div>
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
    props: ['supplier'],
    data() {
      return {
        id: '',
        name: '',
        street: '',
        phone: [
          {alias: '', number: ''}
        ],
        bank: [
          {alias: '', number: ''}
        ],
        phoneAlias: [
          'Seluler',
          'Rumah'
        ],
        bankAlias: [
          'BCA',
          'BRI',
          'MANDIRI',
          'BNI',
          'Other'
        ]
      }
    },
    validations: {
      name: {required},
      street: {required},
      phone: {
        required,
        $each: {
          alias: {required},
          number: {required}
        }
      },
      bank: {
        required,
        $each: {
          alias: {required},
          number: {required}
        }
      }
    },
    watch: {
      supplier(newOne) {
        if (
          _.isEmpty(newOne) || (
            _.isUndefined(newOne.id) || _.isUndefined(newOne.name)
            || _.isUndefined(newOne.street) || _.isUndefined(newOne.phone)
            || _.isUndefined(newOne.bank)
          )
        ) return
        this.id = newOne.id
        this.name = newOne.name
        this.street = newOne.street
        this.phone = _.cloneDeep(newOne.phone)
        this.bank = _.cloneDeep(newOne.bank)
      }
    },
    methods: {
      addPhone() {
        this.phone.push({
          alias: '',
          number: ''
        })
      },
      removePhone(idx) {
        this.phone.splice(idx, 1)
      },
      addBank() {
        this.bank.push({
          alias: '',
          number: ''
        })
      },
      removeBank(idx) {
        this.bank.splice(idx, 1)
      },
      async submitGanti() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('Supplier/update', {
            id: this.id,
            name: this.name,
            street: this.street,
            phone: this.phone,
            bank: this.bank
          })
          $(this.$el).modal('hide')
          this.$notify({
            group: 'alert-group',
            title: 'Berhasil',
            type: 'success',
            text: 'Behasil ganti supplier'
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
        this.$emit('delete-supplier')
        this.name = ''
        this.street = ''
        this.phone = [
          {
            alias: '', number: ''
          }
        ]
        this.bank = [
          {
            alias: '', number: ''
          }
        ]
        this.$v.$reset()
      })
    }
  }
</script>
