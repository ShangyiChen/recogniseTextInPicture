module.exports = {
  /**
   * 获取本地缓存数据
   * @param {*} key key
   * @param {*} default_value 获取不到时返回的默认值
   */
  getStorage: function (key, default_value) {
    const promise = new Promise((resolve, reject) => {
      wx.getStorage({
        key,
        success(res) {
          resolve(res)
        },
        fail(err) {
          if (err.errMsg.includes('getStorage:fail')) {
            resolve({ data: default_value, errMsg: 'getStorage:ok' })
          } else {
            reject(err)
          }
        },
      })
    })
    return promise
  },

  /**
   * 本地缓存数据
   * @param {*} key key
   * @param {*} data data
   */
  setStorage: function (key, data) {
    const promise = new Promise((resolve, reject) => {
      wx.setStorage({
        key,
        data,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        },
      })
    })
    return promise
  },

  /**
   * 日期时间格式化
   * @param {*} date date
   * @param {*} fmt fmt YYYY-MM-DD HH:mm:ss
   */
  dateFormat: function (date, fmt) {
    let ret
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'M+': (date.getMonth() + 1).toString(), // 月
      'D+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'm+': date.getMinutes().toString(), // 分
      's+': date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt)
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
        )
      }
    }
    return fmt
  },

  /**
   * 获取指定日期对象的时间戳
   * @param {Date} date date
   */
  getTimestamp(date) {
    date = date || new Date()
    return date.valueOf()
  },

  /**
   * 清理数组
   * @param {*} actual actual
   */
  cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
  },

  /**
   * 转换成 querystring
   * @param {*} json json
   */
  toQueryString(json) {
    if (!json) return ''
    return this.cleanArray(
      Object.keys(json).map((key) => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      })
    ).join('&')
  },

  /**
   * 微信授权
   */
  authorize: function (scope) {
    const promise = new Promise((resolve, reject) => {
      wx.authorize({
        scope,
        success: function (result) {
          resolve(result)
        },
        fail: function (error) {
          reject(error)
        },
      })
    })
    return promise
  },

  /**
   * 获取图片的 base64 值
   * @param {*} tempFilePath tempFilePath
   */
  getImageBase64: function (tempFilePath) {
    const promise = new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath: tempFilePath,
        encoding: 'base64',
        success(data) {
          resolve(data)
        },
        fail(err) {
          reject(err)
        },
      })
    })
    return promise
  },

  /**
   * 发起 HTTPS 网络请求
   * @param {*} options options
   */
  request: function (options) {
    const promise = new Promise((resolve, reject) => {
      options.success = (res) => {
        resolve(res)
      }
      options.fail = (err) => {
        reject(err)
      }
      wx.request(options)
    })
    return promise
  },
}
