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
      <span class="ml-auto nav-link text-white" v-if="user">{{ user }}</span>
    </div>
  </nav>
</template>

<script>
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

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
  }
}
</script>
