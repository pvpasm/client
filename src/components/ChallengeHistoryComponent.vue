<template>
  <b-table striped hover :items="challenges" :fields="fields">
    <template slot="result" slot-scope="data">
      <i class="fas fa-x" 
        v-for="(score, index) in data.item.myScore"
        v-bind:key="index"
        v-bind:class="getIcon(score)">
      </i>
      <strong>{{ data.item.myTime }}</strong>
      <i class="fas fa-sm fa-bolt px-3"></i>
      <i class="fas fa-x" 
        v-for="(score, index) in data.item.oppScore"
        v-bind:key="index"
        v-bind:class="getIcon(score)">
      </i>
      <strong>{{ data.item.oppTime }}</strong>
    </template>

    <template slot="date" slot-scope="data">
      {{ `${data.value.getDate()}/${data.value.getMonth() + 1}/${data.value.getFullYear()}` }}
    </template>

  </b-table>
  <!-- <table class="table table-hover">
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
      v-bind:key="challenge._id"
      v-bind:class="getRowClass(challenge.win)">
        <td style="width: 25%">{{ challenge.opponent }}</td>
        <td style="width: 50%">        
          <i class="fas fa-x" 
            v-for="(score, index) in challenge.myScore"
            v-bind:key="index"
            v-bind:class="getIcon(score)">
          </i>
          {{ challenge.myTime }}
          -    
          <i class="fas fa-x" 
            v-for="(score, index) in challenge.oppScore"
            v-bind:key="index"
            v-bind:class="getIcon(score)">
          </i>
          {{ challenge.oppTime }}
        </td>
        <td style="width: 25%">{{ `${challenge.date.getDate()}/${challenge.date.getMonth() + 1}/${challenge.date.getFullYear()}` }}</td>
      </tr>
    </tbody>
  </table> -->
</template>

<script>
import ChallengeService from '../services/ChallengeService';

export default {
  name: 'ChallengeHistory',
  data() {
    return {
      challenges: [],
      fields: ["opponent", "result", "date"]
    }
  },
  async created() {
    try {
      this.challenges = await ChallengeService.getChallenges();
      console.log(this.challenges);
    } catch (err) {
      
    }
  },
  methods: {
    getRowClass(win) {
      return {
        'table-success': win == 1,
        'table-danger': win == 0,
        'table-info': win == -1
      }
    },
    getIcon(score) {
      return {
        'fa-check': score == 1,
        'fa-times': score == 0,
        'fa-question': score == -1
      }
    }
  }
}
</script>