/**
 * http方法
 * @author  Markey
 * @date    2018-03-15
 */

/**
 * ajax方法
 * @param  {Object}  opt     [请求配置对象，参数如下]
 *         {String}  url     [请求url]
 *         {Object}  headers [请求头]
 *         {String}  method          [请求方法]
 *         {Object}  data            [请求参数]
 *         {String}  dataType        [请求数据类型]
 * @return {Promise}
 */
function ajax({
  url,
  headers = {},
  method = 'GET',
  data = {},
  dataType = 'json'
}) {
  // 构造请求体
  const request = {
    url,
    method,
    // set some global headers
    header: Object.assign({
    }, headers),
    data: Object.assign({
      // set some global data
    }, data),
    dataType
  }
  // 若未传url则直接退出
  if (!url) {
    console.error('[Error http]: ajax missing arguments!')
    return
  }
  // 增强体验：加载中
  wx.showNavigationBarLoading()
  // debug
  console.table(request)

  return new Promise((resolve, reject) => {
    // 只返回业务code、data、message
    request.success = ({ data: { code, data, message }, header }) => {
      wx.hideNavigationBarLoading()
      // 若业务code不正常
      if (+code !== 0) {
        reject({ code, message })
      }
      resolve({ data, code, message, header })
    }
    request.fail = ({ data, statusCode: code, header }) => {
      wx.hideNavigationBarLoading()
      reject({ data, code, header })
    }
    // 发起请求
    wx.request(request)
  })
}

/**
 * get ajax方法，参数同ajax
 */
function get({
  url,
  headers = {},
  data = {},
  dataType = 'json'
}) {
  return ajax({
    url,
    headers,
    method: 'GET',
    data,
    dataType
  })
}

/**
 * post ajax方法，参数同ajax
 */
function post({
  url,
  headers = {},
  data = {},
  dataType = 'json'
}) {
  return ajax({
    url,
    headers,
    method: 'POST',
    data,
    dataType
  })
}

export {
  ajax,
  get,
  post
}

