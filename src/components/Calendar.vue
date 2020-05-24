<template>
  <div class="calendar">
    Calendar
    <full-calendar>
      :config = "config"
      @day-click="dayClick"
    </full-calendar>
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar';
// import 'FullCalendar/dist/fullcalendar.css';

import { mapGetters } from 'vuex';

export default {
  name: 'Calendar',
  components : {
    FullCalendar
  },
  methods : {
    dayClick(date){
      console.log(date);
      let url =`/day/${date.format('YYYY-MM-DD')}`;
      this.$route.push(url);
    },
    applySettings(){
      this.config['locale'] = this.savedSettings.lang;
    }
  },
  computed: {
    ...mapGetters(['savedSettings'])
  },
  data() {

    return {
      config : {
        defaultView : 'month', //월간으로 설정
        header : {
          left : 'prev',
          center : 'title',
          right : 'next'
        }, //달력 타이틀부분
        height : 500 //500 px
        // locale : this.savedSettings.lang
      }
    }
  },
  created(){
    this.applySettings();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
