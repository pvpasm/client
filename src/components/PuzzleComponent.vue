<template>
  <div class="card mx-auto w-25 mt-5" v-bind:class="getCardClass()">
    <div class="card-body">
      <div class="row py-4 mx-auto">
        <code class="code">{{ puzzle }}</code>
      </div>

      <div class="form-group">
        <label for="exampleTextarea">Code</label>
        <textarea class="form-control text-primary" rows="3" :disabled="status != -1" v-model="code"></textarea>
      </div>
      <button class="btn btn-secondary btn-block" :disabled="status != -1 || !code" v-on:click='submit'>Submit</button>
    </div>
  </div>
</template>

<script>
import ChallengeService from '../services/ChallengeService';

export default {
  name: 'Puzzle',
  props: {
    num: Number  
  },
  data() {
    return {
      puzzle: '',
      status: -1,
      code: ''
    }
  },
  async created() {
    this.puzzle = await ChallengeService.getChall(this.num);
  },
  methods: {
    getCardClass() {
      return {
        'bg-primary text-white': this.status == -1,
        'bg-success text-white': this.status == 1,
        'bg-danger text-white': this.status == 0
      }
    },
    async submit() {
      // no time to validate with server
      if (this.code === 'pass') {
        this.status = 1;
      }
      else {
        this.status = 0;
      }

      this.$emit('solved');
    }
  }
}
</script>

<style>

textarea {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
}
</style>