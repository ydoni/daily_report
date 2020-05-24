<template>
  <div class="intro">
    <div class="intro-inner">
      <h1>일일 업무<br>보고서</h1>
      <router-link
        class="button"
        :to="todayUrl"
        >
        START
      </router-link>
    </div>
  </div>
</template>

<script>
import moment from "moment"

export default {
  name: 'Intro',
  methods : {
    
  },
  computed : {
    todayUrl() {
      let todayUrl = moment(new Date()).format('YYYY-MM-DD');
      console.log("todayUrl",todayUrl);
      return `/day/${todayUrl}`;
    }
  },
  data() {

    return {
      
    }
  },
  props: {
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
