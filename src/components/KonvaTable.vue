<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  table: Object,
  tableIndex: Number,
  obstacles: Array,
  otherTables: Function,
  stageConfig: Object
})

const emit = defineEmits(['click', 'update-position'])

const isDragging = ref(false)
const isHovered = ref(false)
const lastValidPosition = ref({ x: 0, y: 0 })

const tableSeats = computed(() => {
  const seats = []
  const capacity = props.table.capacity || props.table.seats || props.table.maxSeats || 4
  const radius =53
  
  for (let i = 0; i < capacity; i++) {
    let angle
    
    if (capacity === 2) {
      if (i === 0) {
        seats.push({ x: 0, y: -radius })
      } else {
        seats.push({ x: 0, y: radius })
      }
      continue
    } else {
      angle = (i / capacity) * 2 * Math.PI - (Math.PI / 2)
    }
    
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    seats.push({ x, y })
  }
  
  return seats
})

const filledSeats = computed(() => {
  if (!isTableOccupied()) return []
  const partySize = props.table.partySize || 0
  return tableSeats.value.slice(0, partySize)
})

const emptySeats = computed(() => {
  const partySize = props.table.partySize || 0
  
  return tableSeats.value.slice(partySize).map((seat, index) => ({
    ...seat,
    originalIndex: partySize + index
  }))
})

const isTableOccupied = () => {
  const occupied = props.table.partySize || 0
  return occupied > 0
}

const getTableBorderColor = () => {
  if (props.table.server) {
    return getServerColor(props.table.server)
  }
  
  if (isHovered.value) return '#666'
  return '#333'
}

const getServerColor = (server) => {
  switch (server) {
    case 'MT': return '#EB2B95'
    case 'JS': return '#A9A300'
    case 'LA': return '#EB722B'
    default: return '#333'
  }
}

const getTableBorderStyle = () => {
  if (!isTableOccupied()) {
    return [5, 5]
  }
  return []
}

const getTableBorderWidth = () => {
  if (!isTableOccupied()) {
    return 1
  }
  return 2
}





const getServerBadgeColor = () => {
  return getServerColor(props.table.server)
}

const getTotalCount = () => {
  const capacity = props.table.capacity || props.table.seats || props.table.maxSeats || 4
  const occupied = props.table.partySize || 0
  return `${occupied}/${capacity}`
}

const getSeatCornerRadius = (index) => {
  const capacity = props.table.capacity || props.table.seats || props.table.maxSeats || 4
  
  if (capacity === 2) {
    if (index === 0) {
      return [999, 999, 0, 0]
    } else {
      return [0, 0, 999, 999]
    }
  } else if (capacity === 4) {
    switch (index) {
      case 0:
        return [999, 999, 0, 0]
      case 1:
        return [0, 999, 999, 0]
      case 2:
        return [0, 0, 999, 999]
      case 3:
        return [999, 0, 0, 999]
      default:
        return 999
    }
  } else {
    const angle = (index / capacity) * 2 * Math.PI - (Math.PI / 2)
    const normalizedAngle = ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI)
    
    if (normalizedAngle < Math.PI / 4 || normalizedAngle >= 7 * Math.PI / 4) {
      return [0, 0, 999, 999]
    } else if (normalizedAngle >= Math.PI / 4 && normalizedAngle < 3 * Math.PI / 4) {
      return [999, 0, 0, 999]
    } else if (normalizedAngle >= 3 * Math.PI / 4 && normalizedAngle < 5 * Math.PI / 4) {
      return [999, 999, 0, 0]
    } else {
      return [0, 999, 999, 0]
    }
  }
}



const checkCollision = (x, y) => {
  const capacity = props.table.capacity || props.table.seats || props.table.maxSeats || 4
  
  let tableRect
  
  if (capacity === 2) {
    tableRect = {
      x: x - 43,
      y: y - 67,
      width: 86,
      height: 134
    }
  } else {
    const tableRadius = 67
    const tableSize = tableRadius * 2
    tableRect = {
      x: x - tableRadius,
      y: y - tableRadius,
      width: tableSize,
      height: tableSize
    }
  }
  
  for (const obstacle of props.obstacles) {
    if (isColliding(tableRect, obstacle)) {
      return true
    }
  }
  
  const otherTables = props.otherTables(props.table.id)
  for (const otherTable of otherTables) {
    const otherCapacity = otherTable.capacity || otherTable.seats || otherTable.maxSeats || 4
    
    let otherRect
    if (otherCapacity === 2) {
      otherRect = {
        x: otherTable.x - 43,
        y: otherTable.y - 67,
        width: 86,
        height: 134
      }
    } else {
      const tableRadius = 67
      const tableSize = tableRadius * 2
      otherRect = {
        x: otherTable.x - tableRadius,
        y: otherTable.y - tableRadius,
        width: tableSize,
        height: tableSize
      }
    }
    
    if (isColliding(tableRect, otherRect)) {
      return true
    }
  }
  
  if (tableRect.x < 0 || 
      tableRect.y < 0 || 
      tableRect.x + tableRect.width > props.stageConfig.width || 
      tableRect.y + tableRect.height > props.stageConfig.height) {
    return true
  }
  
  return false
}

const isColliding = (rect1, rect2) => {
  return !(rect1.x + rect1.width < rect2.x || 
           rect2.x + rect2.width < rect1.x || 
           rect1.y + rect1.height < rect2.y || 
           rect2.y + rect2.height < rect1.y)
}



const handleDragStart = (e) => {
  isDragging.value = true
  isHovered.value = false
  lastValidPosition.value = { x: props.table.x, y: props.table.y }
  e.target.moveToTop()
}

const handleDragMove = (e) => {
  const pos = e.target.position()
  
  if (checkCollision(pos.x, pos.y)) {
    e.target.position({
      x: lastValidPosition.value.x,
      y: lastValidPosition.value.y
    })
  } else {
    lastValidPosition.value = { x: pos.x, y: pos.y }
  }
}

const handleDragEnd = (e) => {
  isDragging.value = false
  const pos = e.target.position()
  
  if (!checkCollision(pos.x, pos.y)) {
    emit('update-position', {
      tableId: props.table.id,
      x: pos.x,
      y: pos.y
    })
  } else {
    e.target.position({
      x: lastValidPosition.value.x,
      y: lastValidPosition.value.y
    })
    emit('update-position', {
      tableId: props.table.id,
      x: lastValidPosition.value.x,
      y: lastValidPosition.value.y
    })
  }
}

const handleClick = (e) => {
  if (!isDragging.value) {
    emit('click', props.table)
  }
}

const handleSeatClick = (e) => {
  e.cancelBubble = true
}

const handleMouseEnter = (e) => {
  if (!isDragging.value) {
    isHovered.value = true
  }
}

const handleMouseLeave = (e) => {
  if (!isDragging.value) {
    isHovered.value = false
  }
}
</script> 

<template>
  <v-group
    :config="{
      x: table.x,
      y: table.y,
      draggable: true,
    }"
    @dragstart="handleDragStart"
    @dragmove="handleDragMove"
    @dragend="handleDragEnd"
    @click="handleClick"
    @tap="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <v-rect
      v-for="(seat, index) in filledSeats"
      :key="`filled-${index}`"
      :config="{
        x: seat.x - 14,
        y: seat.y - 14,
        width: 28,
        height: 28,
        fill: 'white',
        cornerRadius: getSeatCornerRadius(index),
      }"
      @click="handleSeatClick"
      @tap="handleSeatClick"
    />
    
    <v-text
      v-for="(seat, index) in filledSeats"
      :key="`filled-text-${index}`"
      :config="{
        x: seat.x - 14,
        y: seat.y - 14,
        width: 28,
        height: 28,
        text: (index + 1).toString(),
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Manrope',
        lineHeight: 1,
        fill: 'black',
        align: 'center',
        verticalAlign: 'middle',
      }"
      @click="handleSeatClick"
      @tap="handleSeatClick"
    />
    
    <v-rect
      v-for="(seat, index) in emptySeats"
      :key="`empty-${index}`"
      :config="{
        x: seat.x - 14,
        y: seat.y - 14,
        width: 28,
        height: 28,
        fill: 'rgba(255, 255, 255, 0.2)',
        cornerRadius: getSeatCornerRadius(seat.originalIndex),
      }"
      @click="handleSeatClick"
      @tap="handleSeatClick"
    />
    
    <v-text
      v-for="(seat, index) in emptySeats"
      :key="`empty-text-${index}`"
      :config="{
        x: seat.x - 14,
        y: seat.y - 14,
        width: 28,
        height: 28,
        text: (seat.originalIndex + 1).toString(),
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Manrope',
        lineHeight: 1,
        fill: 'white',
        align: 'center',
        verticalAlign: 'middle',
      }"
      @click="handleSeatClick"
      @tap="handleSeatClick"
    />
    
    <v-circle
      v-if="(table.capacity || table.seats || table.maxSeats || 4) === 2"
      :config="{
        x: 0,
        y: 0,
        radius: 40,
        fill: 'rgba(31, 31, 31, 1)',
        stroke: getTableBorderColor(),
        strokeWidth: getTableBorderWidth(),
        dash: getTableBorderStyle(),
      }"
    />
    
    <v-rect
      v-else
      :config="{
        x: -40,
        y: -40,
        width: 80,
        height: 80,
        fill: 'rgba(31, 31, 31, 1)',
        stroke: getTableBorderColor(),
        strokeWidth: getTableBorderWidth(),
        cornerRadius: 4,
        dash: getTableBorderStyle(),
      }"
    />
    
    <v-text
      :config="{
        x: -40,
        y: -8,
        width: 80,
        height: 16,
        text: tableIndex?.toString() || '1',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Manrope',
        lineHeight: 1,
        fill: 'white',
        align: 'center',
        verticalAlign: 'middle',
      }"
    />
    
    <v-rect
      v-if="table.server"
      :config="{
        x: -16,
        y: 15,
        width: 32,
        height: 20,
        fill: getServerBadgeColor(),
        cornerRadius: 4,
      }"
    />
    
    <v-text
      v-if="table.server"
      :config="{
        x: -16,
        y: 15,
        width: 32,
        height: 20,
        text: table.server,
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Manrope',
        lineHeight: '20',
        fill: 'white',
        align: 'center',
        verticalAlign: 'middle',
      }"
    />
    
    <v-text
      v-if="isTableOccupied()"
      :config="{
        x: -18,
        y: -33,
        width: 36,
        height: 16,
        text: getTotalCount(),
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Manrope',
        lineHeight: 1,
        fill: '#B4B4B4',
        align: 'center',
        verticalAlign: 'middle',
      }"
    />
  </v-group>
</template>

