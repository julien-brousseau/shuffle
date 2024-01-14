<script lang="ts">
import Header from './components/Header.vue'
import Line from './components/Line.vue'
// import Chord from './components/Chord.vue'
import ChordPicker from './components/ChordPicker.vue'
import { chordsStore } from './stores/chords'

export default {
  components: {
    Header, Line, ChordPicker
  },
  setup() {
    const store = chordsStore();
    const { addChord, deselectLetter } = store

    const title = 'Africa'
    const author = 'Toto'
    const lyrics = [
      { type: 'verse', text: 'I hear the drums echoing tonight' },
      { type: 'verse', text: 'But she hears only whispers of some quiet conversation' },
      { type: 'verse', text: 'She\'s coming in, 12:30 flight' },
      { type: 'verse', text: 'The moonlit wings reflect the stars that guide me towards salvation', space: true },
      { type: 'verse', text: 'I stopped an old man along the way' },
      { type: 'verse', text: 'Hoping to find some long forgotten words or ancient melodies' },
      { type: 'verse', text: 'He turned to me as if to say, "Hurry boy, it\'s waiting there for you"' },
      { type: 'space' },

      { type: 'chorus', text: 'It\'s gonna take a lot to take me away from you' },
      { type: 'chorus', text: 'There\'s nothing that a hundred men or more could ever do' },
      { type: 'chorus', text: 'I bless the rains down in Africa' },
      { type: 'chorus', text: 'Gonna take some time to do the things we never had' },
      { type: 'space' },
      
      { type: 'verse', text: 'The wild dogs cry out in the night' },
      { type: 'verse', text: 'As they grow restless, longing for some solitary company' },
      { type: 'verse', text: 'I know that I must do what\'s right' },
      { type: 'verse', text: 'As sure as Kilimanjaro rises like Olympus above the Serengeti' },
      { type: 'verse', text: 'I seek to cure what\'s deep inside, frightened of this thing that I\'ve become' },
      { type: 'space' },

      { type: 'chorus', text: 'It\'s gonna take a lot to drag me away from you' },
      { type: 'chorus', text: 'There\'s nothing that a hundred men or more could ever do' },
      { type: 'chorus', text: 'I bless the rains down in Africa' },
      { type: 'chorus', text: 'Gonna take some time to do the things we never had' },
      { type: 'space' },

      { type: 'verse', text: 'Hurry boy, she\'s waiting there for you' },
      { type: 'space' },

      { type: 'chorus', text: 'It\'s gonna take a lot to drag me away from you' },
      { type: 'chorus', text: 'There\'s nothing that a hundred men or more could ever do' },
      { type: 'chorus', text: 'I bless the rains down in Africa' },
      { type: 'chorus', text: 'I bless the rains down in Africa' },
      { type: 'chorus', text: 'Gonna take some time to do the things we never had' },
    ]

    // Un-select on click anywhere - implies adding stopPropagation on every child button
    const clearSelection = () => {
      deselectLetter();
    }

    const chordsSeeder = [
      { lineIndex: 1, letterIndex: 20, name: 'E' },
      { lineIndex: 2, letterIndex: 15, name: 'D' },
      // { lineIndex: 3, letterIndex: 10, name: 'F' },
      // { lineIndex: 4, letterIndex: 5, name: 'B' },
      // { lineIndex: 5, letterIndex: 1, name: 'A' }
    ]
    chordsSeeder.forEach(chord => addChord(chord))

    return {
      store,
      title, author, lyrics,
      clearSelection
    }
  }
}
</script>

<template>
  <div class="container" @click="clearSelection">

    <Header></Header>
    <h2>{{ title }}</h2>
    <h3>{{ author }}</h3>

    <!-- Loop through all lyrics lines -->
    <Line v-for="line, i in lyrics" :key="i" :lineIndex="i" :lineText="line.text || ''" />

    <!-- Chords -->
    <!-- <Chord v-for="chord in store.chords" :chord="chord" /> -->

    <!-- Chord picker -->
    <ChordPicker />

  </div>
</template>

<style lang="scss">
  #app {
    padding: 50px;

    .container {
      max-width: 1000px;
      margin: auto;
      padding: 20px;
    }

    h1 {
      margin: 0 0 100px;
      font-size: 50px;
      letter-spacing: 62px;
      text-align: center;
      color: #ccc;
    }

    h2 {
      margin: 0;
      font-size: 34px;
    }

    h3 {
      margin: 0 0 30px;
      font-size: 18px;
    }
  }
</style>
