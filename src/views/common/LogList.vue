<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="操作人Id">
              <a-input v-model="queryParam.operateId" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="操作人姓名">
              <a-input v-model="queryParam.operateName" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="操作类型">
              <a-input v-model="queryParam.operateType" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="日志类型">
              <a-input v-model="queryParam.logType" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="日志子类型">
              <a-input v-model="queryParam.logSubType" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="关联Id">
              <a-input v-model="queryParam.relateId" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="查询开始日期">
              <a-input v-model="queryParam.beginDate" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="查询结束日期">
              <a-input v-model="queryParam.endDate" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <span class="table-page-search-submitButtons" style="float:right;">
              <a-button type="primary" icon="search" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" icon="sync" @click="() => queryParam = {}">重置</a-button>
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
      :expandRowByClick="true"
    >
      <span slot="expandedRowRender" slot-scope="record">
        <span style="white-space: pre-wrap;">{{ record.message }}</span>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getLogList } from '@/api/manage'

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '操作人Id',
          dataIndex: 'userId',
          key: 'userId'
        },
        {
          title: '操作人姓名',
          dataIndex: 'userName',
          key: 'userName'
        },
        {
          title: '日志类型',
          dataIndex: 'logTypeName',
          key: 'logTypeName'
        },
        {
          title: '日志子类型',
          dataIndex: 'logSubTypeName',
          key: 'logSubTypeName'
        },
        {
          title: '操作类型',
          dataIndex: 'operateTypeName',
          key: 'operateTypeName'
        },
        {
          title: '关联Id',
          dataIndex: 'relateId',
          key: 'relateId'
        },
        {
          title: '操作时间',
          dataIndex: 'operationTime',
          key: 'operationTime'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getLogList(Object.assign(parameter, this.queryParam))
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
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
