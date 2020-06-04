import Vue from 'vue'
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    if (error.response.status === 500 || error.response.status === 404) {
      notification.error({
        message: '系统异常',
        description: '服务器异常，请稍后重试'
      })
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 200) {
    if (res.code === 201) {
      notification.error({
        message: res.msg,
        description: '参数有误，请重新修改：' + res.result
      })
    } else if (res.code === 403) {
      notification.error({
        message: res.msg,
        description: '登录过期，请刷新页面重新登录'
      })
    } else if (res.code === 500) {
      notification.error({
        message: res.msg,
        description: '系统异常，请稍后重试'
      })
    }
    return Promise.reject(new Error(res.msg || 'Error'))
  } else {
    return res
  }
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
