<template>
  <a-modal
    :title="menuInfo.id==0?'新增菜单':'修改菜单'"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            :allowClear="true"
            v-decorator="['type', {rules: [{required: true, message: '请选择类型！'}]}]"
          >
            <a-select-option value="0">菜单</a-select-option>
            <a-select-option value="1">按钮</a-select-option>
            <a-select-option value="2">外链</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="快速选择"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-if="form.getFieldValue('type') === '1'"
          key="0"
        >
          <a-select :allowClear="true" @change="onChangeButtonType">
            <a-select-option v-for="(v,k) in buttonTypeMap" :key="k" :value="k">{{ v }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['menuName', {rules: [{required: true, message: '请输入菜单名称！'}]}]" />
        </a-form-item>

        <a-form-item label="父级菜单" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            :allowClear="true"
            v-decorator="['parentMenuId',{rules: [{required: true, message: '请选择父级菜单！'}]}]"
          >
            <a-select-option v-for="(value, key) in parentMenuMap" :key="key">{{value}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="路由地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['path',{rules: [{required: true, message: '请输入路由地址！'}]}]" />
        </a-form-item>

        <a-form-item
          label="组件路径"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-if="form.getFieldValue('type') !== '1'"
          key="1"
        >
          <a-input v-decorator="['component']" />
        </a-form-item>

        <a-form-item
          label="排序值"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-if="form.getFieldValue('type') !== '1'"
          key="2"
        >
          <a-input v-decorator="['sort']" />
        </a-form-item>

        <a-form-item
          label="图标"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          v-if="form.getFieldValue('type') !== '1'"
          key="3"
        >
          <a-input v-decorator="['icon']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getMenuInfo, editMenuInfo, getMenuMapAll } from '@/api/manage'
import pick from 'lodash.pick'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      menuInfo: {},
      parentMenuMap: {},
      buttonTypeMap: {
        'add': '新增',
        'delete': '删除',
        'edit': '编辑',
        'query': '查询',
        'get': '详情',
        'enable': '启用',
        'disable': '禁用',
        'import': '导入',
        'export': '导出'
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    this.form.getFieldDecorator('type', { initialValue: '' })
  },
  methods: {
    edit (id) {
      this.menuInfo.id = id
      this.visible = true
      this.form.resetFields()
      getMenuMapAll()
        .then(res => {
          this.parentMenuMap = res.result
        })
      if (id > 0) {
        getMenuInfo(id)
          .then(res => {
            var fieldsVal = pick(res.result, 'menuName', 'parentMenuId', 'path', 'component', 'type', 'sort', 'icon')
            fieldsVal.type = fieldsVal.type.toString()
            fieldsVal.parentMenuId = fieldsVal.parentMenuId.toString()
            this.$nextTick(() => {
              this.form.setFieldsValue(fieldsVal)
            })
          })
      }
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          var formData = Object.assign(this.menuInfo, values)
          editMenuInfo(formData)
            .then(res => {
              this.confirmLoading = false
              if (res.result > 0) {
                this.visible = false
                this.$emit('ok')
                this.$message.success('保存成功！')
              } else {
                this.$message.warning('保存失败，请刷新后重试！')
              }
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    },
    onChangeButtonType (e) {
      const { form: { setFieldsValue } } = this
      setFieldsValue({
        path: e,
        menuName: this.buttonTypeMap[e]
      })
    }
  }
}
</script>
