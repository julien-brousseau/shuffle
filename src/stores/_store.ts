import { reactive } from 'vue'
import { Chord } from '../types'

interface Store {
  chords: Chord[],
  addChord(chord: Chord): void
}

export const store: Store = reactive({
  chords: [
    { lineIndex: 1, letterIndex: 15, chord: 'E' },
    { lineIndex: 2, letterIndex: 21, chord: 'D#' },
    { lineIndex: 2, letterIndex: 11, chord: 'Bb' },
    { lineIndex: 4, letterIndex: 8, chord: 'Am' }
  ],
  addChord (chord: Chord) {
    this.chords.push(chord)
    console.log([...this.chords]);
    
  }
})
