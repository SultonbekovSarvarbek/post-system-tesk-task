<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import KonvaTable from './KonvaTable.vue'

const props = defineProps({
  tables: Array,
  obstacles: Array,
  canvasBounds: Object
})

const emit = defineEmits(['table-click', 'update-position', 'bounds-updated'])

const stage = ref(null)
const backgroundLayer = ref(null)
const decorativeLayer = ref(null)
const tablesLayer = ref(null)

const stageConfig = ref({
  width: 800,
  height: 600
})

const dotPattern = computed(() => {
  const dots = []
  const spacing = 35
  const offsetX = 17.5
  const offsetY = 17.5
  
  for (let x = offsetX; x < stageConfig.value.width; x += spacing) {
    for (let y = offsetY; y < stageConfig.value.height; y += spacing) {
      dots.push({ x, y })
    }
  }
  return dots
})

const leftDecorative = computed(() => [
  { x: 15, y: stageConfig.value.height * 0.15 },
  { x: 15, y: stageConfig.value.height * 0.35 },
  { x: 15, y: stageConfig.value.height * 0.55 },
  { x: 15, y: stageConfig.value.height * 0.75 }
])

const rightDecorative = computed(() => [
  { x: stageConfig.value.width - 40, y: stageConfig.value.height * 0.10 },
  { x: stageConfig.value.width - 40, y: stageConfig.value.height * 0.30 }
])



const obstacles = computed(() => [
  ...leftDecorative.value.map((el, index) => ({
    id: index + 1,
    x: el.x,
    y: el.y,
    width: 30,
    height: 30
  })),
  ...rightDecorative.value.map((el, index) => ({
    id: index + 5,
    x: el.x,
    y: el.y,
    width: 30,
    height: 30
  }))
])

const otherTables = (tableId) => props.tables.filter(t => t.id !== tableId)

const handleWheel = (e) => {
  e.evt.preventDefault()
}

const updateStageSize = () => {
  if (stage.value) {
    const container = stage.value.getNode().container().parentElement
    const width = container.clientWidth
    const height = container.clientHeight
    
    stageConfig.value = {
      width: Math.floor(width),
      height: Math.floor(height)
    }
    
    emit('bounds-updated', {
      width: Math.floor(width),
      height: Math.floor(height)
    })
  }
}

onMounted(() => {
  updateStageSize()
  window.addEventListener('resize', updateStageSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateStageSize)
})

watch(() => props.canvasBounds, () => {
  updateStageSize()
}, { deep: true })
</script>

<template>
  <div class="konva-canvas">
    <v-stage 
      ref="stage"
      :config="stageConfig" 
      @wheel="handleWheel"
    >
      <v-layer ref="backgroundLayer">
        <v-group
          v-for="(dot, index) in dotPattern"
          :key="`dot-${index}`"
        >
          <v-circle
            :config="{
              x: dot.x,
              y: dot.y,
              radius: 1.4,
              fill: '#2E2E2E',
            }"
          />
        </v-group>
      </v-layer>

      <v-layer ref="decorativeLayer">
        <v-group
          v-for="(element, index) in leftDecorative"
          :key="`left-${index}`"
        >
          <v-rect
            :config="{
              x: element.x,
              y: element.y,
              width: 30,
              height: 30,
              fill: '#6C9D51',
              stroke: '#2E2E2E',
              strokeWidth: 2,
              dash: [3, 3],
              cornerRadius: 4,
            }"
          />
        </v-group>

        <v-group
          v-for="(element, index) in rightDecorative"
          :key="`right-${index}`"
        >
          <v-rect
            :config="{
              x: element.x,
              y: element.y,
              width: 30,
              height: 30,
              fill: '#6C9D51',
              stroke: '#2E2E2E',
              strokeWidth: 2,
              dash: [3, 3],
              cornerRadius: 4,
            }"
          />
        </v-group>
      </v-layer>

      <v-layer ref="tablesLayer">
        <KonvaTable
          v-for="(table, index) in tables"
          :key="table.id"
          :table="table"
          :table-index="index + 1"
          :obstacles="obstacles"
          :other-tables="otherTables"
          :stage-config="stageConfig"
          @click="$emit('table-click', table)"
          @update-position="$emit('update-position', $event)"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<style lang="scss">
.konva-canvas {
  width: 100%;
  height: 100%;
  background: #2E2E2E80;
  overflow: hidden;
  position: relative;

  canvas {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
}
</style> 