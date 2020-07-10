import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  menuListParent: '/MenuEntity/listParent',
  menuList: '/MenuEntity/page',
  menuInfo: '/MenuEntity/',
  menuEdit: '/MenuEntity/edit',

  userList: '/UserEntity/page',
  userInfo: '/UserEntity/',
  userEdit: '/UserEntity/edit',

  roleListAll: '/RoleEntity/list',
  roleList: '/RoleEntity/page',
  roleInfo: '/RoleEntity/',
  roleEdit: '/RoleEntity/edit',

  deptListParent: '/DeptEntity/listParent',
  deptList: '/DeptEntity/page',
  deptInfo: '/DeptEntity/',
  deptEdit: '/DeptEntity/edit',

  jobList: '/JobEntity/page',
  jobInfo: '/JobEntity/',
  jobEdit: '/JobEntity/edit',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

export function getMenuListParent () {
  return axios({
    url: api.menuListParent,
    method: 'get'
  })
}

export function getMenuList (parameter) {
  return axios({
    url: api.menuList,
    method: 'post',
    data: parameter
  })
}

export function getMenuInfo (parameter) {
  return axios({
    url: api.menuInfo + parameter,
    method: 'get'
  })
}

export function editMenuInfo (parameter) {
  return axios({
    url: api.menuEdit,
    method: 'post',
    data: parameter
  })
}

export function deleteMenuInfo (parameter) {
  return axios({
    url: api.menuInfo + parameter,
    method: 'delete'
  })
}

export function getUserList (parameter) {
  return axios({
    url: api.userList,
    method: 'post',
    data: parameter
  })
}

export function getUserInfo (parameter) {
  return axios({
    url: api.userInfo + parameter,
    method: 'get'
  })
}

export function editUserInfo (parameter) {
  return axios({
    url: api.userEdit,
    method: 'post',
    data: parameter
  })
}

export function deleteUserInfo (parameter) {
  return axios({
    url: api.userInfo + parameter,
    method: 'delete'
  })
}

export function getRoleListAll () {
  return axios({
    url: api.roleListAll,
    method: 'get'
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.roleList,
    method: 'post',
    data: parameter
  })
}

export function getRoleInfo (parameter) {
  return axios({
    url: api.roleInfo + parameter,
    method: 'get'
  })
}

export function editRoleInfo (parameter) {
  return axios({
    url: api.roleEdit,
    method: 'post',
    data: parameter
  })
}

export function deleteRoleInfo (parameter) {
  return axios({
    url: api.roleInfo + parameter,
    method: 'delete'
  })
}

export function getDeptListParent () {
  return axios({
    url: api.deptListParent,
    method: 'get'
  })
}

export function getDeptList (parameter) {
  return axios({
    url: api.deptList,
    method: 'post',
    data: parameter
  })
}

export function getDeptInfo (parameter) {
  return axios({
    url: api.deptInfo + parameter,
    method: 'get'
  })
}

export function editDeptInfo (parameter) {
  return axios({
    url: api.deptEdit,
    method: 'post',
    data: parameter
  })
}

export function deleteDeptInfo (parameter) {
  return axios({
    url: api.deptInfo + parameter,
    method: 'delete'
  })
}

export function getJobList (parameter) {
  return axios({
    url: api.jobList,
    method: 'post',
    data: parameter
  })
}

export function getJobInfo (parameter) {
  return axios({
    url: api.jobInfo + parameter,
    method: 'get'
  })
}

export function editJobInfo (parameter) {
  return axios({
    url: api.jobEdit,
    method: 'post',
    data: parameter
  })
}

export function deleteJobInfo (parameter) {
  return axios({
    url: api.jobInfo + parameter,
    method: 'delete'
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService (parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}
