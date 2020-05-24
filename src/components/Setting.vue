<template>
  <div class="setting">
    <div class="setting-inner">
      <h1>설정</h1>
      <form @submit.prevent="saveSettings">
        <!-- 페이지 전환이 되지 않기 위해 prevent 사용 -->
        <fieldset>
          <label for ="starttime">시작 시간</label>
          <select id ="starttime"
          v-model="settings.starttime">
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
          </select>
        </fieldset>

        <fieldset>
          <label for="lang">달력 언어</label>
          <select id="lang"
          v-model="settings.lang">
            <option value="ko">한국어</option>
            <option value="en">영어</option>
          </select>
        </fieldset>

        <fieldset class="submit">
          <button type="submit"
          class="save">저장</button>
        </fieldset>

      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Setting',
  methods : {
    ...mapActions(['saveSettings']),

    saveSettings(){
      let url = 'http://localhost:8000/api/savesettings';      

      console.log('설정 저장',this.settings);
      axios.put(url, this.settings)
      .then((res) => {
        this.getSettings(this.settings);
        alert('저장 완료');
      })
      .catch((error) => {
        console.log("saveSettings 에러",error);
      })
    },

    getSettings(){
      this.settings = this.savedSettings;

      // put에서 this.settings이미 받아오고 있기 때문에 필요가 없음
      // let url = 'http://localhost:8000/api/settings';      

      // console.log('설정 불러오기',this.settings);
      // axios.get(url)
      // .then((res) => {
      //   this.settings = res.data.settings[0];
      //   console.log("setting.vue getSettings 결과",res.data.settings[0]);
      // })
      // .catch((error) => {
      //   console.log("getSettings 에러",error);
      // })
    }
  },
  computed : {
    ...mapGetters(['savedSettings'])
  },
  data() {

    return {
      settings : {
        starttime : '08:00',
        lang:'ko'
      }
    }
  },
  created(){
   this.getSettings();   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
