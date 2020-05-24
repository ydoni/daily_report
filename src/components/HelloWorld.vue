<template>
  <div class="hello">\
    <h1>{{msg}}</h1>
    
    <new
      :msg = "msg"
    >
      

    </new>

    <input type="text" v-model="msg" placeholder="입력하세요">
    <input type="checkbox" v-model="seen">
    <p>{{seen}}</p>
    <input type="radio" v-model="age" value="30">
    <input type="radio" v-model="age" value="20">
    <input type="radio" v-model="age" value="10">
    <p>{{age}}</p>
    <select v-model="age">
      <option value="30">30</option>
      <option value="20">20</option>
      <option value="10">10</option>
    </select>
  </div>
</template>

<script>
  import New from './New';
  export default {
  name: 'HelloWorld',
  components : {
    New //New.vue 불러오기
  },
  methods : {
    updateScore(){
      console.log('update');
    }
  },
  data() {
    return {
      msg : "반갑습니다",
      author : "bob",
      url : "http://www.google.co.kr",
      seen : false,
      isActive : true,
      age : 10,
      items : [
        {name : 'red', age : 14},
        {name : 'green', age : 20},
        {name : 'blue', age : 35},
        {name : 'gray', age : 46}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
