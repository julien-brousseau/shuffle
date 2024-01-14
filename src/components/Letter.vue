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
    const store = chordsStore()
    const { chordByletterIndex, replaceChordAsStrings } = store

    const letterElement: Ref<HTMLElement|null> = ref(null)
    const chordElement: Ref<HTMLElement|null> = ref(null)

    const selectLetter = () => {
      store.selectLetter(props.lineIndex, props.letterIndex)
    }

    const startDrag = (event: DragEvent, chord: any) => {
      if (!event.dataTransfer) return;

      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', `${ chord.lineIndex }-${ chord.letterIndex }-${ chord.name }`)
    }
    
    const onDrop = (event: DragEvent) => {
      if (!event.dataTransfer) return;
      
      const chordStr = event.dataTransfer.getData('text');
      replaceChordAsStrings(`${ props.lineIndex }-${ props.letterIndex }`, chordStr)
    }

    return {
      letterElement,
      chordElement,
      store,
      lineIndex: props.lineIndex,
      letterIndex: props.letterIndex,
      letter: props.letter,
      selectLetter,
      startDrag,
      onDrop
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
      if (!this.chordElement || !this.letterElement) return '0';
      const offset = this.chordElement.offsetWidth / 2 - this.letterElement.offsetWidth / 2;
      
      const yPos = this.letterElement?.offsetLeft
      // const yPos = this.dragging ? this.leftOverride : this.letterElement?.offsetLeft
      return (yPos || 0) - offset + 'px';
    },
    top (): string {
      const a = this.letterElement?.offsetTop
      console.log(this.letterElement);
      
      return (a || 0) - 30 + 'px';
    },
  }
}
</script>

<template>

  <span class="letter" :id="id" ref="letterElement"
    :class="[{ isSpace, hasChord }, chord ? 'chord-' + chord.name : '']"
    @click.stop="selectLetter"
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent>
      <span>{{ paddedLetter }}</span>
  </span>

  <div class="chord" v-if="chord" ref="chordElement" :id="`for-${ id }`" 
    draggable="true"
    @dragstart="startDrag($event, chord)"
    :style="{ left, top }">
      {{ chord.name }}
  </div>

</template>

<style lang="scss" scoped>
  .letter {
    display: inline-block;
    position: relative;
    padding: 0;
    background-color: rgba(lightblue, 0);
    font-size: 20px;
    transition: 0.15s all ease;
    cursor: pointer;
    z-index: 1;
    user-select: none;

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
    //   // $chords: v-bind(letterElement); //'A', 'B', 'C', 'D', 'E', 'F', 'G';
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
    user-select: none;
  }
</style>
