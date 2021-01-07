//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    key:''
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

  onLoad: function () {
    // this.getClassify()
  }
})
