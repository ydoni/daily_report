<template>
  <div class="day">
    <h1 class="day-title">
      {{ $route.params.date }}
    </h1>

    <ul class="day-list">
      <li
        v-for = "item in items"
        :key = "item.id"
        class = "day-list-item"
        :class = "{'open' : item.open}"
      >
        <div class="time">
          <h2>
            {{item.id}}
          </h2>
        </div>

        <div class="action">
          <p
            v-if = "!item.open"
            @click = "toggleOpen(item)"
            @keyup.enter = "updateItem(item)"
          >
            {{ item.action }}
            <span
              v-if="item.action.length === 0"
            >
            시간별 업무를 작성해주세요
            </span>
          </p>
          <input type = "text"
          v-if = "item.open"
          v-model = "item.action"
          placeholder = "업무 제목">
        </div>

        <day-score
          @onUpdateScore="onUpdateScore"
          :item="item"
        >
        <!-- DayScore.vue에서 onUpdateScore 메소드를 가져오기 -->
        </day-score>

        <div class="note" v-if="item.open">
          <textarea
          v-model = "item.note"          
          placeholder = "업무에 대한 자세한 내용을 작성해주세요.">            
          </textarea>
        </div>

        <div class="buttons" v-if="item.open">
          <button class="save" @click="saveItem(item)">등록</button>
          <button class="update" @click="updateItem(item)">수정</button>
          <button class="cancel" @click="toggleOpen(item)">취소</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DayScore from './DayScore';
import moment from 'moment';
import axios from 'axios';

import { mapGetters } from 'vuex';

export default {
  name: 'Day',
  methods : {

    //평가 등록 메소드
    onUpdateScore(item, score){
      item.score=score;
      // this.updateItem(item);
    },

    //데이터 가져오는 메소드
    getItems(){
      console.log("getItems");

      let id = this.$route.params.date;
      let url = 'http://localhost:8000/api/daily/'+id;

      axios
      .get(url)
      .then((res) => {
        this.items = this.displayItems(res.data.items);
        console.log("데이터 가져오기 성공",res.data.items);
        // this.displayItems(res.data);
      })
      .catch((error)=>{
        console.log("데이터 가져오기 실패",error);
      })
    },

    //데이터 리스트 나타나기
    displayItems(res){
      console.log("displayItems",res);
      let items = [];

      // 시작 시간 설정
      // let startTime = '08:00';
      let startTime = this.savedSettings.starttime;
      console.log("displayItems startTime",startTime);

      //item 슬롯 만들기
      for (let i=0; i<7; i++) {
        let datetime = moment(this.$route.params.date + ' ' + startTime);
        // '' 와 ' ' 차이 때문에 오류..
        let itemKey = `${this.$route.params.date}-${datetime.add(i*2, 'hours').format('HH')}-${datetime.add(2,'hours').format('HH')}`;
        console.log("itemKey",itemKey);
        let item = {
          id : itemKey,
          action : '',
          note : '',
          open : false,
          score : undefined
        }

        //데이터 불러오기
        Object.keys(res).map((key) => {
          // console.log("res[key].id",res[key].id);
          if(res[key].id === itemKey) {
            item = res[key];
          }
        });
        items.push(item);
      }
      return items;
    },

    
    // checkSpan(a){
    //   a=a+1;
    //   console.log("a:",a);
    // },

    checkP(a,b){
      let c=this.a++;
      console.log("a:",c);
      if(a%2==0){
        b==!b;
      }
      else{
        b==false;
      }
    },
    

    //저장 버튼 메소드
    saveItem(item){      
      let id = this.$route.params.date;
      let url = 'http://localhost:8000/api/add'

      console.log('신규 일정 등록',item);
      axios.post(url,item)
      .then((res) => {
        this.getItems();
        // item.open = false;
      })
      .catch((error) => {
        console.log("saveItem 에러",error);
      })
    },


    //데이터 수정 메소드
    updateItem(item){
      let id = this.$route.params.date;
      let url = 'http://localhost:8000/api/update/'+id



      console.log('업데이트',item);
      axios.put(url,item)
      .then((res) => {
        this.getItems();
        // item.open = false;
      })
      .catch((error) => {
        console.log("updateItem 에러",error);
      })
    },

    //action 토글 메소드
    toggleOpen(item){
      item.open = !item.open;
    },

    
  },

  computed : {
    ...mapGetters(['savedSettings'])
  },
  components : {
    DayScore
  },
  data() {    
    return {
      items: [],
      a : 1,
      b : false
    }
  },
  props: {

  },

  //lifecycle 함수
  created(){
    this.getItems();
  },

  //같은 컴포넌트 안에서 라우터가 변경될 때 to 에서 from으로 변경될때
  watch : {
    '$route' (to,from){
      this.getItems();
    } //라우터 이동할 때
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
