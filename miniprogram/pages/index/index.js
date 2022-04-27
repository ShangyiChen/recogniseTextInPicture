// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
var app = getApp()
var n = function(t) {
  return t && t.__esModule ? t : {
    default: t
  }
}
Page({
  data: {
    actionSheetHidden: 1,
    tips: 0,
    type: 1,
    count: 0,
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },


  /**
   * 
   */
  selectType(e) {
    var type = e.currentTarget.dataset.type
    this.setData({
      type: type,
      actionSheetHidden: !this.data.actionSheetHidden
    })
    app.globalData.type = type
  },
  listenerActionSheet() {
    this.setData({
      actionSheetHidden:!this.data.actionSheetHidden
    })
  },
  buildObj: function(t) {
    var e = {}
    return e.filePath = t, e.state = 0, e.msg = "", e;
  },
  imgBtnTap(t) {
    var that = this, source = t.currentTarget.dataset.source, formId = t.detail.formId
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })

    "weixin" != source ? wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: [ "compressed" ],
      sourceType: ["album"],
      success: function(t) {
        for (var a = t.tempFiles, n = 0; n < a.length; n++) {
          var i = that.buildObj(a[n].tempFilePath);
          app.globalData.imgs.push(i)
        }
        that.setData({
          count: app.globalData.imgs.length
        })
        wx.navigateTo({
          url: "../selectMore/select"
        })
      }
    }) : wx.chooseMessageFile({
      count: 1,
      type : "image",
      success: function(t) {
        for (var a = t.tempFiles, n = 0; n < a.length; n++) {
          var i = that.buildObj(a[n].path)
          app.globalData.imgs.push(i)
        }
        that.setData({
          count: app.globalData.imgs.length
        })
        wx.navigateTo({
          url: "../selectMore/select"
        })
      }
    })
    
  },

  imgBtnTapCamera() {
    var that = this
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: [ "compressed" ],
      sourceType: ["camera"],
      success: function(t) {
        for (var a = t.tempFiles, n = 0; n < a.length; n++) {
          var i = that.buildObj(a[n].tempFilePath);
          app.globalData.imgs.push(i)
        }
        that.setData({
          count: app.globalData.imgs.length
        })
        wx.navigateTo({
          url: "../selectMore/select"
        })
      }
    }) 
  },
  toRecord() {
    wx.navigateTo({
      url: '../../pages/record/record',
    })
  },
  toPC() {
    this.onShareAppMessage()
  },
  onShareAppMessage: function() {
    return {
        title: "识字全能王电脑版",
        path: "/pages/index/index",
        imageUrl: "/images/home/bg.png",
        success: function(t) {},
        fail: function(t) {}
    };
}
});
