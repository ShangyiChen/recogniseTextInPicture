// pages/selectMore/select.js
const Utils = require("../../utils/index")

function t(t, a, s) {
  return a in t ? Object.defineProperty(t, a, {
    value: s,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = s, t;
}
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data:{
      imgCount: 0,
      showadd: 0,
      imgs:[],
      maxCnt: 1,
      version: 1,
      systemInfo: {},
      state: 0,
      actionSheetHidden: !0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var a = app.globalData.imgs
    console.log("a:",a)
    this.setData({
      imgs: a,
      imgCount: a.length
    }),
    this.getVersion()
  },
  goHome: function() {
    this.setData({
      imgs:[],
      imgCount: 0,
    })
    wx.navigateTo({
      url: '../../pages/index/index',
    })
  },
  getVersion: function() {
    var t = wx.getStorageSync('version')
    this.setData({
      version: t ? 0 : 1
    })
  },

  updateVersion: function() {
    wx.setStorageSync('version', 1)
    this.setData({
      version: 0
    })
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
   (app.globalData.imgs = [])
    console.log("onUnload")
    console.log("global_imgs:",app.globalData.imgs)
    console.log("imgs:", this.data.imgs)
  },
  addImg: function(t) {
    
    console.log("global_imgs:",app.globalData.imgs)
    console.log("imgs:", this.data.imgs)


    if(this.data.imgCount >= 1) {
      wx.showToast({
        title: "只能选择一张图片",
        icon: "success",
        duration: 1000,
        mask: !0
      })
      return
    }
    if (this.data.state == 2 || this.data.state == 1) {
      this.setData({
        state: 0
      })
    }
    this.updateVersion()

    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
   
    
  },

  buildObj: function(t) {
    var e = {}
    return e.filePath = t, e.state = 0, e.msg = "", e;
  },

  imgBtnTap: function(t) {
    var source = t.currentTarget.dataset.source
    var that = this
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })

    if ("weixin" === source) {
      wx.chooseMessageFile({
        count: 1,
        type: "image",
        sizeType: ['compressed'],
        success: function(res) {
          for (var a = res.tempFiles, n = 0; n < a.length; n++) {
            var i = that.buildObj(a[n].path)
            app.globalData.imgs.push(i)
          }
          that.setData({
            imgs: app.globalData.imgs,
            imgCount: app.globalData.imgs.length
          })
        }
      })
    } else if ("camera" === source) {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: function(res) {
          for (var a = res.tempFiles, n = 0; n < a.length; n++) {
            var i = that.buildObj(a[n].tempFilePath)
            app.globalData.imgs.push(i)
          }
          that.setData({
            imgs: app.globalData.imgs,
            imgCount: app.globalData.imgs.length
          })
        }
      })
    } else {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: function(res) {
          for (var a = res.tempFiles, n = 0; n < a.length; n++) {
            var i = that.buildObj(a[n].tempFilePath)
            app.globalData.imgs.push(i)
          }
          that.setData({
            imgs: app.globalData.imgs,
            imgCount: app.globalData.imgs.length
          })
        }
      })
    }
    this.setData({
      showadd: !this.data.showadd
    })
  },

  clipImage: function(e) {
    var a = e.currentTarget.dataset.idx, s = this.data.imgs[a].filePath;
    wx.navigateTo({
      url: '../../pages/croper/croper?idx=' + a + "&pg=1&tempFilePath=" + s,
    })
  },

  delete: function(t) {
    var a = t.currentTarget.dataset.idx
    app.globalData.imgs.splice(a, 1)
    var s = app.globalData.imgs
    this.setData({
      imgs: s,
      imgCount: s.length
    })
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
  listenerActionSheet: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindsubmit: function() {
    var that = this
    console.log("dddddddd")
    // wx.navigateTo({
    //   url: '../../pages/detail/detail?text='+"清明时节雨纷纷,路上行人欲断魂" +"\n"+"借问酒家何处有",
    // })
    this.data.imgs[0].state = 1
    that.setData({
      state: 1,
      imgs: this.data.imgs
    })
  
    console.log("imgs:",this.data.imgs)
    var type = app.globalData.type
    wx.uploadFile({
      filePath: that.data.imgs[0].filePath,
      name: 'file',
      url: 'http://localhost:8888/test/testocr',
      formData: {
        type: type,
        appkey: appkey
      },
      success: function(res) {
        
        console.log("res：",res)
       var json = res.data;
       if (res.data.data === undefined) {
         json = JSON.parse(res.data)
       }
       
       console.log("json：",json)
       console.log("globaltype:",app.globalData.type)
       console.log("T/F:", "1" === app.globalData.type)
      
         console.log("type:" , type);
         console.log("json.data:",json.data)

         if (res.data.code !== 200 && json.code !== 200) {
           console.log("服务器失败重试")
           wx.showModal({
             cancelColor: 'cancelColor',
             title:'解析失败',
             content: json.data,
             success: function(res) {
               if (res.confirm) {
                 console.log("用户点击确认")
               } else {
                  console.log('用户点击取消')
               }
             }
           })
           that.setData({
             state: 0
           })
           return
         }
         that.data.imgs[0].state = 2
        that.setData({
          imgs: that.data.imgs,
          state: 2
        })
         const jsonData = json.data
         const imgUrl = app.globalData.imgs[0].filePath
         const record = { type, jsonData, imgUrl}
         that.saveParseRecord(record)
         if ('3' === app.globalData.type) {
           console.log("跳转表格")
          wx.navigateTo({
            url: '../../pages/detail/detail?type='+type+'&text='+JSON.stringify(json.data),
          })
         } else {
          wx.navigateTo({
            url: '../../pages/detail/detail?type='+type+'&text='+(json.data),
          })
         }
        
       
      },
      fail: function(res) {
        
      }
    })
  
  },
  /**
   * 本地缓存解析结果
   */
  saveParseRecord: function(record) {

    console.log("开始储存")
    const key = 'PARSE_RECORD'
    const max_len = 10
    record.created_time = new Date()
    Utils.getStorage(key, [])
      .then(res => {
        const record_list = res.data || []
        if (record_list.length >= max_len) record_list.shift()
        record_list.push(record)
        return Utils.setStorage(key, record_list)
      })
  }
})