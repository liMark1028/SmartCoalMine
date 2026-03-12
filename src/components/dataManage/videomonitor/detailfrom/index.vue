<template>
  <el-form ref="dialogRef" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入设备名称" />
    </el-form-item>
    <el-form-item label="地点" prop="address">
      <el-input v-model="form.address" placeholder="请输入地点" />
    </el-form-item>
    <el-form-item label="所属分组" prop="group">
      <el-select v-model="form.group" placeholder="请选择所属分组">
        <el-option
          v-for="item in groupOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="所属中段" prop="belongsection">
      <el-select v-model="form.belongsection" placeholder="请选择所属中段">
        <el-option
          v-for="item in sectionOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
const form = reactive({
  name: '',
  address: '',
  group: '',
  belongsection: '',
})
const groupOption = ref([
  { label: '办公区区域', value: '办公区区域' },
  { label: '地上工作区域', value: '地上工作区域' },
  { label: '井下区域', value: '井下区域' },
])
const sectionOption = ref([
  { label: '230', value: '230' },
  { label: '350', value: '350' },
  { label: '400', value: '400' },
  { label: '450', value: '450' },
  { label: '500', value: '500' },
])
</script>

<style lang="scss" scoped>
.from_content {
}
</style>
