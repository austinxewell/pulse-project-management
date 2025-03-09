<script lang="ts">
import { defineComponent } from 'vue'

interface Point {
  x: number
  y: number
}

export default defineComponent({
  name: 'ECGComponent',
  data() {
    return {
      width: 1000, // Width of the SVG container
      height: 100, // Height of the SVG container
      // Adjusted ECG pattern with a longer flat portion
      basePoints: [
        { x: 0, y: 0 },
        { x: 5, y: 0 }, // Increased x value to lengthen the flat portion
        { x: 6, y: 5 },
        { x: 7, y: -5 },
        { x: 8, y: 0 }, // Increased x value to lengthen the flat portion
      ] as Point[],
    }
  },
  computed: {
    pathData(): string {
      const stepX = this.width / 50 // Small horizontal step to make spikes nearly vertical
      const maxSpikeHeight = 5 // Maximum spike height (positive or negative)
      const stepY = this.height / (2 * maxSpikeHeight) // Ensure the spikes fit within the height

      let path = ''
      let currentX = 0

      // Loop to repeat the base pattern and generate the path data
      for (let i = 0; i < Math.floor(this.width / (this.basePoints.length * stepX)); i++) {
        for (let j = 0; j < this.basePoints.length; j++) {
          const point = this.basePoints[j]
          const x = currentX + point.x * stepX
          const y = this.height / 2 - point.y * stepY // Adjusted Y to make it fit within the height

          if (j === 0) {
            path += `M${x},${y}`
          } else {
            path += ` L${x},${y}`
          }
        }

        // Move currentX to start the next cycle exactly after the last one
        currentX += this.basePoints[this.basePoints.length - 1].x * stepX
      }

      return path
    },
  },
})
</script>

<template>
  <div class="relative flex items-center justify-center h-[70vh] text-center px-6">
    <div
      class="absolute inset-0 bg-gradient-to-r from-[#f3f4f6] via-[#e5e7eb] to-[#f3f4f6] dark:from-[#111827] dark:via-[#1f2937] dark:to-[#111827]"
    ></div>

    <div>
      <div class="relative z-10 max-w-4xl">
        <h1
          class="p-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-center leading-[1.3] text-transparent animate-gradient-text"
        >
          Organizing Projects To Simplify Your Workflow
        </h1>
      </div>

      <div class="relative w-full h-40 mt-6">
        <svg
          class="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          :viewBox="`0 0 ${width} ${height}`"
          :width="width"
          :height="height"
        >
          <defs>
            <linearGradient
              id="ecgGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stop-color="#1f2937" />
              <stop offset="50%" stop-color="#4b5563" />
              <stop offset="100%" stop-color="#6b7280" />
            </linearGradient>
          </defs>

          <path :d="pathData" fill="transparent" stroke="url(#ecgGradient)" stroke-width="2" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes gradientText {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.animate-gradient-text {
  background: linear-gradient(90deg, #1f2937, #4b5563, #6b7280);
  background-size: 400% 100%;
  background-clip: text;
  color: transparent;
  animation: gradientText 20s linear infinite;
}
</style>
