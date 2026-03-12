<template>
  <div class="emergency">
    <div class="emergency_content">
      <statictics />
      <laneMap />
      <div class="menulist">
        <emeryMenu/>
      </div>
    </div>
  </div>
</template>

<script setup>
import statictics from './equipmentStatic/inxex.vue'
import laneMap from './laneMap/index.vue'
import emeryMenu from './emeryMenu/index.vue'
</script>

<style lang="scss" scoped>
.emergency {
  position: absolute;
  pointer-events: none;
  .emergency_content {
    pointer-events: all;
    height: 533px;
  }
}
</style>
