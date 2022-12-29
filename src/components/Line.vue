<template>
  <div class="line">

    <letter v-for="letterObj, i in letters" :key="i" 
      :lineIndex="lineIndex" 
      :letterIndex="i" 
      :letter="letterObj.letter" />
    
  </div>
</template>

<script lang="ts">
import { chordsStore } from '../stores/chords'
import Letter from './Letter.vue'
import Chord from './Chord.vue'

export default {
  components: { Letter, Chord },

  props: { 
    lineIndex: { type: Number, required: true },
    lineText: { type: String, required: true }, 
    addSpace: { type: Boolean }, 
  },

  setup (props) {
    // Build chords object to assign to letters
    const store = chordsStore()
    const chords = store.chordsByLine(props.lineIndex)

    const letters = props.lineText.split('')
      .map(l => ({ letter: l }))

    return {
      letters,
      chords
    }
  }
}
</script>

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
