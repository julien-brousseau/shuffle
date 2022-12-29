<script lang="ts">
import { Ref, ref } from 'vue';
import { chordsStore } from '../stores/chords'

export default {
  props: {
    letter: String,
    letterIndex: Number,
    lineIndex: Number
  },

  setup (props) {
    const store = chordsStore();
    const blop: Ref<HTMLElement|null> = ref(null)

    const selectLetter = () => {
      store.selectLetter(props.lineIndex, props.letterIndex)
    }

    const dragging = ref(false);
    const leftOverride = ref(0);

    const startDrag = () => {
      console.log('on');
      dragging.value = true;
      window.addEventListener('mousemove', update)
      document.addEventListener('mouseup', stopDrag, { once: true })
    }

    const stopDrag = () => {
      console.log('off');
      dragging.value = false;
      window.removeEventListener('mousemove', update)
    }

    const update = (event: MouseEvent) => { leftOverride.value = event.pageX }

    return {
      blop,
      store,
      lineIndex: props.lineIndex,
      letterIndex: props.letterIndex,
      letter: props.letter,
      selectLetter,
      dragging,
      leftOverride,
      startDrag,
      stopDrag,
    }
  },

  computed: {
    id () {
      return `L${ this.lineIndex }P${ this.letterIndex }`
    },
    chord () {
      return this.store.chordByletterIndex(this.lineIndex, this.letterIndex)
    },
    isSpace () {
      return this.letter === ' '
    },
    hasChord () {
      return !!this.chord
    },
    paddedLetter () {
      return ` ${this.letter} `
    },
    left (): string {
      const yPos = this.dragging ? this.leftOverride -( this.blop?.offsetLeft || 0) : this.blop?.offsetLeft
      return (yPos || 0) + 'px';
    },
    top (): string {
      const a = this.blop?.offsetTop
      return (a || 0) + 'px';
    },
  }
}
</script>

<template>

  <span class="letter" :id="id" ref="blop"
    :class="[{ isSpace, hasChord }, chord ? 'chord-' + chord.name : '']"
    @click.stop="selectLetter">
      <span>{{ paddedLetter }}</span>
  </span>

  <div class="chord" v-if="chord" :id="`for-${ id }`" 
    @mousedown="startDrag" 
    @mouseup="stopDrag"
    :style="{ left }">
      {{ chord.name }}
  </div>

</template>

<style lang="scss" scoped>
  .letter {
    display: inline-block;
    position: relative;
    padding: 0;
    background-color: rgba(lightblue, 0);
    font-size: 24px;
    transition: 0.15s all ease;
    cursor: pointer;
    z-index: 1;

    &::before {
      position: absolute;
      top: 0; //-28px;
      left: 50%;
      z-index: -1;
      display: block;
      content: '';
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: rgba(lightblue, 1);
      opacity: 0;
      transition: 0.15s all ease;
      pointer-events: none;
      transform: translateX(-50%);
    }

    &:hover {
      display: inline-block;
      padding: 0 2px;
      &::before { pointer-events: all; }
    }

    &.isSpace {
      display: inline-block;
      height: 28px;
      width: 13px;
    }

    // &.hasChord {
    //   // Generates .chord-X classes for each chord
    //   $chords: 'A', 'B', 'C', 'D', 'E', 'F', 'G';
    //   // $chords: v-bind(blop); //'A', 'B', 'C', 'D', 'E', 'F', 'G';
    //   @each $chord in $chords {
    //     &.chord-#{ $chord }::after { content: $chord }
    //   }

    //   &::after {
    //     position: absolute;
    //     left: -10px;
    //     top: -30px;
    //     display: block;
    //     width: max-content;
    //     height: 30px;
    //     padding: 0 10px;
    //     z-index: -3;
    //     border-radius: 10px;
    //     background-color: rgba(lightgreen, 1);
    //     pointer-events: none;
    //     font-size: 16px;
    //     line-height: 30px;
    //     text-align: center;
    //   }
    // }
  }

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
