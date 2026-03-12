// sensor.config.js

export default {
    tableHeight:600,
    dialogWidth:'450px',
    tableColumns: [
      { prop: 'name', label: '名称' },
      { prop: 'address', label: '地点' },
      { 
        prop: 'group', 
        label: '所属分站',
        formatter: row => row.group 
      },
      { prop: 'belongsection', label: '所属中段' },
    ],
    trst:'基础设备',
    formFields: [
      {
        prop: 'name',
        label: '名称',
        component: 'el-input',
        rules: [{ required: true }],
        props:{
          placeholder:'请输入名称'
        }
      },
      {
        prop: 'address',
        label: '地点',
        component: 'el-input',
        rules: [{ required: true }],
        props:{
          placeholder:'请输入地点'
        }
      },
      {
        prop: 'group',
        label: '所属分站',
        component: 'el-select',
        options: [
          { label: '1号分站', value: '1号' },
        ],
        props:{
          placeholder:'请选择所属分站'
        }

      },
      {
        prop: 'belongsection',
        label: '所属中段',
        component: 'el-select',
        options: [
          { label: '1号分站', value: '1号' },
        ],
        props:{
          placeholder:'请选择所属中段'
        }

      },
      // 其他表单字段...
    ],
    sectionOptions: [
      { label: '230', value: '230' },
    ],
    api: {
      // 获取数据（必须）
      fetch: async (params) => {
        // return await api.getSensors({
        //   page: params.page,
        //   size: params.size,
        //   keyword: params.keyword,
        //   section: params.section
        // })
      }
    },
     // 删除数据
     delete: async (id) => {
      return id
      // return await api.deleteSensor(id)
    },
    
  }