<template>
  <form action="#" class="card card-warning" @submit.prevent="submitPassword">
    <div class="card-header">
      Password
    </div>
    <div class="card-body">
      <div class="form-group row">
        <label for="password" class="col-form-label col-md-4 col-lg-3">
          Password
        </label>
        <div class="col-md-8 col-lg-9">
          <input type="password"
                 id="password"
                 placeholder="Password"
                 v-model.trim="$v.password.$model"
                 :class="['form-control', $v.password.$error ? 'is-invalid' : '']">
          <template v-if="$v.password.$error">
            <div v-if="!$v.password.required" class="invalid-feedback">
              Password field harus diisi
            </div>
          </template>
        </div>
      </div>
      <div class="form-group row mb-0">
        <label for="konpass" class="col-form-label col-md-4 col-lg-3">
          Kon. Pass.
        </label>
        <div class="col-md-8 col-lg-9">
          <input type="password"
                 id="konpass"
                 placeholder="Konfirmasi Password"
                 v-model.trim="$v.konpass.$model"
                 :class="['form-control', $v.konpass.$error ? 'is-invalid' : '']">
          <template v-if="$v.konpass.$error">
            <div v-if="!$v.konpass.required" class="invalid-feedback">
              Konformasi Password field harus diisi
            </div>
            <div v-if="!$v.konpass.sameAs" class="invalid-feedback">
              Password berbeda
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <button type="submit" class="btn btn-primary">
        Ganti
      </button>
    </div>
  </form>
</template>

<script>
  import {required, sameAs} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        password: '',
        konpass: ''
      }
    },
    validations: {
      password: {required},
      konpass: {
        required,
        sameAs: sameAs('password')
      }
    },
    methods: {
      async submitPassword() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('Users/updatePassword', {
            method: 'password',
            password: this.password
          })
          this.$notify({
            group: 'alert-group',
            title: 'Berhasil',
            type: 'success',
            text: 'Berhasil ganti password'
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
      }
    }
  }
</script>
