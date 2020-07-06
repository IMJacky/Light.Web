<template>
  <a-modal
    :title="userInfo.id==0?'新增用户':'修改用户'"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['userName', {rules: [{required: true, message: '请输入用户名！'}]}]" />
        </a-form-item>

        <a-form-item label="昵称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['nickName']" />
        </a-form-item>

        <a-form-item label="头像" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['avatarUrl']" v-show="false" />
          <a-badge
            v-for="i in 8"
            :key="'/avatar'+i+'.jpg'"
            style="margin:5px;"
            @click="avatarSelect('/avatar'+i+'.jpg')"
          >
            <a-icon
              slot="count"
              :type="userInfo.avatarUrl=='/avatar'+i+'.jpg'?'check-circle':'none'"
              style="color: green"
            />
            <a-avatar :size="64" :src="'/avatar'+i+'.jpg'" />
          </a-badge>
        </a-form-item>

        <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            :allowClear="true"
            v-decorator="['gender', {rules: [{required: true, message: '请选择性别！'}]}]"
          >
            <a-select-option value="1">男</a-select-option>
            <a-select-option value="2">女</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['phone']" />
        </a-form-item>

        <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['email']" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getUserInfo, editUserInfo } from '@/api/manage'
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
      userInfo: {}
    }
  },
  methods: {
    edit (id) {
      this.userInfo = {}
      this.form.resetFields()
      this.userInfo.id = id
      this.visible = true
      if (id > 0) {
        getUserInfo(id)
          .then(res => {
            var fieldsVal = pick(res.result, 'userName', 'nickName', 'avatarUrl', 'gender', 'phone', 'email')
            fieldsVal.gender = fieldsVal.gender.toString()
            this.userInfo.avatarUrl = fieldsVal.avatarUrl
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
          var formData = Object.assign(this.userInfo, values)
          editUserInfo(formData)
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
    avatarSelect (key) {
      this.userInfo.avatarUrl = key
      this.form.setFieldsValue({
        avatarUrl: key
      })
    }
  }
}
</script>
