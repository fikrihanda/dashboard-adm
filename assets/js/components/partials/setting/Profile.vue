<template>
  <form action="#" class="card card-info" @submit.prevent="submitProfile">
    <div class="card-header">
      Profil
    </div>
    <div class="card-body">
      <div class="form-group row">
        <label for="name" class="col-form-label col-md-4 col-lg-3">
          Nama
        </label>
        <div class="col-md-8 col-lg-9">
          <input type="text"
                 id="name"
                 placeholder="Nama"
                 v-model="$v.name.$model"
                 :class="['form-control', $v.name.$error ? 'is-invalid' : '']">
          <template v-if="$v.name.$error">
            <div v-if="!$v.name.required" class="invalid-feedback">
              Nama field harus diisi
            </div>
          </template>
        </div>
      </div>
      <div class="form-group row mb-0">
        <label for="email" class="col-form-label col-md-4 col-lg-3">
          Email
        </label>
        <div class="col-md-8 col-lg-9">
          <input type="email"
                 id="email"
                 placeholder="Email"
                 v-model.trim="$v.email.$model"
                 :class="['form-control', $v.email.$error ? 'is-invalid' : '']">
          <template v-if="$v.email.$error">
            <div v-if="!$v.email.required" class="invalid-feedback">
              Email field harus diisi
            </div>
            <div v-if="!$v.email.email" class="invalid-feedback">
              Format email salah
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
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        name: '',
        email: ''
      }
    },
    validations: {
      name: {required},
      email: {required, email}
    },
    computed: {
      profile() {
        return {
          name: this.$store.getters['Users/name'],
          email: this.$store.getters['Users/email']
        }
      }
    },
    methods: {
      async submitProfile() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('Users/updateProfile', {
            method: 'profile',
            name: this.name,
            email: this.email
          })
          this.$notify({
            group: 'alert-group',
            title: 'Berhasil',
            type: 'success',
            text: 'Berhasil ganti profil'
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
    },
    mounted() {
      this.name = this.profile.name
      this.email = this.profile.email
    }
  }
</script>
