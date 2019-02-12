<template>
  <div id="app">
    <Navbar tab="Challenge"/>
    <b-container>
      <b-row>
        <b-col class="pt-5">
          <ChallengeHistory/>
        </b-col>

        <b-col class="pt-5" offset="1">
          <b-list-group>
            <b-list-group-item class="active">
              <h5 class="mb-1">Classic</h5>
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
            </b-list-group-item>
            
            <b-list-group-item class="disabled">
                <h5 class="mb-1">Friendly</h5>
                <div class="mb-1 pt-2">
                  <p>Same rules as classic but compete against a friend.</p>
                  <small>Not available yet</small>
                </div>
            </b-list-group-item>
          </b-list-group>

          <button class="btn btn-secondary btn-lg btn-block mt-4 text-primary" v-on:click="gotoChallenge">Start Challenge</button>

        </b-col>
      </b-row>
    </b-container>
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