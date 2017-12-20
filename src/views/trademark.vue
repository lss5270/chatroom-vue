<template>
  <div >
    <elHead title="商标库" :judgment="judgment"></elHead>
    
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
          <ul class="list" >

            <!-- <TradeItem /> -->
            <li class="item" v-for="item in listData"  >
              <router-link :to="{ name: '商标详情', params: { id: item.id }}">
                <img :src="item.resImg"  alt=""/>
              </router-link>
              <div class="info">
                <router-link  :to="{ path: `/trademarkDetail/${item.id}`}" >
                  <div class="name">{{item.resName}}</div>

                </router-link>
                <div class="no">注册号：{{item.resNum}}</div>
                <div class="category">类别：{{item.inteTypeNum}}</div>
                <div class="category">
                  资源类型：
                  <span v-if="item.resourceType==1">自有资源</span>
                  <span v-if="item.resourceType==2">可控资源</span>
                  <span v-if="item.resourceType==3">第三方资源</span>
                </div>
                <div class="expire">注册公告日期：{{item.regeditNoticeDate | parseTime}}</div>
                
                
                <div class="price" v-if="item.terminalPrice != 0 && item.terminalPrice !='' ">￥{{item.terminalPrice}}</div>
                <div class="price" v-else>面议</div>
                <div class="desc">核准商品/服务：{{item.goodsList}}</div>
              </div>


              
              <div class="item_fr">
                  <span class="btn btn-favorite on" v-if="item.collected" @click="delCollect(item)">已收藏</span>
                  <span class="btn btn-favorite" v-else @click="collect(item)" >收藏</span>

                  <span class="btn btn-freeze on" v-if="item.frozenState == 2">已冻结</span>
                  <timeDown v-if="item.frozenState == 2" class="" :beginTime="item.frozenTime"  :sysTime="sysTime"></timeDown>
              </div>
            </li>


          </ul>
        </mt-loadmore>
    </div>
  </div>
</template>

<script>
 
  import { Loadmore, Toast } from 'mint-ui'
  import g from '@/global/global'
  import Cookies from 'js-cookie';

  export default {
    name: 'Trademark',
    data () {
      return {
        wrapperHeight: 0,  
        judgment: {
          text: false,
          meun: true,
          search: true
        },
        allLoaded: false,
        sysTime: '',    // 系统时间
        listData:[
          // {
          //   "authorizationDate": "2017-11-25T08:22:22.768Z",
          //   "collected": true,
          //   "frozenBy": "string",
          //   "frozenByName": "string",
          //   "frozenBySelf": true,
          //   "frozenState": 0,
          //   "frozenTime": "2017-11-25T08:22:22.768Z",
          //   "goodType": 0,
          //   "goodsList": "string",
          //   "id": "string",
          //   "inteTypeNum": 0,
          //   "patType": 0,
          //   "regeditNoticeDate": "2017-11-25T08:22:22.768Z",
          //   "resImg": "string",
          //   "resName": "string",
          //   "resNum": "string",
          //   "resourceType": 0,
          //   "summary": "string",
          //   "terminalPrice": 0
          // },
          
          

        ],
        reqPar: {
          pageSize: 10,
          pageNo: 1,
          goodType: 1 // 商品类型 1商标2专利
        }

      }
    },
    
    created () {
        let vm = this;
        console.log('参数---------',vm.$route.query)
        // Cookies.set('goodType', 1)
        localStorage.setItem('goodType', 1)
      // if (window['_common'].store.get('reqPar')) {
      //   this.reqPar = window['_common'].store.get('reqPar')
      // }
      if(vm.$route.query){
        vm.reqPar = Object.assign(vm.reqPar, vm.$route.query);
      }
      

      vm.getList();
      vm.getSysTime();
      
    },
    mounted () {
      let vm = this;
      //vm.getList();
      setTimeout(function(){
          vm.wrapperHeight = document.documentElement.clientHeight - vm.$refs.wrapper.getBoundingClientRect().top;
          //alert(vm.wrapperHeight)
      },800)
      
    },
    methods: {
      // 获取系统时间
      getSysTime () {
        g.post(g.baseUrl+'/api/common/sysTime', null, {}, (res) => {
          this.sysTime = res.data.result
        }, (res) => {})
      },
      // 加载更多
      loadBottom () {
        let vm = this;
        vm.allLoaded = true;

        vm.reqPar.pageNo ++;
        vm.getList(function(){
          vm.allLoaded = false
          vm.$refs.loadmore.onBottomLoaded();
        });
        
       
      },
      // 加载更多
      loadBottom () {
        let vm = this;
        vm.allLoaded = true;

        vm.reqPar.pageNo ++;
        vm.getList(function(){
          vm.allLoaded = false
          vm.$refs.loadmore.onBottomLoaded();
        });
        
       
      },
      // 获取列表信息
      getList (cb) {
        var vm = this
        let par = vm.reqPar
        g.post(g.baseUrl+'/api/sales/wap/info/list', par, null, (res) => {
            if (res.data.code === '000000' && res.data.result.length>0) {
              //if(par.pageNo == 1){
                vm.listData = vm.listData.concat(res.data.result);
              //}
            }else{
                Toast('未查询到更多数据')
                vm.reqPar.pageNo --;
            }

            if(typeof cb == 'function'){
              cb()
            }
        }, (res) => {
          console.log('失败')
        })

        
      },
      // 收藏
      collect (item) {
        let vm = this
        g.post(g.baseUrl+'/api/sales/wap/collect/add', {'goodId': item.id}, null, (res) => {
          if (res.data.code === '000000') {
            Toast('收藏成功')
            //vm.getList()
            //window.location.reload()
            item.collected = true;
          } else {
            Toast('收藏失败')
          }
        }, (res) => {
          console.log('失败')
        })
      },
      // 取消收藏
      delCollect (item) {
        let vm = this
        g.post(g.baseUrl+'/api/sales/wap/collect/del', {'goodId': item.id}, null, (res) => {
          if (res.data.code === '000000') {
            Toast('取消成功')
            //vm.getList()
            //window.location.reload()
            item.collected = false;
          } else {
            Toast('取消失败')
          }
        }, (res) => {
          console.log('失败')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  

  
</style>
