var postsData = require("../data/posts_datalist.js");//require调取也是相对路径
var app = getApp();
/**postData这是一个对象 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.postid;
    this.data.currentCollection = postid;
    var dataList = postsData.postList[postid];

    /* console.log(dataList) */
    this.setData({
      dataDetail: dataList
    })
    var newsCollection = wx.getStorageSync('newsCollection');/*define newsCollecteion。get newsCollection我们会认为newsCOllection是个空值*/
    if (newsCollection) {
      var newCollection = newsCollection[postid];
      this.setData({
        collected: newCollection
      })
    }
    else {
      newsCollection = {};/*这里的空值其实已经定义了newsCollected全是false*/
      newsCollection[postid] = 'false';
      wx.setStorageSync('newsCollection', newsCollection)
    }
    //console.log(app.globalData.is_globalData) 
    if (app.globalData.is_globalData && app.globalData.is_globalCurrentPostId==postid)
    this.setData({
      isPlayingMusic:true
    });
    else{
    this.setData({
      isPlayingMusic: false
    })
    } 
    this.setMusicListen();
   
  },
  setMusicListen: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      app.globalData.is_globalData=true
      app.globalData.is_globalCurrentPostId = that.data.currentCollection
      that.setData({
        isPlayingMusic: true
      })
    });
    wx.onBackgroundAudioPause(function () {
      app.globalData.is_globalData=false
      app.globalData.is_globalCurrentPostId = null
      that.setData({
        isPlayingMusic: false
      })
    })
  },
  onCovertTap: function (event) {
    var newsCollection = wx.getStorageSync('newsCollection');
    var newCollection = newsCollection[this.data.currentCollection];
    //console.log(newCollection); 
    newCollection = !newCollection;
    newsCollection[this.data.currentCollection] = newCollection;
    this.showModal(newsCollection, newCollection);
    /* wx.showToast({
      title: newCollection?"新闻收藏成功":"新闻收藏失败",
      icon: newCollection?"success" :"loading",
      duration:1000,
    }) */

  },
  showModal: function (newsCollection, newCollection) {
    var that = this;
    wx.showModal({
      title: '我的收藏夹',
      content: newCollection ? "从我的收藏夹里添加这边新闻" : "从我的收藏夹里删除这边新闻",
      cancelText: "取消",
      cancelColor: "#000000",
      confirmText: "确认",
      confirmColor: "#3CC51F",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('newsCollection', newsCollection);
          that.setData({
            collected: newCollection
            //collected: newsCollection[that.data.currentCollection]
          })
        }
      }
    })
  },
  onSahreTap: function (event) {
    var itemarray = [
      "分享到微信",
      "分享到微博",
      "分享到人人网"
    ]
    wx.showActionSheet({
      itemList: itemarray,

      success: function (res) {
        if (res.cancel);
        else {
          wx.showToast({
            title: '该篇文章' + itemarray[res.tapIndex],
            duration: 2000
          })
        }
      }
    })
  },
  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    //var isPlayingMusic = this.data.isPlayingMusic;//isPlayingMusic是局部变量，data里的数是this.data.isPlayingMusic.两者不是同一个类型的变量，有所差别
    var postData = postsData.postList[this.data.currentCollection]
    if (isPlayingMusic)//if isPlayingMusic is true 
    {
      wx.pauseBackgroundAudio();
      app.globalData.is_globalData=false;
      this.setData({
        isPlayingMusic: false//true music stop
      })
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      app.globalData.is_globalData=true;
      this.setData({
        isPlayingMusic: true//false music action
      })

    }

    /*  else{
       wx.pauseBackgroundAudio();
       isPlayingMusic = !isPlayingMusic; 
     } */
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