<template>
  <div id="app">
    <Navbar tab="Register"/>

    <div class="container h-75 pt-5">
      <div class="row h-100">
        <div class="card border-primary mb-3 mx-auto my-auto w-50">
            <h4 class="card-header">Register</h4>

            <div class="card-body">
              <div class="form-group">
                <label for="inputUsername">Username</label>
                <input type="text" class="form-control" v-model="username" id="inputUsername" placeholder="Username"/>
              </div>
                
              <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" v-model="password" id="inputPassword" placeholder="Password"/>
              </div>

              <div class="form-group">
                <label for="inputPassword2">Confirm Password</label>
                <input type="password" class="form-control" v-model="password2" id="inputPassword2" placeholder="Confirm Password"/>
              </div>

              <br>

              <button type="submit" class="btn btn-primary" v-on:click="register" :disabled="password != password2 || password == '' || username == ''">Submit</button>

              <div class="alert alert-dismissible alert-danger mt-4" v-if="error">
                  <button type="button" class="close" v-on:click="error=''">&times;</button>
                  {{ error }}
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
  name: 'Register',
  data() {
    return {
      error: '',
      username: '',
      password: '',
      password2: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    async register() {
      this.error = '';
      try {
        await UserService.register(this.username, this.password);
        window.location.href = '/';
      } catch(err) {
        this.error = err;
      }
    }
  }
}
</script>