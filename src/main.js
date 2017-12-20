// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './global/rem'
import './assets/css/index.scss' // 全局自定义的css样式
import './assets/css/style.scss' // 全局自定义的css样式

import Cookies from 'js-cookie';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import g from '@/global/global'


import elHead from './views/common/head'
import timeDown from './views/common/timeDown'
import fileUpload from './views/common/fileUpload'
//全局组件
Vue.component('elHead', elHead)
Vue.component('timeDown', timeDown)
Vue.component('fileUpload', fileUpload)

Vue.config.productionTip = false
Vue.use(MintUI)

//全局过滤
Vue.filter('parseTime', g.formatDate)

// if(Cookies.get('auth-token')){
//   Vue.http.headers.common['auth-token'] = 'Bearer.'+Cookies.get('auth-token');
// }else{
  
// }
// if(localStorage.getItem('auth-token')){
//   Vue.http.headers.common['auth-token'] = 'Bearer.'+localStorage.getItem('auth-token');
// }else{
  
// }

const whiteList = ['/login','/404'];// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress

  if(to.path == '/personInfo'){
    document.getElementsByTagName('body')[0].className = 'gray'
  }else{
    document.getElementsByTagName('body')[0].className = ''
  }

  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    
  	next()
  	NProgress.done();
  }

  else{
  	// if(!Cookies.get('auth-token')){
  	//    next('/login');
  	//   }else{
    //      Vue.http.headers.common['auth-token'] = 'Bearer.'+Cookies.get('auth-token');
  	//   	next();
          
  	// }
    if( !localStorage.getItem('auth-token') ){
       next('/login');
      }else{
        Vue.http.headers.common['auth-token'] = 'Bearer.'+localStorage.getItem('auth-token');
        next();
    }
  } 
  window.document.title = to.name;
  NProgress.done();
})





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
