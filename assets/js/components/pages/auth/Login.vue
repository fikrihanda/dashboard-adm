<template>
  <form action="#" class="card" @submit.prevent="submitLogin">
    <div class="card-header">
      DASHBOARD
      <b>ADM</b>
    </div>
    <div class="card-body">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <label for="username" class="input-group-text">
              <i class="fa fa-user fa-fw"></i>
            </label>
          </div>
          <input type="text"
                 id="username"
                 placeholder="Username"
                 v-model.trim="$v.username.$model"
                 :class="['form-control', $v.username.$error ? 'is-invalid' : '']">
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <label for="password" class="input-group-text">
              <i class="fa fa-lock fa-fw"></i>
            </label>
          </div>
          <input type="password"
                 id="password"
                 class="form-control"
                 placeholder="Password"
                 v-model.trim="$v.password.$model"
                 :class="['form-control', $v.password.$error ? 'is-invalid' : '']">
        </div>
      </div>
      <div class="btn-group d-flex">
        <button type="submit" class="btn btn-secondary w-100">
          Login
        </button>
        <router-link to="/register" class="btn btn-info w-100">
          Register
        </router-link>
      </div>
    </div>
  </form>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    validations: {
      username: {required},
      password: {required}
    },
    methods: {
      async submitLogin() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('Users/login', {
            username: this.username,
            password: this.password
          })
          this.$notify({
            group: 'alert-group',
            title: 'Berhasil',
            type: 'success',
            text: 'Selamat datang di DASHBOARD ADM'
          })
          this.$router.push('/')
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
