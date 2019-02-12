<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="/">pvpasm</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
      
    <div class="collapse navbar-collapse w-100 order-1 order-md-0 dual-collapse2" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
      <li class="nav-item" v-bind:class="{ active: tab === 'Challenge' }">
        <a class="nav-link" href="/challenge">Challenge</a>
      </li>
      <li class="nav-item" v-bind:class="{ active: tab === 'Leaderboard' }">
        <a class="nav-link" href="/leaderboard">Leaderboard</a>
      </li>
      </ul>
    </div>

    <div class="navbar-collapse collapse w-100 order-0 dual-collapse2" id="navbarColor01">
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
    </div>
  </nav>
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
