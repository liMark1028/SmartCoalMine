// ventline.js
function gettypelist() {
  return [ { label: '进风', value: '进风' },
    { label: '回风', value: '回风' },]
}
export default {
  tableHeight: 600,
  dialogWidth: '450px',
  tableColumns: [
    { prop: 'code', label: '编号' },
    { prop: 'name', label: '名称' },
    { prop: 'type', label: '类型' },
    { prop: 'belongsection', label: '所属中段' },
    // 其他列...
  ],
  trst: '通风',
  formFields: [
    {
      prop: 'name',
      label: '名称',
      component: 'el-input',
      rules: [{ required: true }],
      props: {
        placeholder: '请输入地点',
      },
    },
    {
      prop: 'type',
      label: '类型',
      component: 'el-select',
      options:gettypelist(),
      props: {
        placeholder: '请选择类型',
      },
    },
    {
      prop: 'belongsection',
      label: '所属中段',
      component: 'el-select',
      options: [{ label: '1号分站', value: '1号' }],
      props: {
        placeholder: '请选择所属中段',
      },
    },
    // 其他表单字段...
  ],
  sectionOptions: [
    { label: '230', value: '230' },
    // 其他中段选项...
  ],
}
