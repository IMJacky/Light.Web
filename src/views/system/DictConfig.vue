<template>
  <a-modal
    title="字典配置"
    :width="680"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" layout="inline">
        <div v-for="(item, index) in form.getFieldValue('dictConfigList')" :key="index">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典编码">
            <a-input
              v-decorator="[
                `dictCode[${index}]`,
                {
                  initialValue: item.dictCode,
                  validateTrigger: ['change', 'blur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入字典值/编码',
                    },
                  ],
                },
              ]"
              placeholder="字典值/编码"
              style="width: 150px"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典名称">
            <a-input
              v-decorator="[
                `dictName[${index}]`,
                {
                  initialValue: item.dictName,
                  validateTrigger: ['change', 'blur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入字典名称',
                    },
                  ],
                },
              ]"
              placeholder="字典名称"
              style="width: 150px"
            />
          </a-form-item>
          <a-form-item>
            <a-button @click="add" icon="plus" style="margin-right: 10px" />
            <a-button v-if="index > 0" @click="remove(index)" icon="minus" />
          </a-form-item>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getDictConfig, saveDictConfig } from '@/api/manage'
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
      dictInfo: {}
    }
  },
  created () {
    this.form = this.$form.createForm(this)
    this.form.getFieldDecorator('dictConfigList', { initialValue: [], preserve: true })
  },
  methods: {
    config (dictCode) {
      this.dictInfo.dictCode = dictCode
      this.visible = true
      this.form.resetFields()
      if (dictCode) {
        getDictConfig(this.dictInfo)
          .then(res => {
            if (res.result.dictConfigList.length === 0) {
              res.result.dictConfigList.push({ dictCode: '', dictName: '' })
            }
            var fieldsVal = pick(res.result, 'dictConfigList')
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
          for (let i = 0; i < values.dictConfigList.length; i++) {
            values.dictConfigList[i].dictCode = values.dictCode[i]
            values.dictConfigList[i].dictName = values.dictName[i]
          }
          this.dictInfo.dictConfigList = values.dictConfigList
          saveDictConfig(this.dictInfo)
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
    remove (index) {
      const { form } = this
      const dictConfigList = form.getFieldValue('dictConfigList')
      dictConfigList.splice(index, 1)
      const dictCodeList = form.getFieldValue('dictCode')
      dictCodeList.splice(index, 1)
      const dictNameList = form.getFieldValue('dictName')
      dictNameList.splice(index, 1)

      form.setFieldsValue({
        dictConfigList: dictConfigList,
        dictCode: dictCodeList,
        dictName: dictNameList
      })
    },
    add () {
      const { form } = this
      const dictConfigList = form.getFieldValue('dictConfigList')
      dictConfigList.push({ dictCode: '', dictName: '' })
      form.setFieldsValue({
        dictConfigList: dictConfigList
      })
    }
  }
}
</script>
