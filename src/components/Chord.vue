<script lang="ts">
import { ref, toRefs, PropType } from 'vue';
import { Chord } from '../types'

export default {
  props: {
    chord: { type: Object as PropType<Chord>, required: true },
    // chordName: { type: String, required: true },
    // letterIndex: { type: Number, required: true }
  },

  setup (props) {
    const { chord } = toRefs(props)

    // const dragging = ref(false);
    // const leftOverride = ref(0);

    // const startDrag = () => {
    //   console.log('on');
      
    //   dragging.value = true;
    //   window.addEventListener('mousemove', update)
    // }

    // const stopDrag = () => {
    //   console.log('off');
      
    //   dragging.value = false;
    //   window.removeEventListener('mousemove', update)
    // }

    // const update = (event: MouseEvent) => { leftOverride.value = event.pageX }

    return {
      chord,
      // name, lineIndex, letterIndex,
      // dragging,
      // leftOverride,
      // startDrag,
      // stopDrag,
      // chordName,
      // letterIndex
    }
  },

  computed: {
    name () {
      return this.chord.name
    },
    left (): string {
      return '1px'
      // return `${ this.dragging ? this.leftOverride : this.letterIndex }px`
    },
    style () {
      const letter = document.getElementById(`L${ this.chord.lineIndex }P${ this.chord.letterIndex }`)
      console.log(this.chord.letterIndex);
      
      if (!letter) return {}

      const {top, left} = letter.getBoundingClientRect();
      console.log(top, left);
      
      return { top, left }
    }
  }
}
</script>

<template>
  <span class="chord" :style="style">{{ name }}</span>
  <!-- <span @mousedown="startDrag" @mouseup="stopDrag" :style="{left}">{{ chordName }}</span> -->
</template>

<style lang="scss" scoped>
.chord {
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 14px;
  background-color: orange;
  border-radius: 8px;
  font-size: 16px;
}
</style>