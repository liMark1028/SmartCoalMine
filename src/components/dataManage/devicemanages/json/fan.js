// fan.js
export default {
  tableHeight:600,
  dialogWidth:'450px',
  tableColumns: [
    { prop: 'name', label: '地点' },
    { prop: 'type', label: '类型',
     },  
    { prop: 'capacity', label: '风速' },  
    { prop: 'speed', label: '风量' },  
    { prop: 'belongsection', label: '所属中段' },
    // 其他列...
  ],
  trst:'风机',
  formFields: [
    {
      prop: 'name',
      label: '地点',
      component: 'el-input',
      rules: [{ required: true }],
      props:{
        placeholder:'请输入地点'
      }
    },
    {
      prop: 'type',
      label: '类型',
      component: 'el-select',
      options: [
        { label: '1号分站', value: '1号' },
      ],
      props:{
        placeholder:'请选择类型'
      }

    },
    {
      prop: 'capacity',
      label: '风速',
      component: 'el-input',
      rules: [{ required: true }],
      props:{
        placeholder:'请输入风速'
      }
    },{
      prop: 'speed',
      label: '风速',
      component: 'el-input',
      rules: [{ required: true }],
      props:{
        placeholder:'请输入风量'
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
  ],


}