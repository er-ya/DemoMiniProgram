//app.js
App({
  //生命周期函数
  //小程序初始化完成时，会执行的生命周期函数
  onLaunch: function () {
    //异步调用
    wx.getSetting({
      complete: (res) => {
        // console.log(res)
      },
    })
  },
  //小程序界面显示出来之后会执行的生命周期函数
  onShow:function (options) {
    console.log('界面显示出来：onshow')
  },
  //界面被隐藏时会执行,小程序从前台切换到后台时
  onHide: function () {

  },
  //当小程序发生脚本错误，或者api调用失败时，会触发onError并带上错误信息
  onError: function (msg) {

  }
})
