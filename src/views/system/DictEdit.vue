<template>
  <a-modal
    :title="dictInfo.id == 0 ? '新增字典' : '修改字典'"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="字典编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dictCode', { rules: [{ required: true, message: '请输入字典编码！' }] }]" />
        </a-form-item>
        <a-form-item label="字典名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['dictName', { rules: [{ required: true, message: '请输入字典名！' }] }]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getDictInfo, editDictInfo } from '@/api/manage'
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
      dictInfo: {}
    }
  },
  methods: {
    edit (id) {
      this.dictInfo.id = id
      this.visible = true
      this.form.resetFields()
      if (id > 0) {
        getDictInfo(id)
          .then(res => {
            var fieldsVal = pick(res.result, 'dictCode', 'dictName')
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
          var formData = Object.assign(this.dictInfo, values)
          editDictInfo(formData)
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
