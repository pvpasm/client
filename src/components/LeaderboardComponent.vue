<template>
  <div id="app">
    <Navbar tab="Leaderboard"/>
    <div class="container py-4">
      <table class="table table-hover">
        <thead class="table-primary">
          <tr>
            <th style="width: 15%" scope="col">RANK</th>
            <th style="width: 70%" scope="col">USERNAME</th>
            <th style="width: 15%" scope="col">POINTS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in leaderboard"
            v-bind:item="user"
            v-bind:index="index"
            v-bind:key="user._id">
            <td style="width: 15%">{{ user.rank }}</td>
            <td style="width: 70%">{{ user.name }}</td>
            <td style="width: 15%">{{ user.points }}</td>
          </tr>
        </tbody>
      </table> 
    </div>
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