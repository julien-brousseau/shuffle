<script lang="ts">
import { ref, toRefs } from 'vue';

export default {
  props: {
    chordName: { type: String, required: true },
    letterIndex: { type: Number, required: true }
  },

  setup (props) {
    const { chordName, letterIndex } = toRefs(props)

    const dragging = ref(false);
    const leftOverride = ref(0);

    const startDrag = () => {
      console.log('on');
      
      dragging.value = true;
      window.addEventListener('mousemove', update)
    }

    const stopDrag = () => {
      console.log('off');
      
      dragging.value = false;
      window.removeEventListener('mousemove', update)
    }

    const update = (event: MouseEvent) => { leftOverride.value = event.pageX }

    return {
      dragging,
      leftOverride,
      startDrag,
      stopDrag,
      chordName,
      letterIndex
    }
  },

  computed: {
    left (): string {
      return `${ this.dragging ? this.leftOverride : this.letterIndex }px`
    }
  }
}
</script>

<template>
  <span @mousedown="startDrag" @mouseup="stopDrag" :style="{left}">{{ chordName }}</span>
</template>

<style lang="scss" scoped>
  span {
    position: absolute;
    top: 0;
    left: -20px;
    background-color: red;
    padding: 5px;
  }
</style>