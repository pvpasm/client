<template>
  <div id="app">
  <Navbar/>
    <b-container>
      <b-row>
        <b-col class="pt-5">
          <News/>
        </b-col>
        <b-col class="pt-5" offset="1">
          <About/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from './NavbarComponent.vue';
import News from './NewsComponent.vue';
import About from './AboutComponent.vue';

export default {
  name: 'Home',
  components: {
  Navbar,
  News,
  About
  }
}
</script>