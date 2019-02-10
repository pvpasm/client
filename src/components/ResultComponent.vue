<template>
  <div class="card bg-primary mb-3 mx-auto my-auto text-white w-50">
    <div class="card-body">
      <h4 class="text-center">{{ verdict }}</h4>

      <div class="row py-3">
        <div class="col-md-6 text-center">
          <h5>{{ p_username }}</h5>
          <div class="py-4">
            <i class="fas fa-check fa-2x px-1"></i>
            <i class="fas fa-check fa-2x px-1"></i>
            <i class="fas fa-times fa-2x px-1"></i>
          </div>
          <div class="py-2">
            <h6>{{ p_duration }}</h6>
          </div>
        </div>
        <div class="col-md-6 text-center">
          <h5>{{ o_username }}</h5>
          <div class="py-4">
            <i class="fas fa-times fa-2x px-1"></i>
            <i class="fas fa-times fa-2x px-1"></i>
            <i class="fas fa-check fa-2x px-1"></i>
          </div>
          <div class="py-2">
            <h6>{{ o_duration }}</h6>
          </div>
        </div>
      </div>

      <a class="btn btn-secondary btn-block" href="challenge">Back</a>
    </div>
  </div>
</template>

<script>
import ChallengeService from '../services/ChallengeService';

export default {
  name: 'Result',
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