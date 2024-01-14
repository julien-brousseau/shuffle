<script lang="ts">
import Letter from './Letter.vue'

export default {
  components: { Letter },

  props: { 
    lineIndex: { type: Number, required: true },
    lineText: { type: String, required: true },
  },

  setup (props) {
    const letters = props.lineText.split('')
      .map(l => ({ letter: l }))

    return {
      letters
    }
  }
}
</script>

<template>
  <div class="line">

    <letter v-for="letterObj, i in letters" :key="i" 
      :lineIndex="lineIndex" 
      :letterIndex="i" 
      :letter="letterObj.letter" />
    
  </div>
</template>

<style lang="scss">
  .line {
    position: relative;
    @include flex(flex-start, flex-start);
    flex-wrap: wrap;
    padding: 20px 0 0;
    transition: 0.5s all ease;
    
    // &:not(.chorus) + .chorus,
    // &.chorus + :not(.chorus) {
    //   margin-top: 50px
    // }
  }
</style>
