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
            <a-form-item label="字典编码">
              <a-input v-model="queryParam.dictCode" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="字典名称">
              <a-input v-model="queryParam.dictName" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <span class="table-page-search-submitButtons" style="float: right">
              <a-button type="primary" icon="search" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" icon="sync" @click="() => (queryParam = {})">重置</a-button>
              <a-button style="margin-left: 8px" type="primary" icon="plus" @click="$refs.DictEditModal.edit(0)"
                >新增</a-button
              >
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" showPagination="auto">
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.DictEditModal.edit(record.id)">编辑</a>
          &nbsp;
          <a @click="$refs.DictConfigModal.config(record.dictCode)">配置</a>
          &nbsp;
          <a-popconfirm title="确定要删除么？" @confirm="remove(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>

    <dict-edit ref="DictEditModal" @ok="handleOk" />
    <dict-config ref="DictConfigModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getDictList, deleteDictInfo } from '@/api/manage'
import DictEdit from './DictEdit'
import DictConfig from './DictConfig'

export default {
  name: 'DictList',
  components: {
    STable,
    DictEdit,
    DictConfig
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
          title: '字典编码',
          dataIndex: 'dictCode',
          key: 'dictCode'
        },
        {
          title: '字典名称',
          dataIndex: 'dictName',
          key: 'dictName'
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
        return getDictList(Object.assign(parameter, this.queryParam))
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
      deleteDictInfo(id)
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
