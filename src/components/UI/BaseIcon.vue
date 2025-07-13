<script setup>
import { computed, defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  }
});

const iconComponent = computed(() =>
  defineAsyncComponent(() => import(`../../assets/svg/${props.name}.svg`)),
);
</script>

<template>
  <div class="base-icon">
    <component :is="iconComponent" class="base-icon__svg" />
  </div>
</template>

<style lang="scss">
.base-icon {
  display: flex;
}
</style>
  