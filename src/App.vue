<script setup>
import { ref, reactive } from 'vue'
import KonvaCanvas from './components/KonvaCanvas.vue'
import OverviewModal from './components/OverviewModal.vue'
import BottomNavigation from './components/app/BottomNavigation.vue'
import AppHeader from './components/app/AppHeader.vue'
import { useTableManagement } from './composables/useTableManagement.js'

const activeTab = ref('dining')
const activeNavItem = 'tables'
const showOverview = ref(false)
const selectedTable = ref(null)
const canvasBounds = reactive({ width: 0, height: 0 })

const {
  tables,
  updateTablePosition
} = useTableManagement()

const obstacles = ref([])

const handleUpdatePosition = (event) => {
  updateTablePosition(event.tableId, {
    x: event.x,
    y: event.y
  })
}

const handleBoundsUpdated = (bounds) => {
  canvasBounds.width = bounds.width
  canvasBounds.height = bounds.height
}

const openOverview = (table) => {
  selectedTable.value = table
  showOverview.value = true
}

const closeOverview = () => {
  showOverview.value = false
  selectedTable.value = null
}
</script>

<template>
  <div class="app">
    <AppHeader v-model="activeTab" />

    <div class="app__main-content">
      <div class="app__window-elements">
        <div class="app__window-stick app__window-stick--1-left"></div>
        <div class="app__window-stick app__window-stick--1-right"></div>
        <div class="app__window-stick app__window-stick--2-left"></div>
        <div class="app__window-stick app__window-stick--2-right"></div>
      </div>

      <div class="app__canvas-container">
        <KonvaCanvas
          :tables="tables"
          :obstacles="obstacles"
          :canvas-bounds="canvasBounds"
          @table-click="openOverview"
          @update-position="handleUpdatePosition"
          @bounds-updated="handleBoundsUpdated"
        />
      </div>
    </div>

    <BottomNavigation :active-item="activeNavItem" />

    <OverviewModal
      v-if="showOverview"
      @close="closeOverview"
    />
  </div>
</template>

<style lang="scss">
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
  color: white;

  &__main-content {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 0;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      right: 5px;
      top: 40%;
      width: 15px;
      height: 20%;
      z-index: 999;
      background: #1a1a1a;
      border-left: 0;
      border-right: 0;
      border-top: 4px solid #2E2E2E;
      border-bottom: 4px solid #2E2E2E;
    }
  }

  &__canvas-container {
    flex: 1;
    border: 4px solid #2E2E2E;
    border-radius: 8px;
    position: relative;
    min-height: 0;
  }

  &__window-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  &__window-stick {
    position: absolute;
    width: 4px;
    height: 96px;
    background: #2E2E2E;

    &--1-left {
      left: 4px;
      top: calc(25% + 30px - 48px);
    }

    &--1-right {
      left: 10px;
      top: calc(25% + 30px - 48px);
    }

    &--2-left {
      left: 4px;
      top: calc(65% + 15px - 48px);
    }

    &--2-right {
      left: 10px;
      top: calc(65% + 15px - 48px);
    }
  }
}
</style> 