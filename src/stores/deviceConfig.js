import { defineStore } from 'pinia'

export const useDeviceConfig = defineStore('deviceConfig', {
  state: () => ({
    // 设备类型配置
    deviceConfigs: {
      ventline: {
        // 表格列配置
        tableColumns: [
          { prop: 'code', label: '编号' },
          { prop: 'name', label: '名称' },
          { prop: 'type', label: '类型' },
          { prop: 'belongsection', label: '所属中段' }
        ],
        // 表单字段配置
        formFields: [
          { prop: 'name', label: '名称', type: 'input' },
          { prop: 'type', label: '类型', type: 'select', optionsKey: 'typeOptions' },
          { prop: 'belongsection', label: '所属中段', type: 'select', optionsKey: 'sectionOptions' }
        ],
        // 选项数据
        options: {
          sectionOptions: [
            { label: '230', value: '230' },
            { label: '350', value: '350' }
          ],
          typeOptions: [
            { label: '进风', value: '进风' },
            { label: '回风', value: '回风' }
          ]
        }
      },
      valve: {
        tableColumns: [
          { prop: 'name', label: '名称' },
          { prop: 'address', label: '地点' },
          { 
            prop: 'status', 
            label: '状态',
            formatter: row => row.status ? '开' : '关' // 自定义格式化函数
          },
          { prop: 'belongsection', label: '所属中段' }
        ],
        formFields: [
          { prop: 'name', label: '名称', type: 'input' },
          { prop: 'address', label: '地点', type: 'input' },
          { prop: 'status', label: '状态', type: 'select', optionsKey: 'statusOptions' },
          { prop: 'belongsection', label: '所属中段', type: 'select', optionsKey: 'sectionOptions' }
        ],
        options: {
          sectionOptions: [
            { label: '230', value: '230' },
            { label: '350', value: '350' }
          ],
          statusOptions: [
            { label: '开', value: 1 },
            { label: '关', value: 0 }
          ]
        }
      },
      sensor:{
        tableColumns: [
          { prop: 'name', label: '名称' },
          { prop: 'address', label: '地点' },
          { prop: 'group', label: '所属分站' }
        ],
      }
    }
  }),
  getters: {
    // 获取设备配置
    getConfig: (state) => (deviceType) => {
      return state.deviceConfigs[deviceType] || {}
    }
  }
})