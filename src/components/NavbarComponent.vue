<template>
  <b-navbar toggleable="md" type="dark" variant="primary">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  
    <b-navbar-brand href="/">pvpasm</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      
      <b-navbar-nav>
        <b-nav-item href="/challenge" v-bind:class="{ active: tab === 'Challenge' }">Challenge</b-nav-item>
        <b-nav-item href="/leaderboard" v-bind:class="{ active: tab === 'Leaderboard' }">Leaderboard</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">

        <b-navbar-nav v-if="!user">
          <b-nav-item href="/login" v-bind:class="{ active: tab === 'Login' }">Login</b-nav-item>
          <b-nav-item href="/register" v-bind:class="{ active: tab === 'Register' }">Register</b-nav-item>
        </b-navbar-nav>

        <b-nav-item-dropdown right v-if="user">
          <template slot="button-content">
            {{ user }}
          </template>
          <b-dropdown-item class="bg-white text-primary" href="#" v-on:click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import UserService from '../services/UserService';

export default {
  name: 'Navbar',
  data() {
    return {
      user: ''
    }
  },
  props: {
    tab: String
  },
  async created() {
    this.user = getCookie("username");
  },
  methods: {
    async logout() {
      try {
        await UserService.logout();
        window.location.href = '/';
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>
