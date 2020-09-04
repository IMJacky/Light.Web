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
            <a-form-item label="部门名">
              <a-input v-model="queryParam.deptName" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="上级部门">
              <a-select :allowClear="true" v-model="queryParam.parentDeptId" style="width: 100%">
                <a-select-option v-for="(value, key) in parentDeptMap" :key="key">{{value}}</a-select-option>
              </a-select>
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
                @click="$refs.DeptEditModal.edit(0)"
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
      <span slot="parentDeptId" slot-scope="text">
        {{parentDeptMap[text]}}
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.DeptEditModal.edit(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定要删除么？" @confirm="remove(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>

    <dept-edit ref="DeptEditModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getDeptList, deleteDeptInfo, getDeptMapAll } from '@/api/manage'
import DeptEdit from './DeptEdit'

export default {
  name: 'TableList',
  components: {
    STable,
    DeptEdit,
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
          title: '部门名',
          dataIndex: 'deptName',
          key: 'deptName'
        },
        {
          title: '上级部门',
          dataIndex: 'parentDeptId',
          key: 'parentDeptId',
          scopedSlots: { customRender: 'parentDeptId' }
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
        return getDeptList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      parentDeptMap: {}
    }
  },
  filters: {
  },
  created () {
    getDeptMapAll()
      .then(res => {
        this.parentDeptMap = res.result
      })
  },
  methods: {
    remove (id) {
      deleteDeptInfo(id)
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
