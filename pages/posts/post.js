var postsData = require("../data/posts_datalist.js")

Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
  },
  onLoad: function (event) {
    // this.data.postList = postsData.postList
    var Visible = false;
    wx.setStorageSync('Visible', Visible)
    this.setData({
      postList: postsData.postList
    });//从js传递数值给xml
  },
  onNewTap: function (event) {
    var postid = event.currentTarget.dataset.postid;
    this.data.currentPostId = postid
    //从xml中获取属性
    // console.log(postId);
    wx.navigateTo({
      url: '/pages/news/news?postid=' + postid,
    })
  },
  onSwiperTap: function (event) {
    //catchtap非冒泡事件，bindtap冒泡事件
    //currentTarget只能响应点击的组件,target则可以响应的是事件所在的组件，可以点击事件发生下的子组件，仍然可以发生响应
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: '/pages/news/news?postid=' + postId,
    })
  },
  onViewImageTap: function (event) {
    var Visible = wx.getStorageSync('Visible')
    if (Visible) {
      var onViewVaule = wx.getStorageSync('onViewVaule')
      onViewVaule += 1;
      wx.setStorageSync('onViewVaule', onViewVaule)
    }
    else {
      var view = event.currentTarget.dataset.view;
      this.data.view=view
      view += 1;
      wx.setStorageSync('onViewVaule', view)
      Visible = true
      wx.setStorageSync('Visible', Visible)
    }

  },
  onShow: function () {
    var onViewVaule = wx.getStorageSync('onViewVaule')
    console.log(onViewVaule)
    var Visible = wx.getStorageSync('Visible')
    console.log(Visible)
    if (Visible) {
      this.setData({
        onViewVaule: onViewVaule
      })
    }
    else{
      this.setData({
        onViewVaule:this.data.view
      })
    }
  }

})

/*   onSwiperItemTap: function(event){
      var postId = event.currentTarget.dataset.postid;
      wx.navigateTo({
        url: '/pages/news/news?postid=' + postId,
      })
    } */

/* onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is" + postId);
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  } */