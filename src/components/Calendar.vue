<template>
  <div class="calendar">
    <full-calendar      
      :config = "config"      
      :plugins = "calendarPlugins"
      :selectable = "true"
      @dateClick = "handleDateClick"
      @select = "handleSelect"
    ></full-calendar>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import { mapGetters } from 'vuex';

export default {
  name: 'Calendar',

  components : {
    FullCalendar
  },

  methods : {
    handleDateClick(arg){
      console.log("handleDateClick메소드",arg.dateStr);
      let url = `/day/${date.format('YYYY-MM-DD')}`;
      this.$router.push(url);
    },
    handleSelect(e){
      console.log(e);
    },
    applySettings(){
      this.config['locale'] = this.savedSettings.lang;
      console.log("applySettings",this.config['locale']);
    }
  },

  computed: {
    ...mapGetters(['savedSettings'])
  },

  data() {

    return {
      calendarPlugins: [
        dayGridPlugin
      ],
      plugins : [
        interactionPlugin
      ],
      config : {
        defaultView : 'dayGridMonth', //월간으로 설정
        header : {
          left : 'prev',
          center : 'title',
          right : 'next'
        }, //달력 타이틀부분
        height : 500,
        selectable : true,
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
