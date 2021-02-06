// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hscode:'', //hscode编码
    title:'', //商品名称
    example:'', //申报样例
    goodList:[], //商品详情列表
    elementList: [], //申报要素列表
    codeName: [],//监管条件名称列表
    codeDetail: [],//监管条件详情列表
    ciqName: [],//检疫条件名称列表
    ciqDetail: [],//检疫条件详情列表
    // 提示信息
    msg:'',
    // 提示类型
    type:'',
    // 提示是否显示
    show:false,
    // 返回顶部
    top:0,
    // 返回顶部是否显示
    goTopVisiable:false,
    scrollHeight:0
  },

  // 返回顶部
  goTop(){
    this.setData({top:0})
  },

  // 滚动距离
  scrollDistance(e){
    if(e.detail.scrollTop > 100){
      this.setData({goTopVisiable:true})
    }else{
      this.setData({goTopVisiable:false})
    }
  },

  //生成申报要素列表
  getElementList() {
    let element = ''
    this.data.goodList.forEach(item => {
      return element = item.element_require
    })
    if (element !== null) {
      const list = element.split(";")
      var newList = []
      list.forEach(item => {
        if (item !== '') {
          let Index = item.indexOf(':')
          newList.push(item.slice(Index + 1))
        }
      })
      return this.setData({elementList : newList})
    }
  },

  //处理监管与检疫条件列表
  codeList() {
    //处理监管条件
    var codeLists = []
    this.data.goodList.forEach(item => {
      return codeLists = item.regulatory_code_name
    })
    let newCodeName = []
    let newCodeDetail = []
    if (codeLists !== null) {
      codeLists.forEach(item => {
        let name = item.split(':')
        newCodeName.push(name[0])
        newCodeDetail.push(name[1])
      })
      this.setData({codeName:newCodeName,codeDetail:newCodeDetail})
    }
  },

  ciqList() {
    //处理检疫条件
    var ciqLists = []
    this.data.goodList.forEach(item => {
      return ciqLists = item.ciq_code_name
    })
    let newCiqName = []
    let newCiqDetail = []
    if (ciqLists !== null) {
      ciqLists.forEach(item => {
        let name = item.split(':')
        newCiqName.push(name[0])
        newCiqDetail.push(name[1])
      })
      this.setData({ciqName:newCiqName,ciqDetail:newCiqDetail})
    }
  },

  //税率单位换算
  changeNumber() {
      this.setData({'goodList[0].ordinary':(this.data.goodList[0].ordinary * 100).toFixed(0) + '%',
      'goodList[0].most_discount':(this.data.goodList[0].most_discount * 100).toFixed(0) + '%',
      'goodList[0].export_rate':(this.data.goodList[0].export_rate * 100).toFixed(0) + '%',
      'goodList[0].add_tax_rate':(this.data.goodList[0].add_tax_rate * 100).toFixed(0) + '%',
      'goodList[0].customs_rate':(this.data.goodList[0].customs_rate * 100).toFixed(0) + '%'})
  },

  // 获取商品详情列表
  getGoodList(){
    let that = this
    wx.request({
      url: `https://hscode.vip/api/hscode?hscode=${that.data.hscode}`,
      method:'POST',
      success(res){
        let newData = []
        newData.push(res.data.data.info)
        that.setData({goodList:newData})
        that.codeList()
        that.ciqList()
        that.getElementList(that.data.goodList)
        that.changeNumber()
        wx.showToast({
          title: '获取详情成功',
          icon: 'success'
        })
      },
      fail(res){
        wx.showToast({
          title: '获取详情失败',
          icon: 'error'
        })
      }
    })
  },

  copy(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.content
      // success (res) {
      //   wx.getClipboardData({
      //     success (res) {
      //       console.log(res.data)
      //     }
      //   })
      // }
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({hscode:options.hscode,title:options.title,example:options.example})
    this.getGoodList()
    var that = this; 
    wx.getSystemInfo({ 
    success: function (res) {
    that.setData({ 
    scrollHeight: res.windowHeight 
    }); 
    } 
    });
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

  }
})