//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    key:'',
    cancel:true
  },
  bindKeyInput: function (e) {
    this.setData({
      key: e.detail.value
    })
    wx.navigateTo({
      url: `../result/result?key=${this.data.key}`,
    })
  },
  clearInput() {
    this.setData({
        value: '',
        focus: true,
        result: []
    })
    this.triggerEvent('clear')
},
inputFocus(e) {
    this.setData({
        searchState: true
    })
    this.triggerEvent('focus', e.detail)
},
inputBlur(e) {
    this.setData({
        searchState: false
    })
    this.triggerEvent('blur', e.detail)
},
showInput() {
    this.setData({
        focus: true,
        searchState: true
    })
},
hideInput() {
    this.setData({
        searchState: false
    })
    this.triggerEvent('cancel')
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
