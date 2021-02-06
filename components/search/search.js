Page({
  data: {
    value:'',
    // cancel:true
  },
  
  bindKeyInput(e) {
    let inputValue = e.detail.value.trim()
    if( inputValue == ''){
      wx.showToast({
        title: '请输入查询内容',
        icon: 'error'
      })
      this.setData({
        value: ''
      })
    }else{
      this.setData({
        value: inputValue
      })
        wx.navigateTo({
          url: `../result/result?key=${inputValue}`,
      })
    }
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
  if(e.detail.value.trim() == ''){
    this.setData({
      searchState: false
  })
  this.triggerEvent('blur', e.detail)
  }
},
showInput() {
    this.setData({
        focus: true,
        searchState: true
    })
},
hideInput() {
    this.setData({
        searchState: true
    })
    // this.triggerEvent('cancel')
    wx.navigateTo({
      url: `../result/result?key=${this.data.value}`,
    })
}
})