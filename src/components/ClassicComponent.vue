<template>
  <div id="app">
    <Navbar/>
    <b-container class="content">
      <b-row class="h-100">
        <div class="mx-auto my-auto">
          <carousel ref="carousel" :perPage=1 :key="carouselKey">
            <slide>
              <b-card class="bg-primary mt-3 mx-auto text-white w-50">
                <h4>How to play?</h4>

                <div class="py-2">
                  <ul>
                    <li class="pb-1">
                      There will be 3 <code>x86</code> assembly snippets, each representing a function, with varying levels of obfuscation.
                    </li>
                    <li class="pb-1">
                      The AMD64 calling convention will be followed, i.e. arguments are in registers <code>rdi</code>, <code>rsi</code>, <code>rdx</code>, ... and <code>rax</code> will contain the return value.
                    </li>
                    <li>
                      You will provide a C statement that best represents that snippet, which the server will run a series of test cases against for validation.
                    </li>
                  </ul>

                  <p>For example,</p>

                  <code class="code">
                    ; a0 = edi
                    xor eax, eax;
                    sub eax, 1;
                    add eax, edi;
                  </code>

                  As a function, with argument <code>a0</code>, the return value would be <code>a0 - 1</code>. So, our answer to this puzzle would be <code>a0 - 1</code>.
                </div>
                              
                <a class="btn btn-secondary btn-block mt-2" v-on:click="start">Start</a>
              </b-card>
            </slide>
            <slide v-if="isStart">
              <Puzzle :num='1' @solved="solved"/>
            </slide>
            <slide v-if="isStart">
              <Puzzle :num='2' @solved="solved"/>
            </slide>
            <slide v-if="isStart">
              <Puzzle :num='3' @solved="solved"/>
            </slide>
            <slide v-if="isDone">              
              <Result/>
            </slide>
          </carousel>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from './NavbarComponent.vue';
import Puzzle from './PuzzleComponent.vue';
import Result from './ResultComponent.vue';
import { Carousel, Slide } from 'vue-carousel';
import ChallengeService from '../services/ChallengeService';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  name: 'Classic',
  data() {
    return {
      isStart: true,
      isDone: true,
      numSolved: 3
    }
  },
  components: {
    Navbar,
    Carousel,
    Slide,
    Result,
    Puzzle
  },
  methods: {
    async start() {
      // register start
      await ChallengeService.start();

      this.isStart = true;
      this.carouselKey += 1;
      // short delay for <Puzzle/> to be rendered
      await sleep(5);
      this.$refs.carousel.goToPage(1);
    },
    async end() {
      // get result
      this.isDone = true;
      this.carouselKey += 1;
      // short delay for <Result/> to be rendered
      await sleep(5);
      this.$refs.carousel.goToPage(4);
    },
    async solved() {
      this.numSolved--;

      if (this.numSolved == 0) {
        this.end();
      }
    }
  }
}
</script>

<style>
.code {
  margin-top: -2em;
  font-size: 100%;
  color: white;
  display: block;
  white-space: pre-wrap;
}
</style>