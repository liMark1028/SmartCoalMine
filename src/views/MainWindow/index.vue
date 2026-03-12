<template>
  <div class="mk-gis-main">
    <el-button type="primary" @click="tilesChange">{{ show ? '隐藏' : '显示' }}</el-button>
    <el-button type="primary" @click="testSend">周油坊矿区</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import {useGlobalStore} from '@/stores/index'
const router = useRouter();
const show = ref(true)
const mars3dMap = inject('mars3dMap')
const store =useGlobalStore()
const tilesChange = () => {
  console.log(mars3dMap)

  //根据id获取图层
  const layer = mars3dMap.value.getLayerById('mk-qx')
  console.log(layer)

  layer.show = !show.value
  show.value = !show.value
}

const testSend=()=>{
  router.push({path:'/comperhensive'})
  let obj={
    kqname:'周油坊矿区',
    kqid:1
  }
  store.setkqData(obj)

}

onBeforeMount(()=>{
  
})
</script>

<style lang="scss">
.mk-gis-main{
  pointer-events: all;
}
</style>
