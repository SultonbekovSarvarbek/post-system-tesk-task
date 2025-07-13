<script setup>
import BaseIcon from './UI/BaseIcon.vue'

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="overview-modal" @click="closeModal">
    <div class="overview-modal__content" @click.stop>
      <div class="overview-modal__header">
        <button class="overview-modal__close-btn" @click="$emit('close')">Close</button>
        <div class="overview-modal__title">
          <h2>Table 5</h2>
          <p>Outdoor Patio</p>
        </div>
        <button class="overview-modal__register-btn" @click="$emit('close')">
          To Register
          <BaseIcon name="arrow" />
        </button>
      </div>

      <div class="overview-modal__body">
        <div class="table-summary">
          <div class="table-summary__header">
            <div class="table-summary__left">
              <span class="table-summary__title">Table Summary</span>
              <span class="table-summary__status-badge table-summary__status-badge--occupied">
                 <BaseIcon name="busy" />
                Busy
              </span>
            </div>
            <div class="table-summary__right">
              <span class="table-summary__updated-label">Last updated</span>
              <span class="table-summary__updated-time">1:47 PM</span>
            </div>
          </div>

          <div class="table-summary__stats">
            <div class="table-summary__stat">
              <div class="table-summary__stat-icon">
                <BaseIcon name="amount" />
              </div>
              <div class="table-summary__stat-value">
                <span class="table-summary__stat-paid">$0.00</span>
                <span class="table-summary__stat-total"> / $94.56</span>
              </div>
            </div>
            <div class="table-summary__stat">
              <div class="table-summary__stat-icon">
                <BaseIcon name="duration" />
              </div>
              <div class="table-summary__stat-value">05:24</div>
            </div>
            <div class="table-summary__stat">
              <div class="table-summary__stat-icon">
                <BaseIcon name="persons" />
              </div>
              <div class="table-summary__stat-value">2 / 4</div>
            </div>
          </div>
        </div>

        <div class="server-section">
          <h3 class="server-section__title">SERVER</h3>
          <div class="server-section__cards">
            <div class="server-card server-card--active">
              <div class="server-card__header">
                <div class="server-card__info">
                  <span class="server-card__color-badge server-card__color-badge--mt"></span>
                  <h4 class="server-card__name">Michael T.</h4>
                </div>
                <div class="server-card__check">
                  <BaseIcon name="check" />
                </div>
              </div>
              <div class="server-card__stats"> 
                <BaseIcon name="person" /> 
                <span>2 live | 5 today</span>
              </div>
            </div>
            <div class="server-card">
              <div class="server-card__header">
                <div class="server-card__info">
                  <span class="server-card__color-badge server-card__color-badge--js"></span>
                  <h4 class="server-card__name">Jessica L.</h4>
                </div>
              </div>
              <div class="server-card__stats"> 
                <BaseIcon name="person" /> 
                <span>2 live | 5 today</span>
              </div>
            </div>
            <div class="server-card">
              <div class="server-card__header">
                <div class="server-card__info">
                  <span class="server-card__color-badge server-card__color-badge--la"></span>
                  <h4 class="server-card__name">Liam A.</h4>
                </div>          
              </div>
              <div class="server-card__stats"> 
                <BaseIcon name="person" /> 
                <span>2 live | 5 today</span>
              </div>
            </div>
          </div>
        </div>

        <div class="status-section">
          <h3 class="status-section__title">STATUS</h3>
          <div class="status-section__dropdown">
            <div class="status-section__select">
              <BaseIcon name="cross_24" />
              <span>Busy</span>
              <BaseIcon name="arrowDown" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="overview-modal__actions">
        <button class="overview-modal__action-btn overview-modal__action-btn--secondary" @click="$emit('close')">Move Party</button>
        <button class="overview-modal__action-btn overview-modal__action-btn--primary" @click="$emit('close')">Make Available</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.overview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &__content {
    background: #171717;
    border: 1px solid #2E2E2E;
    border-radius: 8px;
    width: 100%;
    max-width: 480px;
    max-height: 100vh;
    overflow-y: auto;
    color: white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  &__header {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid #2E2E2E;
  }

  &__close-btn {
    background: none;
    border: none;
    color: #B4B4B4;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    flex: 1;
    text-align: left;
  }

  &__title {
    flex: 1;
    text-align: center;

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
    }

    p {
      color: #999;
      font-size: 14px;
      font-weight: 500;
    }
  }

  &__register-btn {
    background: none;
    border: none;
    color: #2B74EB;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }

  &__body {
    padding: 16px;
  }

  &__actions {
    display: flex;
    gap: 10px;
    padding: 16px;
    border-top: 1px solid #2E2E2E;
  }

  &__action-btn {
    flex: 1;
    padding: 15px 15px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Manrope', sans-serif;

    &--secondary {
      background: #2B74EB4D;
      color: white;
      border: 1px solid #2B74EB;
    }

    &--primary {
      background: #2B74EB;
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.table-summary {
  padding: 16px;
  border: 1px solid #EB2B95;
  border-radius: 6px;
  margin-bottom: 18px;
  background: #2E2E2E80;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  &__status-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 8px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;

    &--occupied {
      background: #2E2E2E80;
      color: white;
      border: 1px solid #2E2E2E;
    }

    &--available {
      background: #4caf50;
      color: white;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__updated-label {
    color: #B4B4B4;
    font-size: 14px;
  }

  &__updated-time {
    color: #fff;
    font-size: 14px;
  }

  &__stats {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__stat {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__stat-icon {
    color: #999;
    display: flex;
    align-items: center;
  }

  &__stat-value {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #B4B4B4;
  }

  &__stat-paid {
    font-weight: 500;
    color: #B4B4B4;
  }

  &__stat-total {
    color: #FFFFFF;
    font-weight: 600;
  }
}

.server-section {
  margin-bottom: 18px;
  margin-right: -16px;

  &__title {
    margin: 0 0 6px 0;
    color: #999;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 20px;
  }

  &__cards {
    display: flex;
    gap: 8px;
    overflow-x: auto;
  }
}

.server-card {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border: 1px solid #2E2E2E;
  border-radius: 6px;
  min-width: 192px;
  cursor: pointer;
  transition: all 0.2s;
  background: #2E2E2E80;
  flex-direction: column;

  &--active {
    border-color: #2B74EB;
    background: #2E2E2E80;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__color-badge {
    width: 20px;
    height: 20px;
    border-radius: 4px;

    &--mt {
      background-color: #EB2B95;
    }

    &--js {
      background-color: #A9A300;
    }

    &--la {
      background-color: #EB722B;
    }
  }

  &__name {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin: 0;
  }

  &__check {
    color: #4caf50;
    display: flex;
    align-items: center;
  }

  &__stats {
    display: flex;
    align-items: center;
    gap: 2px;
    color: #B4B4B4;

    span {
      font-size: 14px;
      font-weight: 500;
    }
  }
}

.status-section {
  &__title {
    margin: 0 0 6px 0;
    color: #999;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 20px;
  }

  &__dropdown {
  }

  &__select {
    background: #2E2E2E80;
    border: 1px solid #404040;
    color: white;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 16px;
    width: 100%;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;

    span {
      flex: 1;
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style> 