<script setup>
import BaseIcon from '../UI/BaseIcon.vue'

const props = defineProps({
  activeItem: {
    type: String,
    default: 'tables'
  }
})

const activeItem = props.activeItem

const navItems = [
  { id: 'register', label: 'Register', icon: 'register' },
  { id: 'tables', label: 'Tables', icon: 'tableBar' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
  { id: 'settings', label: 'Settings', icon: 'settings', disabled: true }
]
</script>

<template>
  <div class="bottom-navigation">
    <div class="bottom-navigation__items">
      <div 
        v-for="item in navItems" 
        :key="item.id"
        :class="[
          'bottom-navigation__item', 
          { 
            'bottom-navigation__item--active': activeItem === item.id,
            'bottom-navigation__item--disabled': item.disabled 
          }
        ]"
      >
        <div class="bottom-navigation__icon">
          <BaseIcon :name="item.icon" />
        </div>
        <div class="bottom-navigation__label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.bottom-navigation {
  display: flex;
  background: #1a1a1a;
  border-top: 1px solid #333;
  flex-shrink: 0;

  &__items {
    display: flex;
    width: 100%;
  }

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: default;
    padding: 10px;
    transition: all 0.3s;

    &--active {
      background: #333;

      .bottom-navigation__label {
        color: #fff;
      }
    }

    &--disabled {
      opacity: 0.4;
      cursor: not-allowed;

      &:hover {
        background: transparent;
      }

      .bottom-navigation__icon,
      .bottom-navigation__label {
        color: #555;
      }
    }
  }

  &__icon {
    color: #888;
  }

  &__label {
    font-size: 18px;
    color: #888;
    font-weight: 600;
    line-height: 28px;
  }
}
</style> 