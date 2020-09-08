<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="执行密码"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入执行密码' }]}
          ]"
          placeholder="执行密码"
        />
      </a-form-item>
      <a-form-item
        label="SQL语句"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea
          rows="4"
          placeholder="SQL语句"
          v-decorator="[
            'sql',
            {rules: [{ required: true, message: '请输入SQL语句' }]}
          ]"
        />
      </a-form-item>

      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">执行</a-button>
      </a-form-item>

      <a-form-item
        label="执行结果"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea rows="10" v-decorator="[
            'result'
          ]" placeholder="执行结果" />
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { executeSql } from '@/api/manage'
export default {
  name: 'ExecuteSql',
  data () {
    return {
      // form
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          executeSql(values)
            .then(res => {
              this.form.setFieldsValue({
                result: JSON.stringify(res.result)
              })
            })
        }
      })
    }
  }
}
</script>
