<template>
  <div class="card bg-primary mx-auto text-white w-25 mt-5">
    <div class="card-body">
      <div class="row pt-3">
        <code class="code">
          xor eax, eax;
          mov eax, 5;
          sub ax, 3;
          sub ax, 3;
          sub ax, 3;
          sub ax, 3;
          sub ax, 3;
        </code>
      </div>

      <div class="form-group">
        <label for="exampleTextarea">Code</label>
        <textarea class="form-control text-primary" rows="3"></textarea>
      </div>
      <button class="btn btn-secondary btn-block">Submit</button>
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
      verdict: "You Win!",
      p_username: "daniellimws",
      o_username: "someone",
      p_duration: "10:12",
      o_duration: "8:33"
    }
  },
  methods: {
  }
}
</script>

<style>

textarea {
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
}
</style>