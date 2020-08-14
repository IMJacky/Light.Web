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
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
        @select="onSelect"
        @check="onCheck"
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
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      checkedKeysAll: [],
      selectedKeys: [],
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
      })
    },
    handleSubmit () {
      this.confirmLoading = true
      var formData = { roleId: this.roleId, menuIdList: this.checkedKeysAll }
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
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys, e) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
      this.checkedKeysAll = checkedKeys.concat(e.halfCheckedKeys)
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    }
  }
}
</script>
