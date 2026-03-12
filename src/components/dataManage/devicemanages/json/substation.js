// substation.js
export default {
  tableHeight:600,
  dialogWidth:'450px',
    tableColumns: [
      { prop: 'name', label: '设备名称' },
      { prop: 'address', label: '地点' },  
      { prop: 'belongsection', label: '所属中段' },
      // 其他列...
    ],
    trst:'广播',
    formFields: [
      {
        prop: 'name',
        label: '设备名称',
        component: 'el-input',
        rules: [{ required: true }],
        props:{
          placeholder:'请输入设备名称'
        }
      },
      {
        prop: 'address',
        label: '设备地址',
        component: 'el-input',
        rules: [{ required: true }],
        props:{
          placeholder:'请输入设备地址'
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
      // 其他中段选项...
    ]
  }