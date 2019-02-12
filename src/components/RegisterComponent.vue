<template>
  <div id="app">
    <Navbar tab="Register"/>

    <b-container class="content">
      <b-row class="h-100">
        <b-card class="border-primary my-auto mx-auto w-50"
          title="Register">

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
              :valid-feedback="validPassword"
              :invalid-feedback="invalidPassword"
              :state="passwordState"
          >
            <b-form-input type="password" id="input-password" v-model="password"></b-form-input>
          </b-form-group>

          <b-form-group
              id="field-password2"
              label="Confirm Password"
              label-for="input-password2"
              :valid-feedback="validPassword"
              :invalid-feedback="invalidPassword"
              :state="passwordState"
          >
            <b-form-input type="password" id="input-password2" v-model="password2"></b-form-input>
          </b-form-group>

          <b-button variant="primary" v-on:click="register" :disabled="!usernameState || !passwordState">Submit</b-button>

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
  name: 'Register',
  data() {
    return {
      error: false,
      username: '',
      password: '',
      password2: ''
    }
  },
  computed: {
    usernameState() {
      return this.username.length > 0;
    },
    passwordState() {
      return this.password === this.password2 && this.password.length > 0;
    },
    valid() {
      return this.usernameState && this.passwordState;
    },
    invalidPassword () {
      if (this.passwordState) {
        return '';
      }
      if (this.password.length == 0) {
        return '';
      }
      return "Passwords don't match!";
    },
    validPassword () {
      return this.passwordState ? 'Passwords match' : "";
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