<template>
  <div id="app">
    <Navbar tab="Login"/>

    <div class="container h-75">
      <div class="row h-100">
        <div class="card border-primary mb-3 mx-auto my-auto w-50">
          <h4 class="card-header">Login</h4>

          <div class="card-body">
            <div class="form-group">
              <label for="inputUsername">Username</label>
              <input type="text" class="form-control" v-model="username" id="inputUsername" placeholder="Username"/>
            </div>
                
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input type="password" class="form-control" v-model="password" id="inputPassword" placeholder="Password"/>
            </div>

            <br>

            <button type="submit" class="btn btn-primary" v-on:click="login" :disabled="password == '' || username == ''">Submit</button>
            <a href="forgot-password" class="card-link px-4">Forgot password?</a>

            <div class="alert alert-dismissible alert-danger mt-4" v-if="error">
              <button type="button" class="close" v-on:click="error=false">&times;</button>
                  Login Failed!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './NavbarComponent.vue';
import UserService from '../services/UserService';

export default {
  name: 'Login',
  data() {
    return {
      error: false,
      username: '',
      password: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    async login() {
      this.error = '';
      try {
        await UserService.login(this.username, this.password);
        window.location.href = '/';
      } catch(err) {
        this.error = err;
      }
    }
  }
}
</script>