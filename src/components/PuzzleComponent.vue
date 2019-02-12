<template>
  <b-container class="h-100">
    <b-row class="h-100">
      <b-card class="mx-auto my-auto w-25" v-bind:class="getCardClass()">
        <b-row class="py-4 mx-auto">
          <code class="code">{{ puzzle }}</code>
        </b-row>

        <b-form-group
            id="field-code"
            label="Code"
            label-for="input-code"
        >
          <b-form-textarea id="input-code"
                          v-model="code"
                          placeholder="Your code"
                          :rows="3">
          </b-form-textarea>
        </b-form-group>

        <b-button variant="secondary" block="true" v-on:click="submit" :disabled="status != -1 || !code">Submit</b-button>
      </b-card>
    </b-row>
  </b-container>
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