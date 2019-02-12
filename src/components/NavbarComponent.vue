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
          <b-dropdown-item href="#" v-on:click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

    </b-collapse>

    <!-- <div class="navbar-collapse collapse w-100 order-0 dual-collapse2" id="navbarColor01">
      <ul class="navbar-nav ml-auto" v-if="!user">
        <li class="nav-item" v-bind:class="{ active: tab === 'Login' }">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item" v-bind:class="{ active: tab === 'Register' }">
          <a class="nav-link" href="/register">Register</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto" v-if="user">
        <li class="nav-item dropdown">        
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ user }}
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item bg-white text-primary" href="#" v-on:click="logout">Logout</a>
          </div>
        </li>
      </ul>
    </div> -->
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
