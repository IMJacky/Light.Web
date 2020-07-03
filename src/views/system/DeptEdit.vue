<template>
  <a-modal
    :title="deptInfo.id==0?'新增部门':'修改部门'"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="部门名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['deptName', {rules: [{required: true, message: '请输入部门名！'}]}]" />
        </a-form-item>

        <a-form-item label="父级部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['parentDeptId']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getDeptInfo, editDeptInfo } from '@/api/manage'
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
      form: this.$form.createForm(this),
      deptInfo: {}
    }
  },
  methods: {
    edit (id) {
      this.deptInfo.id = id
      this.visible = true
      this.form.resetFields()
      if (id > 0) {
        getDeptInfo(id)
          .then(res => {
            var fieldsVal = pick(res.result, 'deptName', 'parentDeptId')
            fieldsVal.parentDeptId = fieldsVal.parentDeptId.toString()
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
          var formData = Object.assign(this.deptInfo, values)
          editDeptInfo(formData)
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
    }
  }
}
</script>
