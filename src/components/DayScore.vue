<template>
  <div class="score">
    <button
      @click = "toggleScore(button.score, item.score)"
      v-for = "button in buttons"
      v-bind:key= "button.score"
      :class="{'active':button.score===item.score}"
      > {{ button.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'DayScore',
  methods : {
    updateScore(score){
      console.log("updateScore메소드",score, this.item.score);
      this.$emit('onUpdateScore', this.item, score);
    },

    toggleScore(score, item){
      console.log(score, item);
      if (score == item ){ // 활성화된 버튼 누를 때 비활성화하기
        this.item.score = undefined;
        this.updateScore(this.item.score);
      } else if (score != item) { // 다른 점수 누를 때 점수 적용
        this.item.score = score;
        this.updateScore(this.item.score);
      }

    }

  },
  data() {

    return {
      buttons : [
        {label : '완료', score:3},
        {label : '컨펌중', score:2},
        {label : '미완료', score:1},
      ]
    }
  },
  props: [
    'item'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
