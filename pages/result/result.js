Page({
  data:{
    // 关键词
		key: '',
    //高亮搜索词列表
    keyLists: [],
    // 获取的数据列表
    dataList:[],
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

  getListByKey:function(key){
    this.setData({key:key})
    var that = this
    wx.request({
      url: `https://hscode.vip/api/search?keyword=${key}`,
      method:'POST',
      success(res){
        if(res.data.code != 200){
          wx.showToast({
            title: res.data.data,
            icon: 'error'
          })
        }else{
          wx.showToast({
            title: '查询成功',
            icon: 'success'
          })
          that.setData({dataList:res.data.data.list})
          that.searchQuestion()
        }
      },
      fail(res){
        wx.showToast({
          title: '查询失败',
          icon: 'error'
        })
      }
    })
  },

  //搜索词高亮
  searchQuestion() {
    //将商品名称每一个字拆分成一个数组，数组中包含该字str以及是否符合搜索词而显示条件show
    let find_word = function(key,word){
      let t = []
      //遍历每个字看是否匹配
      // key:手机充电线 word:手机充电器墙充
      word.forEach(item =>{
        let i = key.indexOf(item)
        //如果匹配
        if(i > -1){
          t.push({
            show: true,
            str: item,
          });
          return t;
        }
        //如果不匹配
        return t.push({
          show: false,
          str: item,
        })
      }
      )
      return t
    };
    
      let searched = [];
      let inputs = this.data.key;
      for (let i = 0; i < this.data.dataList.length; i++) {
        var current_word = this.data.dataList[i].product_name;
      //将字符串转为数组才能使用forEach
      current_word = current_word.split("")
        searched.push(find_word(inputs, current_word))
      }
      this.setData({keyLists:searched})
    },

  // 跳转详情
  goDetail:function(e){
      wx.navigateTo({
        url: `../detail/detail?hscode=${e.currentTarget.dataset.hscode}&title=${e.currentTarget.dataset.title}&example=${e.currentTarget.dataset.example}`,
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

  onLoad:function(option){
    this.getListByKey(option.key)
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