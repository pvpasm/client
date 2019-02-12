<template>
  <div id="app">
    <Navbar tab="Login"/>

    <b-container class="content">
      <b-row class="h-100">
        <b-card class="border-primary mx-auto my-auto w-50"
          title="Login">

          <b-form-group
              id="field-username"
              label="Username"
              label-for="input-username"
          >
            <b-form-input id="input-username" v-model.trim="username"></b-form-input>
          </b-form-group>

          <b-form-group
              id="field-password"
              label="Password"
              label-for="input-password"
          >
            <b-form-input type="password" id="input-password" v-model="password"></b-form-input>
          </b-form-group>

          <b-button variant="primary" v-on:click="login" :disabled="!valid">Submit</b-button>
          <a href="forgot-password" class="card-link px-4">Forgot password?</a>

          <b-alert class="mt-4" variant="danger"
                  dismissible
                  :show="error.length > 0">
            {{ error }}
          </b-alert>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from './NavbarComponent.vue';
import UserService from '../services/UserService';

export default {
  name: 'Login',
  data() {
    return {
      error: '',
      username: '',
      password: ''
    }
  },
  computed: {
    valid() {
      return this.usernameState && this.passwordState;
    },
    usernameState() {
      return this.username.length > 0;
    },
    passwordState() {
      return this.password.length > 0;
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