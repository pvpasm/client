<template>
  <table class="table table-hover">
    <thead class="table-primary">
      <tr>
        <th style="width: 40%" scope="col">OPPONENT</th>
        <th style="width: 35%" scope="col">RESULT</th>
        <th style="width: 25%" scope="col">DATE</th>
      </tr>
    </thead>
    <tbody>
      <tr
      v-for="(challenge, index) in challenges"
      v-bind:item="challenge"
      v-bind:index="index"
      v-bind:key="challenge._id">
        <td style="width: 40%">{{ challenge.opponent }}</td>
        <td style="width: 35%">{{ challenge.result }}</td>
        <td style="width: 25%">{{ `${challenge.date.getDate()}/${challenge.date.getMonth() + 1}/${challenge.date.getFullYear()}` }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import ChallengeService from '../services/ChallengeService';

export default {
  name: 'ChallengeHistory',
  data() {
    return {
      challenges: []
    }
  },
  async created() {
    try {
      this.challenges = await ChallengeService.getChallenges();
    } catch (err) {
      
    }
  }
}
</script>