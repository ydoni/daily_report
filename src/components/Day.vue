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
          >
            {{ item.action }}
            <span v-if="item.action.length === 0">시간별 업무를 작성해주세요</span>
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
          @keyup.enter = "updateItem(item)"
          placeholder = "업무에 대한 자세한 내용을 작성해주세요.">            
          </textarea>
        </div>

        <div class="buttons" v-if="item.open">
          <button class="save" @click="updateItem(item)">저장</button>
          <button class="cancel" @click="toggleOpen(item)">취소</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import DayScore from './DayScore'
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'Day',
  methods : {

    //평가 등록 메소드
    onUpdateScore(item, score){
      item.score=score;
      this.updateItem(item);
      console.log("DayComponent",score);
    },

    //데이터 가져오는 메소드
    getItems(){
      console.log("getItems");
      let url = 'http://localhost:8000/api/daily';

      axios
      .get(url)
      .then((res) => {
        this.items = this.displayItems(res.data.items);
        console.log("데이터 가져오기 성공",res.data);
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
      let startTime = '08:00';

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

        Object.keys(res).map((key) => {
          if(key === itemKey) {
            item = res[key]
          }
        });
        items.push(item);
      }
      return items;
    },

    //데이터 등록 메소드 (이 프로젝트에서는 수정기능으로 사용함)
    updateItem(item){
      
      let url = 'http://localhost:8000/api/update';

      //mysql에 데이터 전달할 때 boolean형식이 아닌 tinyint형식으로 전달해야하기떄문에
      if (item.open===false) {
        item.open = 0;
      }
      else {
        item.open = 1;
      }

      console.log('업데이트',item);
      axios.put(url,item)
      .then((res) => {
        this.getItems();
      })
      .catch((error) => {
        console.log("updateItem 에러",error);
      })
    },

    //action 토글 메소드
    toggleOpen(item){
      item.open = !item.open;
    }


  },

  computed : {},
  components : {
    DayScore
  },
  data() {
    return {
      items: []
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
