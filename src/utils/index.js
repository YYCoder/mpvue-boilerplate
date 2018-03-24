/**
 * 公用方法集合
 * @author  Markey
 * @date    2018-03-15
 */
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
/**
 * 格式化时间
 * @param  {Date}    date    [日期对象]
 * @return {String}          [格式化时间，如'2018-1-3 18:00']
 */
function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
/**
 * 是否存在指定自有属性
 * @param  {Object}  obj [要检查的对象]
 * @param  {String}  key [属性名]
 * @return {Boolean}
 */
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
/**
 * 模拟ES6 find方法
 * @param  {Array}    arr  [要查找的数组]
 * @param  {Function} fun  [回调函数]
 * @return {Array}         [总会返回数组，未找到则返回空数组]
 */
function find(arr, fun) {
  if (Array.isArray(arr) && typeof fun === 'function') {
    let res = []
    arr.forEach((ele, index, array) => {
      fun(ele, index, array) && res.push(ele)
    })
    return res
  } else {
    console.error('[Error base]: find missing arguments!')
  }
}
/**
 * 判断参数是否为Object对象
 * @param  {any}      obj  [要判断的对象]
 * @return {Boolean}
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj).indexOf('Object]') !== -1
}
/**
 * 深度克隆对象
 * @param  {Object || Array} obj
 * @return
 */
function deepClone(obj) {
  let res
  if (typeof obj !== 'object' || obj === null) {
    return obj
  } else if (obj instanceof Array) {
    res = []
    for (let i = 0; i < obj.length; i++) {
      typeof obj[i] === 'object'
        ? (res[i] = deepClone(obj[i]))
        : (res[i] = obj[i])
    }
  } else {
    res = {}
    for (let k in obj) {
      typeof obj[k] === 'object'
        ? (res[k] = deepClone(obj[k]))
        : (res[k] = obj[k])
    }
  }
  return res
}
/**
 * [是否为国内手机号]
 * @param  {String || Number}  str  [要检查的字符串]
 * @return {Boolean}
 */
function isPhone(str) {
  return /^1\d{10}$/.test(str)
}
/**
 * 是否为座机电话
 * @param  {String || Number}  str  [要检查的字符串]
 * @return {Boolean}
 */
function isLandline(str) {
  return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(str)
}
/**
 * 调用微信showModal封装方法
 * @param  {Object || String}   opt     [若为对象则认为是showModal的配置对象，字符串则认为是标题]
 * @param  {String}             content [主体内容]
 */
function alert(opt, content = '') {
  let param = {
    title: '温馨提示',
    confirmText: '确认',
    cancelText: '取消',
    showCancel: true
  }
  if (isObject(opt)) {
    param = opt
  }
  else if (typeof opt === 'string') {
    param.title = opt
    content && (param.content = content)
  }
  else {
    console.error('[Error base]: invalid alert arguments!')
  }
  wx.showModal(Object.assign({
    mask: true
  }, param))
}
/**
 * 调用微信showToast封装方法
 * @param  {Object || String}   opt  [若为对象则认为是showToast的配置对象，字符串则认为是标题]
 * @param  {String}             icon [icon类型：success/loading/none，默认为success]
 */
function toast(opt, icon = 'none') {
  let param = {}
  if (isObject(opt)) {
    param = opt
  } else if (typeof opt === 'string') {
    param.title = opt
  }
  wx.showToast(Object.assign({
    icon,
    title: param.title,
    duration: 2000,
    mask: true
  }, param))
}
/**
 * 调用微信showLoading封装方法
 * @param  {String || Object} opt [标题或配置对象]
 */
function showLoading(opt) {
  let param = {}
  if (typeof opt === 'string') {
    param.title = opt
  }
  else if (isObject(opt)) {
    param = opt
  }
  wx.showLoading(Object.assign({
    title: '加载中...',
    mask: true
  }, param))
}
/**
 * 关闭微信loading
 */
function hideLoading() {
  wx.hideLoading()
}
/**
 * 设置storage
 * @param {String} key [键名]
 * @param {String} val [值]
 */
function setStorage(key = '', val = '') {
  console.log(`设置storage数据：key=${key}, val=${val}`)
  wx.setStorageSync(key, val)
}
/**
 * 获取storage值
 * @param  {String} key [键名]
 * @return
 */
function getStorage(key = '') {
  const data = wx.getStorageSync(key) || null
  console.log('获取storage数据：', data)
  return data
}
/**
 * 生成唯一id
 * @return {String}
 */
function uuid() {
  let s = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  let uuid = s.join('')
  return uuid
}

export {
  formatTime,
  setStorage,
  getStorage,
  find,
  hasOwn,
  isObject,
  alert,
  showLoading,
  hideLoading,
  toast,
  deepClone,
  isPhone,
  isLandline,
  uuid
}
