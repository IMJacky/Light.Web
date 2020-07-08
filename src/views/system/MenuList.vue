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
            <a-form-item label="类型">
              <a-select v-model="queryParam.type" placeholder="请选择" :allowClear="true">
                <a-select-option value="0">菜单</a-select-option>
                <a-select-option value="1">按钮</a-select-option>
                <a-select-option value="2">外链</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="名称">
              <a-input v-model="queryParam.menuName" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="父级菜单">
              <a-select :allowClear="true" v-model="queryParam.parentMenuId" style="width: 100%">
                <a-select-option v-for="(value, key) in parentMenuMap" :key="key">{{value}}</a-select-option>
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
                v-action:add
                @click="$refs.MenuEditModal.edit(0)"
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
      <span slot="type" slot-scope="text">{{ text | statusFilter }}</span>
      <span slot="menuName" slot-scope="text">
        <ellipsis :length="40" tooltip>{{ text }}</ellipsis>
      </span>
      <span slot="icon" slot-scope="text">
        <a-icon :type="text" v-if="text!=''" />
      </span>
      <span slot="path" slot-scope="text, record">
        <a v-if="record.type===2" :href="text" target="_blank">{{text}}</a>
        <span v-else>{{text}}</span>
      </span>
      <span slot="parentMenuId" slot-scope="text">{{parentMenuMap[text]}}</span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.MenuEditModal.edit(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定要删除么？" @confirm="remove(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>

    <menu-edit ref="MenuEditModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getMenuList, deleteMenuInfo, getMenuListParent } from '@/api/manage'
import MenuEdit from './MenuEdit'

const statusMap = {
  0: {
    text: '菜单'
  },
  1: {
    text: '按钮'
  },
  2: {
    text: '外链'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    MenuEdit,
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
          title: '名称',
          dataIndex: 'menuName',
          key: 'menuName',
          scopedSlots: { customRender: 'menuName' }
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: '图标',
          dataIndex: 'icon',
          key: 'icon',
          scopedSlots: { customRender: 'icon' }
        },
        {
          title: '父级菜单',
          dataIndex: 'parentMenuId',
          key: 'parentMenuId',
          scopedSlots: { customRender: 'parentMenuId' }
        },
        {
          title: '路由路径',
          dataIndex: 'path',
          key: 'path',
          scopedSlots: { customRender: 'path' }
        },
        {
          title: '组件路径',
          dataIndex: 'component',
          key: 'component'
        },
        {
          title: '排序值',
          dataIndex: 'sort',
          key: 'sort'
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
        return getMenuList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      parentMenuMap: {}
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    }
  },
  created () {
    getMenuListParent()
      .then(res => {
        this.parentMenuMap = res.result
      })
  },
  methods: {
    remove (id) {
      deleteMenuInfo(id)
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
