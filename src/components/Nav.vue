<template>
  <nav class="nav">
    <ul class="nav-list">
      <li>        
        <button @click="today">
          <i class="xi-home"></i>
          <!-- xe-icon 설치후 사용 -->
          <span>오늘</span>
        </button>
      </li>
      <li>
        <router-link to="/calendar">
          <i class="xi-calendar"></i>
          <!-- xe-icon 설치후 사용 -->
          <span>달력</span>
        </router-link>
      </li>
      <li>
        <router-link to="/setting">
          <i class="xi-cog"></i>
          <!-- xe-icon 설치후 사용 -->
          <span>설정</span>
        </router-link>
      </li>
      <li>
        <router-link to="/about">
          <i class="xi-emoticon-smiley"></i>
          <!-- xe-icon 설치후 사용 -->
          <span>소개</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import moment from 'moment' //날짜 가져오기

export default {
  name: 'Nav',
  methods : {
    //오늘 날짜로 이동하는 메소드
    today(){
      let todayUrl = '/day/' + moment(new Date()).format('YYYY-MM-DD');
      this.$router.push(todayUrl);
      console.log(todayUrl);
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
