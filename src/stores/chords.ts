import { computed, Ref, ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { Chord, Letter } from '../types'

export const chordsStore: any = defineStore('chords', {
  state: () => ({ 
    chords: <Chord[]>[], 
    selectedLetter: <Letter | null>{}
  }),

  getters: {
    allChords(state) { 
      return state.chords 
    },
    chordsByLine(state): any { 
      return (lineIndex: number) => state.chords.filter((c: Chord) => c.lineIndex === lineIndex)
    },
    chordByletterIndex(state): any { 
      return (lineIndex: number, letterIndex: number) => state.chords.find(c => c.lineIndex === lineIndex && c.letterIndex === letterIndex)
    },
  },

  actions: {
    // Chords
    addChord(chord: Chord): void {
      const { lineIndex, letterIndex } = chord
      if (this.chordByletterIndex(lineIndex, letterIndex)) this.removeChord(lineIndex, letterIndex)
      else this.chords.push(chord)
      console.log('added chord:', chord);
    },
    removeChord(lineIndex: number, letterIndex: number): void {
      this.chords = this.chords.filter(c => !(c.lineIndex === lineIndex && c.letterIndex === letterIndex))
    },

    // Picker
    selectLetter(lineIndex: number, letterIndex: number): void {
      this.selectedLetter = { lineIndex, letterIndex }
    },
    deselectLetter(): void {
      this.selectedLetter = null
    },
  },
})
