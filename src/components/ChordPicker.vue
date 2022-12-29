<template>
  <div id="ChordPicker" v-if="visible" :style="{ top: position[0], left: position[1] }" @click.stop>

    <div class="container">
      <a v-for="c in Object.keys(chords)" @click="selectChord(c)">{{ c }}</a>
    </div>

    <div class="container" v-if="selectedChord">
      <a v-for="a in selectedChordList" @click="addNewChord(a)">{{ a }}</a>
    </div>

  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { chordsStore } from '../stores/chords'
import type { Ref } from 'vue'

export default {
  setup () {
    const topOffset = -44
    const leftOffset = 0

    const selectedChord: Ref<string | null> = ref(null);
    const chords: any = { 
      A: ['A', 'Am', 'Ab', 'A#'], 
      B: ['B', 'Bm', 'Bb'], 
      C: ['C', 'Cm', 'C#'], 
      D: ['D', 'Dm', 'Db', 'D#'], 
      E: ['E', 'Em', 'Eb'], 
      F: ['F', 'Fm', 'F#'], 
      G: ['G', 'Gm', 'Gb', 'G#'] 
    }

    const store = chordsStore()

    const selectChord = (name: string): void => {
      // store.deselectLetter()
      selectedChord.value = name
    }

    const addNewChord = (name: string): void => {
      store.addChord({ name, lineIndex: store.selectedLetter.lineIndex, letterIndex: store.selectedLetter.letterIndex })
      store.deselectLetter()
    }

    return {
      lineIndex: store.selectedLetter.lineIndex,
      letterIndex: store.selectedLetter.letterIndex,
      topOffset,
      leftOffset,
      chords,
      selectedChord,
      store,
      addNewChord,
      selectChord,
    }
  },

  computed: {
    visible () {
      if (!this.store.selectedLetter) return false
      return (this.store.selectedLetter.lineIndex >= 0 && this.store.selectedLetter.letterIndex >= 0) 
    },
    position (): string[] {
      // Hide if not selected
      if (!this.visible) return ['-1000px', '-1000px']

      // Get selected letter position
      const letterId = `L${ this.store.selectedLetter.lineIndex }P${ this.store.selectedLetter.letterIndex }`
      const letter = document.getElementById(letterId)
      const { top = 0, left = 0 } = letter?.getBoundingClientRect() || {};
      
      // Return position as [{top}px, {left}px]
      return [top + this.topOffset, left + this.leftOffset]
        .map(n => Math.ceil(n))
        .map(n => n + 'px')
    },
    selectedChordList (): [string]|null {
      if (!this.selectedChord) return null;
      return this.chords[this.selectedChord];
    },
  }
}
</script>

<style lang="scss" scoped>
  #ChordPicker {
    position: absolute;
    top: 0;
    left: 0;
    padding: 5px;
    background-color: lightblue;
    z-index: 99;

    .container {
      display: flex;
      gap: 10px;
    }

    a {
      display: block;
      padding: 10px;
      background-color: darkgreen;
      color: white;
      cursor: pointer;

      &:hover { background-color: green; }
    }
  }
</style>
