<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'dining'
  }
})

const emit = defineEmits(['update:modelValue'])

const activeTab = ref(props.modelValue)

const tabs = [
  { id: 'dining', label: 'Dining Room' },
  { id: 'outdoor', label: 'Outdoor Patio' }
]

const setActiveTab = (tabId) => {
  activeTab.value = tabId
  emit('update:modelValue', tabId)
}
</script>

<template>
  <div class="app-header">
    <div class="app-header__tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['app-header__tab', { 'app-header__tab--active': activeTab === tab.id }]"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.app-header {
  background: #1F1F1F;
  padding: 12px;
  border-bottom: 1px solid #2E2E2E;
  flex-shrink: 0;

  &__tabs {
    display: flex;
    justify-content: center;
    gap: 0;
  }

  &__tab {
    padding: 8px 24px;
    background: #2E2E2E80;
    border: none;
    color: #B4B4B4;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    border-radius: 0;
    line-height: 24px;
    transition: all 0.3s;
    border: 1px solid #2E2E2E;

    &:first-child {
      border-radius: 6px 0 0 6px;
      border-right: 0;
    }

    &:last-child {
      border-radius: 0 6px 6px 0;
      border-left: 0;
    }

    &--active {
      background: #2B74EB;
      color: white;
      border-color: #2B74EB;
    }
  }
}
</style> 