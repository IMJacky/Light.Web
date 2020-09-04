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

        <a-form-item label="所属部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-cascader
            :options="deptCascadeAll"
            v-decorator="['deptIdList']"
            placeholder="请选择部门"
            change-on-select
          />
        </a-form-item>

        <a-form-item label="所属岗位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            :filterOption="filterOption"
            :allowClear="true"
            :showSearch="true"
            v-decorator="['jobId']"
            placeholder="请选择岗位"
          >
            <a-select-option v-for="job in jobList" :key="job.id" :value="job.id">{{job.jobName}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="分配角色" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            mode="multiple"
            :filterOption="filterOption"
            :allowClear="true"
            v-decorator="['roleId']"
          >
            <a-select-option
              v-for="role in allRoleMap"
              :key="role.id"
              :value="role.id"
            >{{role.description}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import ACascader from 'ant-design-vue/lib/cascader'
import 'ant-design-vue/lib/cascader/style'
import { getUserInfo, editUserInfo, getRoleListAll, getDeptCascadeAll, getJobListAll } from '@/api/manage'
import pick from 'lodash.pick'
export default {
  components: {
    ACascader
  },
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
      userInfo: {},
      allRoleMap: {},
      jobList: [],
      deptCascadeAll: []
    }
  },
  methods: {
    edit (id) {
      this.userInfo = {}
      this.form.resetFields()
      this.userInfo.id = id
      this.visible = true
      getRoleListAll()
        .then(res => {
          this.allRoleMap = res.result
        })
      getJobListAll()
        .then(res => {
          this.jobList = res.result
        })
      getDeptCascadeAll().then(res => {
        this.deptCascadeAll = res.result
      })
      if (id > 0) {
        getUserInfo(id)
          .then(res => {
            var fieldsVal = pick(res.result, 'userName', 'nickName', 'avatarUrl', 'gender', 'phone', 'email', 'roleId', 'deptIdList', 'jobId')
            fieldsVal.gender = fieldsVal.gender.toString()
            if (fieldsVal.jobId === 0) {
              fieldsVal.jobId = undefined
            }
            this.userInfo.avatarUrl = fieldsVal.avatarUrl
            if (fieldsVal.roleId != null && fieldsVal.roleId.length > 0) {
              fieldsVal.roleId = fieldsVal.roleId.split(',').map(m => {
                return Number(m)
              })
            } else {
              fieldsVal.roleId = []
            }
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
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>
