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
            <a-form-item label="角色名">
              <a-input v-model="queryParam.roleName" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="描述">
              <a-input v-model="queryParam.description" style="width: 100%" />
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
                @click="$refs.RoleEditModal.edit(0)"
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
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.RoleEditModal.edit(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定要删除么？" @confirm="remove(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>

    <role-edit ref="RoleEditModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getRoleList, deleteRoleInfo } from '@/api/manage'
import RoleEdit from './RoleEdit'

export default {
  name: 'TableList',
  components: {
    STable,
    RoleEdit,
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
          title: '角色名',
          dataIndex: 'roleName',
          key: 'roleName'
        },
        {
          title: '描述',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getRoleList(Object.assign(parameter, this.queryParam))
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
      deleteRoleInfo(id)
        .then(res => {
          if (res.result) {
            this.handleOk()
            this.$message.success('删除成功！')
          } else {
            this.$message.warning('删除失败，请刷新后重试！')
          }
        })
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
