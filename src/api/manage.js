import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',

  userMenuTree: '/auth/userMenuTree',
  passwordReset: '/auth/passwordReset',
  roleMenuTree: '/auth/roleMenuTree',

  menuMapAll: '/MenuEntity/mapAll',
  menuList: '/MenuEntity/page',
  menuListAll: '/MenuEntity/menuList',
  menuInfo: '/MenuEntity/',
  menuEdit: '/MenuEntity/edit',

  userList: '/UserEntity/page',
  userInfo: '/UserEntity/',
  userEdit: '/UserEntity/edit',

  roleListAll: '/RoleEntity/list',
  roleList: '/RoleEntity/page',
  roleInfo: '/RoleEntity/',
  roleEdit: '/RoleEntity/edit',

  roleMenuEdit: '/RoleMenuEntity/edit',

  deptMapAll: '/DeptEntity/mapAll',
  deptCascadeAll: '/DeptEntity/cascadeAll',
  deptList: '/DeptEntity/page',
  deptListAll: '/DeptEntity/deptList',
  deptInfo: '/DeptEntity/',
  deptEdit: '/DeptEntity/edit',

  jobListAll: '/JobEntity/list',
  jobList: '/JobEntity/page',
  jobInfo: '/JobEntity/',
  jobEdit: '/JobEntity/edit',

  logList: '/LogEntity/page',
  workplace: '/workplace/getWorkplace',
  executeSql: '/common/executeSql',

  dictList: '/DictEntity/page',
  dictInfo: '/DictEntity/',
  dictEdit: '/DictEntity/edit',
  dictConfig: '/DictEntity/dictConfig',
  dictConfigSave: '/DictEntity/dictConfigSave',

  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

export function editRoleMenu (parameter) {
  return axios({
    url: api.roleMenuEdit,
    method: 'post',
    data: parameter
  })
}

export function getRoleMenuTree (roleId) {
  return axios({
    url: api.roleMenuTree + '?roleId=' + roleId,
    method: 'get'
  })
}

export function getUserMenuTree () {
  return axios({
    url: api.userMenuTree,
    method: 'get'
  })
}

export function getMenuMapAll () {
  return axios({
    url: api.menuMapAll,
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

export function getMenuListAll (parameter) {
  return axios({
    url: api.menuListAll,
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

export function passwordReset (userId) {
  return axios({
    url: api.passwordReset + '?userId=' + userId,
    method: 'get'
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

export function getDeptMapAll () {
  return axios({
    url: api.deptMapAll,
    method: 'get'
  })
}

export function getDeptCascadeAll () {
  return axios({
    url: api.deptCascadeAll,
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

export function getDeptListAll (parameter) {
  return axios({
    url: api.deptListAll,
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

export function getJobListAll () {
  return axios({
    url: api.jobListAll,
    method: 'get'
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

export function getLogList (parameter) {
  return axios({
    url: api.logList,
    method: 'post',
    data: parameter
  })
}

export function getWorkplace () {
  return axios({
    url: api.workplace,
    method: 'get'
  })
}

export function executeSql (parameter) {
  return axios({
    url: api.executeSql,
    method: 'post',
    data: parameter
  })
}

export function getDictList (parameter) {
  return axios({
    url: api.dictList,
    method: 'post',
    data: parameter
  })
}

export function getDictInfo (parameter) {
  return axios({
    url: api.dictInfo + parameter,
    method: 'get'
  })
}

export function editDictInfo (parameter) {
  return axios({
    url: api.dictEdit,
    method: 'post',
    data: parameter
  })
}

export function deleteDictInfo (parameter) {
  return axios({
    url: api.dictInfo + parameter,
    method: 'delete'
  })
}

export function getDictConfig (parameter) {
  return axios({
    url: api.dictConfig,
    method: 'post',
    data: parameter
  })
}

export function saveDictConfig (parameter) {
  return axios({
    url: api.dictConfigSave,
    method: 'post',
    data: parameter
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
