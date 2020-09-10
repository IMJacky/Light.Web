<template>
  <a-modal
    title="分配资源"
    :width="400"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-tree
        v-model="checkedKeys"
        checkable
        :expandedKeys="expandedKeys"
        :tree-data="treeData"
        :checkStrictly="true"
        @check="onCheck"
        @expand="onExpand"
      />
    </a-spin>
  </a-modal>
</template>
<script>
import ATree from 'ant-design-vue/lib/tree'
import 'ant-design-vue/lib/tree/style'
import { getRoleMenuTree, editRoleMenu } from '@/api/manage'

export default {
  components: {
    ATree
  },
  data () {
    return {
      checkedKeys: [],
      expandedKeys: [],
      treeData: [],
      visible: false,
      confirmLoading: false,
      roleId: 0
    }
  },
  created () {

  },
  watch: {
  },
  methods: {
    edit (roleId) {
      this.roleId = roleId
      this.visible = true
      getRoleMenuTree(roleId).then(res => {
        this.treeData = res.result.menuTreeList
        this.checkedKeys = res.result.menuTreeCheckedList
        this.expandedKeys = res.result.menuTreeExpandList
      })
    },
    handleSubmit () {
      this.confirmLoading = true
      var formData = { roleId: this.roleId, menuIdList: this.checkedKeys }
      editRoleMenu(formData)
        .then(res => {
          this.confirmLoading = false
          if (res.result) {
            this.visible = false
            this.$message.success('保存成功！')
          } else {
            this.$message.warning('保存失败，请刷新后重试！')
          }
        })
    },
    handleCancel () {
      this.visible = false
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    onCheck (e) {
      this.checkedKeys = e.checked
    }
  }
}
</script>
