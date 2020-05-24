<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
  import Nav from '@/components/Nav';
  import axios from 'axios';
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    components : {
      Nav
    },

    methods : {
      ...mapActions(['saveSettings']),

      init(){
        if(typeof this.savedSettings.starttime == 'undefined'){
          this.getSettings();
        }        
      },

      getSettings(){
        let url = 'http://localhost:8000/api/settings';      

        axios.get(url)
        .then((res) => {
          this.saveSettings(res.data.settings[0]);
          console.log("app.vue getsettings",res.data.settings[0]);
        })
        .catch((error) => {
          console.log("app.vue getSettings 에러",error);
        })
      }
    },

    created(){
      this.init();
    },

    computed: {
      ...mapGetters(['savedSettings']),
    }
  }
</script>



<style lang="scss" src="./assets/css/style.scss">

</style>
