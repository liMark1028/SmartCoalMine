<template>
  <div class="emerygencyrescue">
    <div class="emery_header">
      <div
        class="header_item"
        v-for="(item, i) in btnlist"
        :key="item.id"
        :class="{ activeitem: currendBtn == item.id }"
        @click="selBtn(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="emery_content">
      <component :is="componentsMap[currendBtn]" />
    </div>
  </div>
</template>

<script setup>
import escapeline from './escapeline/index.vue'
import refugechamber from './refugechamber/index.vue'
import pressurewind from './pressurewind/index.vue'
import watersupply from './watersupply/index.vue'
const btnlist = ref([
  {
    id: 'escapeline',
    title: '避灾路线',
  },
  {
    id: 'refugechamber',
    title: '避难硐室',
  },
  {
    id: 'pressurewind',
    title: '压风自救',
  },
  {
    id: 'watersupply',
    title: '供水施救',
  },
])
const componentsMap = {
  escapeline,
  refugechamber,
  pressurewind,
  watersupply,
}
const currendBtn = ref('escapeline')
const selBtn = (itemId) => {
  currendBtn.value = itemId
}
</script>

<style lang="scss" scoped>
.emerygencyrescue {
  width: 100%;
  color: #fff;
  .emery_header {
    display: flex;
    .header_item {
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: url(('@/assets/image/emergency/menu.png')) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin: 0 10px 0 0;
      color: #fff;
      &:hover {
        background: url(('@/assets/image/emergency/menus.png')) no-repeat;
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 1);
      }
      &.activeitem {
        background: url(('@/assets/image/emergency/menus.png')) no-repeat;
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
