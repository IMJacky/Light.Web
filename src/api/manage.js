import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  menuList: '/MenuEntity/page',
  menuInfo: '/MenuEntity/',
  menuEdit: '/MenuEntity/edit',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
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
