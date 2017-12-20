import Vue from 'vue';
import VueResource from 'vue-resource';
import Cookies from 'js-cookie';

Vue.use(VueResource);

import { Indicator } from 'mint-ui';

// const config = require('../../config');
import config from '../../config';


// if(Cookies.get('auth-token')){
//   Vue.http.headers.common['auth-token'] = 'Bearer.'+Cookies.get('auth-token');
// }else{
  
// }
//封装一些全局元素。如全站通用功能函数和http请求等

  const global = {
        
        baseUrl: process.env.NODE_ENV !== 'development' ?  config.build.baseUrl: config.dev.baseUrl,  //接口前缀

        staticPath: process.env.NODE_ENV !== 'development' ?  config.build.staticPath: config.dev.staticPath,//静态资源路径
       
        /**
         * 统一接口处理：get请求方法封装。this.$http.get(url, [options])
         * @param url { String } -必选 接口url
         * @param options { Object } -必选 含官方的所有options对象。传参为{params:{key:11}}
         * @param sucCb { Function } -必选 成功回调
         * @param errorCb { Function } -可选 失败回调
         * @param isLoading { Boolean } -可选 是否显示加载状态
         * @param isLogin { Boolean } -可选 是否登陆信息（移动端使用得较多，设置头部信息）
         */
        get:function( url,options = {},sucCb,errorCb,isLoading = true,isLogin ){
            
            if(!url){
                console.log('接口url不能为空！');
                return false ;
            }
            //lss 2017-6-28 补默认laoding状态
            // var isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;  

            //遮罩层
            if(isLoading){
                Indicator.open({
                  //text: '加载中...',
                  spinnerType: 'fading-circle'
                });
            }
            // options.headers['auth-token'] = Cookies.get('auth-token');
            Vue.http.get(url, options).then((response) => {
                // 响应成功回调
                //console.log('成功回调')
                
                
                setTimeout(function(){
                    sucCb(response);
                    if(isLoading){
                        Indicator.close();
                    }
                    
                },500)
                   
                
            }, (response) => {
                // 响应错误回调
                //console.log('失败回调')
                errorCb(response);
                if(isLoading){
                   Indicator.close();
                }
            })
        },

        /**
         * 统一接口处理：post请求方法封装。this.$http.get(url, [options])
         * @param url { String } -必选 接口url
         * @param body { Object } -必选 含官方的所有body对象，可为null。传参时不需要参数名，例如body为{key:11}
         * @param options { Object } -必选 含官方的所有options对象，可为null。传参为{params:{key:11}}
         * @param sucCb { Function } -必选 成功回调
         * @param errorCb { Function } -可选 失败回调
         * @param isLoading { Boolean } -可选 是否显示加载状态
         * @param isLogin { Boolean } -可选 是否登陆信息（移动端使用得较多，设置头部信息）
         */
        post:function( url,body,options,sucCb,errorCb,isLoading = true,isLogin ){
            if(!url){
                console.log('接口url不能为空！');
                return false ;
            }
            //lss 2017-6-28 补默认laoding状态
            // var isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;  

            //遮罩层
            if(isLoading){
                Indicator.open({
                  //text: '加载中...',
                  spinnerType: 'fading-circle'
                });
            }
            Vue.http.post(url,body,options).then((response) => {
                // 响应成功回调
                //console.log('成功回调')
                setTimeout(function(){
                    sucCb(response);
                    if(isLoading){
                        Indicator.close();
                    }
                    
                },500)
                 
            }, (response) => {
                // 响应错误回调
                //console.log('失败回调')
                errorCb(response);
                if(isLoading){
                   Indicator.close();
                }
            })
        },

       
        
        /**
         * author lss
         * 日期格式化,传入为毫秒数,转出时间格式为 ：2016-6-6 12:00:00
         * @objD 必填，格式为毫秒数
         */
        formatDate: function (objD,cFormat) {
            if (!objD) {
                return '';
            }

            objD = new Date(objD);
            var str;
            var yy = objD.getYear();
            if (yy < 1900) yy = yy + 1900;
            var MM = objD.getMonth() + 1;
            if (MM < 10) MM = '0' + MM;
            var dd = objD.getDate();
            if (dd < 10) dd = '0' + dd;
            var hh = objD.getHours();
            if (hh < 10) hh = '0' + hh;
            var mm = objD.getMinutes();
            if (mm < 10) mm = '0' + mm;
            var ss = objD.getSeconds();
            if (ss < 10) ss = '0' + ss;
            // str = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
            str = yy + "-" + MM + "-" + dd;
            return (str);
        },
       
		
        
        /**
         * 获取url参数
         */
        getUrlFn: function () {
            var querystr = window.location.href.split("?"),
                // var querystr = "http://xxxx.com/recharge.html?mid=&version=7701&from=music".split("?"),
                GETs = "",
                GET = "";
            if (querystr[1]) {
                GETs = querystr[1].split("&");
                GET = [];
                for (i = 0; i < GETs.length; i++) {
                    tmp_arr = GETs[i].split("=");
                    var key = tmp_arr[0];
                    GET[key] = tmp_arr[1];
                }
            }
            return GET;
            // return querystr[1];
        },
        /**
         * 获取url data参数。aa.html?data={}
         */
        getUrlData: function () {
            var purl = window.location.href;
            purl = purl.substr(purl.indexOf("?") + 1);
            var urlData = JSON.parse(decodeURI(purl.substr(purl.indexOf("=") + 1)));

            return urlData;
        },
        
    };
    

export default global
