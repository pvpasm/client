<template>
  <div id="app">
    <Navbar tab="Leaderboard"/>
    <b-container class="py-4">
      <b-table striped hover :items="leaderboard"></b-table>
    </b-container>
  </div>
</template>

<script>
import Navbar from './NavbarComponent.vue';
import LeaderboardService from '../services/LeaderboardService';

export default {
  name: 'Leaderboard',
  data() {
    return {
      leaderboard: []
    }
  },
  components: {
	  Navbar
  },
  async created() {
    try {
      this.leaderboard = await LeaderboardService.getLeaderboard();
    } catch (err) {
      
    }
  }
}
</script>