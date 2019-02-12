<template>
  <div id="app">
    <Navbar tab="Challenge"/>
    <div class="container">
      <div class="row">
        <div class="col-md-6 pt-5">
          <ChallengeHistory/>
        </div>

        <div class="offset-md-1 col-md-5 pt-5">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1"><strong>Classic</strong></h5>
              </div>
              <div class="mb-1 pt-2">
                <ol>
                  <li>
                    Find an opponent.
                  </li>
                  <li>
                    Complete 3 asm riddles of varying difficulty.
                  </li>
                  <li>
                    The one with the most riddles correct wins. Or if there is a tie, the fastest one wins.
                  </li>
                </ol>
              </div>
            </a>
            
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start disabled text-primary">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Friendly</h5>
                </div>
                <div class="mb-1 pt-2">
                  <p>Same rules as classic but compete against a friend.</p>
                  <small>Not available yet</small>
                </div>
              </a>
          </div>

          <button class="btn btn-secondary btn-lg btn-block mt-4 text-primary" v-on:click="gotoChallenge">Start Challenge</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './NavbarComponent.vue';
import ChallengeHistory from './ChallengeHistoryComponent.vue';

export default {
  name: 'Challenge',
  data() {
    return {
    }
  },
  components: {
    Navbar,
    ChallengeHistory
  },
  methods: {
    gotoChallenge() {
      if (!getCookie("username"))
        window.location.href = "/login";
      else
        window.location.href = "/classic";
    }
  }
}
</script>