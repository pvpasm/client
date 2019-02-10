<template>
  <div id="app">
  <Navbar/>
  <div class="container">
    <div class="row">
      <div class="col-md-6 pt-5">
        <News/>
      </div>
      <div class="offset-md-1 col-md-5 pt-5">
        <About/>
      </div>
    </div>
  </div>
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