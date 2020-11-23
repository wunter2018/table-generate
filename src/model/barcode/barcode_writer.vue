<template>
  <div>
    <div :id="parseId"></div>
  </div>
</template>

<script>
import bwipjs from 'bwip-js'

export default {
  props: {
    id: {
      required: true,
      type: String
    },
    format: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: String
    },
    scale: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 30
    },
    width: {
      type: Number,
      default: 30
    },
    includetext: {
      type: Boolean,
      default: false
    },
    textxalign: {
      type: String,
      default: 'center'
    }
  },
  methods: {
    draw () {
      const container = document.getElementById(this.parseId)
      if (container.hasChildNodes()) container.removeChild(container.firstChild)
      let canvas = document.createElement('canvas')
      try {
        bwipjs.toCanvas(canvas, {
          bcid: this.format,
          text: this.value,
          scale: this.scale,
          height: this.height,
          width: this.width,
          includetext: this.includetext,
          textxalign: this.textxalign
        })
        container.appendChild(canvas)
      } catch (e) {
        console.log('error', e)
      }
    }
  },
  computed: {
    parseId () {
      return `${this.id}-${new Date().getTime()}`
    }
  },
  watch: {
    value: {
      handler (newVal) {
        this.$nextTick(() => {
          this.draw()
        })
      },
      immediate: true
    },
    format () {
      this.$nextTick(() => {
        this.draw()
      })
    },
    height () {
      this.$nextTick(() => {
        this.draw()
      })
    },
    width () {
      this.$nextTick(() => {
        this.draw()
      })
    },
    scale () {
      this.$nextTick(() => {
        this.draw()
      })
    },
    includetext () {
      this.$nextTick(() => {
        this.draw()
      })
    }
  }
}
</script>

<style>
</style>
