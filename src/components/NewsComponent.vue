<template>
  <ul class="list-group">
    <li href="#" class="list-group-item flex-column align-items-start border-primary"
      v-for="(news, index) in news"
      v-bind:item="news"
      v-bind:index="index"
      v-bind:key="news._id">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ news.title }}</h5>
        <small>{{ `${news.date.getDate()}/${news.date.getMonth() + 1}/${news.date.getFullYear()}` }}</small>
      </div>
      <p class="mb-1">{{ news.desc }}</p>
    </li>
  </ul>
</template>

<script>
import NewsService from '../services/NewsService';

export default {
  name: 'News',
  data() {
    return {
      news: []
    }
  },
  async created() {
    try {
      this.news = await NewsService.getNews();
    } catch(err) {

    }
  }
}
</script>