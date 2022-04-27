// pages/record/record.js
const Utils = require("../../utils/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    img: '',
    text: '',
    record_list:[],
    record_max_len : 10
    
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
    const key = 'PARSE_RECORD'
    console.log('获取记录')
     Utils.getStorage(key, [])
      .then(res => {
        console.log(res)
        res.data.forEach(item => {
          const date = new Date(item.created_time)
          item.tag = item.type === '3' ? '表格':'文字',
          item.created_time = Utils.dateFormat(date, 'YYYY-MM-DD HH:mm:ss');
        });
        this.setData({
          record_list: res.data
        })
        
      })
      .catch(err => {
        console.log(err)
      })
  
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

  /**
   * 打开记录详情
   */
  showRecordDetailAction: function(res) {
    const { index } = res.currentTarget.dataset;
    const record = this.data.record_list[index] || {}
    console.log(record)
    const type = record.type
    if ('3' === type) {
      wx.navigateTo({
        url: '../detail/detail?type='+type+'&text='+JSON.stringify(record.jsonData)+'&imgUrl='+record.imgUrl,
      })
    } else {
      wx.navigateTo({
        url: '../detail/detail?type='+type+'&text='+record.jsonData+'&imgUrl='+record.imgUrl,
      })
    }
  },

  /**
   * 返回
   */
  goBackAction: function(res) {
    wx.navigateBack()
  }
})