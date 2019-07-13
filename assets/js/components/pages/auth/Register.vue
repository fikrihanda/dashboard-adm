<template>
  <form action="#" class="card" @submit.prevent="submitRegister">
    <div class="card-header">
      DASHBOARD
      <b>ADM</b>
    </div>
    <div class="card-body">
      <div class="form-group">
        <label for="username">
          Username
        </label>
        <input type="text"
               id="username"
               placeholder="Username"
               v-model.trim="$v.username.$model"
               :class="['form-control', $v.username.$error ? 'is-invalid' : '']">
        <template v-if="$v.username.$error">
          <div v-if="!$v.username.required" class="invalid-feedback">
            Username field harus diisi
          </div>
          <div v-if="!$v.username.isUnique" class="invalid-feedback">
            Userame sudah ada
          </div>
        </template>
      </div>
      <div class="form-group">
        <label for="name">
          Nama
        </label>
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
      <div class="form-group">
        <label for="email">
          Email
        </label>
        <input type="email"
               id="email"
               placeholder="Email"
               v-model="$v.email.$model"
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
      <div class="form-group">
        <label for="password">
          Password
        </label>
        <input
          type="password"
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
      <div class="btn-group d-flex">
        <button type="submit" class="btn btn-secondary w-100">
          Register
        </button>
        <router-link to="/login" class="btn btn-info w-100">
          Login
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        username: '',
        name: '',
        email: '',
        password: ''
      }
    },
    validations: {
      username: {
        required,
        async isUnique(val) {
          try {
            if (_.isEmpty(val)) return true
            let check = await this.$store.dispatch('Users/checkUsername', {
              username: val
            })
            return check
          } catch (err) {
            return false
          }
        }
      },
      name: {required},
      email: {required, email},
      password: {required}
    },
    methods: {
      async submitRegister() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('Users/register', {
            username: this.username,
            name: this.name,
            email: this.email,
            password: this.password
          })
          this.$notify({
            group: 'alert-group',
            title: 'Berhasil',
            type: 'success',
            text: 'Berhasil register, silahkan login'
          })
          this.$router.push('/login')
        } catch (err) {
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
