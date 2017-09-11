Page({
  onTap: function (event) {
    //跳转到另一个页面的方法
    //navigateTo方法和redirectTo方法
    wx.navigateTo({
      url: "../posts/post"
    })
  }
})