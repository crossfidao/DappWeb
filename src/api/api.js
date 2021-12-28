/**
 * TODO API接口对象
 * 发送http请求的接口集合
 */
// json类型的请求
import request from '@/api/request'
// form表单类型的请求
import requestForm from '@/api/requestForm'

const baseURL = ''

// 查询公告列表
export function getGongList() {
  return request({
    baseURL: baseURL,
    url: '/apiNew//business/app/listNotice',
    method: 'get',
  })
}
// 查询公告信息
export function getGongMessage () {
  return request({
    baseURL: baseURL,
    url: '/apiNew/business/app/getCurrent?address=' + (address ? address : '') + '&limit=' + limit + '&chainId=' + chainId,
    method: 'get',
  })
}
// 查询轮播列表
export function getSwiper() {
  return request({
    baseURL: baseURL,
    url: '/apiNew/business/app/listBanner',
    method: 'get',
  })
}
// 查询当前
export function getCurrent(address, limit, chainId) {
  return request({
    baseURL: baseURL,
    url: '/api/business/app/getCurrent?address=' + (address ? address : '') + '&limit=' + limit + '&chainId=' + chainId,
    method: 'get',
  })
}

// 查询上一期
export function getPast(address, limit, current, chainId) {
  return request({
    baseURL: baseURL,
    url: '/api/business/app/getPast?address=' + (address ? address : '') + '&limit=' + limit + '&current=' + current + '&chainId=' + chainId,
    method: 'get',
  })
}

// 查询上一期
export function getPastList(address, limit, chainId) {
  return request({
    baseURL: baseURL,
    url: '/api/business/app/getPastList?address=' + (address ? address : '') + '&limit=' + limit + '&chainId=' + chainId,
    method: 'get',
  })
}

// 查询下一期
export function getNext(address, limit, current, chainId) {
  return request({
    baseURL: baseURL,
    url: '/api/business/app/getNext?address=' + (address ? address : '') + '&limit=' + limit + '&current=' + current + '&chainId=' + chainId,
    method: 'get',
  })
}

// 查询预期
export function getFuture(address, limit, current, chainId) {
  return request({
    baseURL: baseURL,
    url: '/api/business/app/getFuture?address=' + (address ? address : '') + '&limit=' + limit + '&current=' + current + '&chainId=' + chainId,
    method: 'get',
  })
}

// 参与兑换
export function join(data) {
  return requestForm({
    baseURL: baseURL,
    url: '/api/business/app/参与兑换',
    method: 'post',
    data,
  })
}

// 提取
export function withdraw(data) {
  return requestForm({
    baseURL: baseURL,
    url: '/api/business/app/withdraw',
    method: 'post',
    data,
  })
}

// 日志
export function logSuccess(address, title, content) {
  let data = {}
  data.state = true
  data.address = address ? address : ''
  data.title = title
  data.cont = content
  return requestForm({
    baseURL: baseURL,
    url: '/api/business/app/log',
    method: 'post',
    data,
  })
}

export function logError(address, title, content, err) {
  let data = {}
  data.state = false
  data.address = address ? address : ''
  data.title = title
  if (Object.prototype.toString.call(err) === '[object Object]') {
    err = JSON.stringify(err)
  }
  data.cont = content + '----' + (err.length > 1900 ? err.substr(0, 1900) : err)
  return requestForm({
    baseURL: baseURL,
    url: '/api/business/app/log',
    method: 'post',
    data,
  })
}
