<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="Id">
              <a-input v-model="queryParam.id" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="用户名">
              <a-input v-model="queryParam.userName" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="手机号">
              <a-input v-model="queryParam.phone" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <span class="table-page-search-submitButtons" style="float:right;">
              <a-button type="primary" icon="search" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" icon="sync" @click="() => queryParam = {}">重置</a-button>
              <a-button
                style="margin-left: 8px"
                type="primary"
                icon="plus"
                @click="$refs.UserEditModal.edit(0)"
              >新增</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="userName" slot-scope="text">
        <ellipsis :length="40" tooltip>{{ text }}</ellipsis>
      </span>
      <span slot="roleName" slot-scope="text">
        <ellipsis :length="10" tooltip>{{ text }}</ellipsis>
      </span>
      <span slot="avatarUrl" slot-scope="text">
        <img v-if="text" :src="text" height="30" width="30" />
      </span>
      <span slot="gender" slot-scope="text">{{text==1?"男":"女"}}</span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.UserEditModal.edit(record.id)">编辑</a>
          &nbsp;
          <a-popconfirm title="确定要重置么？" @confirm="passwordReset(record.id)">
            <a>重置密码</a>
          </a-popconfirm>&nbsp;
          <a-popconfirm title="确定要删除么？" @confirm="remove(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>

    <user-edit ref="UserEditModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getUserList, deleteUserInfo, passwordReset } from '@/api/manage'
import UserEdit from './UserEdit'

export default {
  name: 'TableList',
  components: {
    STable,
    UserEdit,
    Ellipsis
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '用户名',
          dataIndex: 'userName',
          key: 'userName',
          scopedSlots: { customRender: 'userName' }
        },
        {
          title: '昵称',
          dataIndex: 'nickName',
          key: 'nickName'
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: '头像',
          dataIndex: 'avatarUrl',
          key: 'avatarUrl',
          scopedSlots: { customRender: 'avatarUrl' }
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender',
          scopedSlots: { customRender: 'gender' }
        },
        {
          title: '所属角色',
          dataIndex: 'roleName',
          key: 'roleName',
          scopedSlots: { customRender: 'roleName' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '170px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getUserList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      }
    }
  },
  filters: {
  },
  created () {

  },
  methods: {
    remove (id) {
      deleteUserInfo(id)
        .then(res => {
          if (res.result) {
            this.handleOk()
            this.$message.success('删除成功！')
          } else {
            this.$message.warning('删除失败，请刷新后重试！')
          }
        })
    },
    passwordReset (id) {
      passwordReset(id)
        .then(res => {
          if (res.result) {
            this.handleOk()
            this.$message.success('重置成功！')
          } else {
            this.$message.warning('重置失败，请刷新后重试！')
          }
        })
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
