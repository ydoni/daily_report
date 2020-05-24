<template>
  <div class="score">
    <button
      @click = "updateScore(button.score)"
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
      console.log(score);
      console.log(this.item);
      this.$emit('onUpdateScore', this.item, score);
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
