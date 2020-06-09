// pages/home/home.js
import { 
  getMultiData,getGoodsData 
} from '../../service/home'

const TOP_DISTANCE = '1000'
const types = ['pop','new','sell']

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行','新款','精选'],
    goods: {
      pop: {page:0, list:[]},
      new: {page:0, list:[]},
      sell: {page:0, list:[]}
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },
  onLoad: function (options) {
    //1.请求轮播图以及推荐数据
    this._getMultidata()
    //2.请求商品数据
    this._getGoodsdate('pop')
    this._getGoodsdate('new')
    this._getGoodsdate('sell')
  },
  onShow() {
  },

  // --------------------------网络请求函数-----------------------
  _getMultidata(){
    getMultiData().then(res => {
      //取出轮播图和推荐的数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      //将bannners和recommends放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsdate(type){
    //1.获取页码
    const page = this.data.goods[type].page + 1;
    //2.发送网络请求
    getGoodsData(type,page).then(res => {
      //2.1取出数据
      const list = res.data.data.list;
      //2.2将数据设置到对应type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list)
      //2.3将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },

// --------------------------事件监听函数-----------------------
  handleTabClick(event) {
    //取出index
    const index = event.detail.index;
    //设置currentType
    this.setData({
      currentType:types[index]
    })
  },
  handleImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  },
  onReachBottom(){
    //上拉加载更多
    this._getGoodsdate(this.data.currentType)
  },
  onPageScroll(options) {
    //1.取出scrollTop
    const scrollTop = options.scrollTop;
    //2.修改showBackTop属性
    //官方：不要在滚动的函数回调中频繁的调用this.setData
    const flag1 = scrollTop >= TOP_DISTANCE;
    if(flag1 != this.data.showBackTop){
      this.setData({
        showBackTop: flag1
      })
    }
    //3.修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if(flag2 != this.data.isTabFixed){
      this.setData({
        isTabFixed: flag2
      })
    }
  }
})
