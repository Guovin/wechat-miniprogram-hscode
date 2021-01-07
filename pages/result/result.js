Page({
  data:{
    // 获取的数据列表
    dataList:[],
    // 提示信息
    msg:'',
    // 提示类型
    type:'',
    // 提示是否显示
    show:false
  },
  getListByKey:function(key){
    var that = this
    wx.request({
      url: `https://hscode.vip/api/search?keyword=${key}`,
      method:'POST',
      success(res){
        console.log(res.data)
        that.setData({type:'success',msg:'查询成功',show:true,dataList:res.data.data.list})
        console.log(that.data.dataList)
      },
      fail(res){
        console.log(res.data)
        that.setData({type:'error',msg:'查询失败',show:true})
      }
    })
  },
  onLoad:function(option){
    this.getListByKey(option.key)
  }
})