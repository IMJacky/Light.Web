<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-row :gutter="48">
        <a-col :md="24" :sm="24">
          <span class="table-page-search-submitButtons" style="float:right;">
            <a-button
              style="margin-left: 8px"
              type="primary"
              icon="plus"
              @click="$refs.DeptEditModal.edit(0)"
            >新增</a-button>
          </span>
        </a-col>
      </a-row>
    </div>

    <a-table :columns="columns" :data-source="deptList" rowKey="id">
      <span slot="parentDeptId" slot-scope="text">{{parentDeptMap[text]}}</span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.DeptEditModal.edit(record.id)">编辑</a>
          &nbsp;
          <a-popconfirm title="确定要删除么？" @confirm="remove(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </span>
    </a-table>

    <dept-edit ref="DeptEditModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { deleteDeptInfo, getDeptMapAll, getDeptListAll } from '@/api/manage'
import DeptEdit from './DeptEdit'

export default {
  name: 'DeptList',
  components: {
    STable,
    DeptEdit,
    Ellipsis
  },
  data () {
    return {
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
      parentDeptMap: {},
      deptList: []
    }
  },
  filters: {
  },
  created () {
    getDeptMapAll()
      .then(res => {
        this.parentDeptMap = res.result
      })

    this.search()
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
      this.search()
    },
    search () {
      getDeptListAll({}).then(res => {
        this.deptList = res.result
      })
    }
  }
}
</script>
