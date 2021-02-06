//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    key:'',
    scrollHeight:0
  },

getClassify:function(){
  wx.request({
    url: 'https://hscode.vip/api/hscode/getAllHscodeClassify',
    method: 'POST',
    success (res) {
      console.log(res.data)
    },
    fail(res){
      console.log(res.data)
    }
  })
},

gohome:function(){
  wx.navigateBack({
    delta: 2,
  })
},

// 用户点击右上角分享给好友,要先在分享好友这里设置menus的两个参数,才可以分享朋友圈
onShareAppMessage: function (res) {
  wx.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
},
//用户点击右上角分享朋友圈
onShareTimeline: function () {
  // return {
  //     title: '',
  //     query: {
  //       key: value
  //     },
  //     imageUrl: ''
  //   }
},

  onLoad: function () {
    // this.getClassify()
    var that = this; 
    wx.getSystemInfo({ 
    success: function (res) {
    that.setData({ 
    scrollHeight: res.windowHeight 
    }); 
    } 
    });
  }
})
