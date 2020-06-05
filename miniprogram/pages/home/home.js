// pages/home/home.js
Page({
  handleGetUserInfo (event) {
    console.log(event)
  },
  handleTabClick(event) {
    console.log(event)
  },

 onLoad: function (options) {
  //post请求，并且携带参数
  wx.request({
    url: 'http://httpbin.org/post',
    method: 'post',
    data: {
      name: 'why',
      age: 18,
    },
    success: function(res) {
      console.log(res)
    }
  })
 }
})