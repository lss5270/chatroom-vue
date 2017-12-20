import Vue from 'vue'
import Router from 'vue-router'

import Test from '@/views/test'
import Search from '@/views/search'
import PersonInfo from '@/views/personInfo'
import Login from '@/views/login'
import TradeMark from '@/views/trademark'
import Patent from '@/views/patent'
import TrademarkCollect from '@/views/trademarkCollect'
import PatentCollect from '@/views/patentCollect'
import FreezeList from '@/views/freezeList'
import PatentSearch from '@/views/patentSearch'
import Order from '@/views/order'
import Upload from '@/views/upload'
import PatentDetail from '@/views/patentDetail'
import TrademarkDetail from '@/views/trademarkDetail'
import OrderDetail from '@/views/orderDetail'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: '测试',
    //   component: Test
    // },
    {
      path: '/',
      redirect: '/login'
    },
    // 商标搜索
    {
      path: '/search',
      name: '商标搜索',
      component: Search
    },
    // 专利搜索
    {
      path: '/patentSearch',
      name: '专利搜索',
      component: PatentSearch
    },
    // 个人信息
    {
      path: '/personInfo',
      name: '个人信息',
      component: PersonInfo
    },
    // 登录
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    // 商标库
    {
      path: '/trademark',
      name: '商标库',
      component: TradeMark
    },
    // 商标收藏夹
    {
      path: '/trademarkCollect',
      name: '商标收藏夹',
      component: TrademarkCollect
    },
    // 专利库
    {
      path: '/patent',
      name: '专利库',
      component: Patent
    },
    // 专利收藏夹
    {
      path: '/patentCollect',
      name: '专利收藏夹',
      component: PatentCollect
    },
    // 冻结列表
    {
      path: '/freezeList',
      name: '冻结列表',
      component: FreezeList
    },
    // 已下单列表
    {
      path: '/order',
      name: '已下单列表',
      component: Order
    },
    // 订单详情
    {
      path: '/orderDetail/:id',
      name: '订单详情',
      component: OrderDetail
    },
    // 上传文件
    {
      path: '/upload/:id',
      name: '上传文件',
      component: Upload
    },
    // 专利详情
    {
      path: '/patentDetail/:id',
      name: '专利详情',
      component: PatentDetail
    },
    // 商标详情
    {
      path: '/trademarkDetail/:id',
      name: '商标详情',
      component: TrademarkDetail
    }
  ]
})
