// pages/detail/detail.js
var app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    image: "",
    text: "",
    showEditArea: !0,
    email: "",
    isText: false,
    isFile: false,
    file_url: ''
  },
  addMail: function(t) {
    this.setData({
      email: t.detail.value
    })
  },
  copyAll: function() {
    wx.setClipboardData({
      data: this.data.text,
      success: function(t) {
        wx.getClipboardData({
          success: (option) => {
            wx.showToast({
              title: '复制成功',
            })
          },
        })
      }
    })
  },
  copyLink: function() {
    wx.setClipboardData({
      data: this.data.file_url,
      success: function(t) {
        wx.getClipboardData({
          success: (option) => {
            wx.showToast({
              title: '文件下载链接复制成功',
            })
          },
        })
      }
    })
  },
  clickMenuSwitch: function() {
    var t = this
    t.setData({
      showEditArea: !t.data.showEditArea
    })
  },
  goBack: function() {
    wx.reLaunch({
      url: '../../pages/selectMore/select',
    })
  },
  openFile: function() {
    wx.downloadFile({
      url: this.data.file_url,
      success(res) {
        if (res.statusCode === 200) {
          wx.openDocument({
            filePath: res.tempFilePath,
          })
        } else if (res.statusCode === 404) {
          console.log("资源不存在")
          wx.showModal({
            title: '文件打开失败',
            content: '文件下载链接已失效，请重新上传图片识别'
          })
        }
      },
      fail(err) {
        console.log("err:",err)
          wx.showModal({
            title: '文件打开失败',
            content: '文件下载链接已失效，请重新上传图片识别'
          })
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   
    var type = options.type
    var url = options.imgUrl
    if(url === undefined) {
      url =  app.globalData.imgs[0].filePath
    }
    
    if (type === '3') {
      console.log("type2:",type)
      console.log("text:",options.text)
       let json = JSON.parse(options.text)
      console.log("jsonText:",json)
      this.setData({
        isFile: true,
        file_url: json.downLoadUri,
        text: json.filename,
        image: url
      })
    } else {
      this.setData({
        isText: true,
        text: options.text,
        image: url
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})