<template>
  <div class="production">
    <div class="production_content">
      <overview />
      <statistics />
      <realTimeProgress />
    </div>
  </div>
</template>

<script setup>
import overview from './overview/index.vue'
import statistics from './statistics/index.vue'
import realTimeProgress from './realTimeProgress/index.vue'
</script>

<style lang="scss" scoped>
.production {
  position: relative;
  pointer-events: none;
  .production_content {
    width: 441px;
    height: 910px;
    pointer-events: all;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
  }
}
</style>
