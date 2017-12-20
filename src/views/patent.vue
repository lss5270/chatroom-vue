<template>
  <div>
    <elHead title="专利库" :judgment="judgment"></elHead>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
      <div class="list">
        <!-- PatentItem -->
        <div class="item" v-for="item in listData">
          <router-link :to="{ name: '专利详情', params: { id: item.id }}">
            <img :src="item.resImg"  alt=""/>
          </router-link>
          <div class="info">
            <router-link  :to="{ name: '专利详情', params: { id: item.id }}" >
              <div class="name">{{item.resName}}</div>

            </router-link>
            <div class="no">专利号：{{item.resNum}}</div>
            <div class="category">
              类别：
              <span v-if="item.patType == 1">发明</span>
              <span v-if="item.patType == 2">实用</span>
              <span v-if="item.patType == 3">外观</span>
              <span v-if="item.patType == 4">其它</span>
            </div>
            <div class="category">合作类型：转让</div>
            <div class="category">
              资源类型：
              <span v-if="item.resourceType==1">自有资源</span>
              <span v-if="item.resourceType==2">可控资源</span>
              <span v-if="item.resourceType==3">第三方资源</span>
            </div>
            <div class="expire">授权日期：{{item.authorizationDate | parseTime}} </div>

            <div class="price" v-if="item.terminalPrice != 0 && item.terminalPrice !='' ">￥{{item.terminalPrice}}</div>
            <div class="price" v-else>面议</div>

            <div class="desc">{{item.summary}}</div>
          </div>


          <div class="item_fr">
              <span class="btn btn-favorite on" v-if="item.collected" @click="delCollect(item)">已收藏</span>
              <span class="btn btn-favorite" v-else @click="collect(item)" >收藏</span>

              <span class="btn btn-freeze on" v-if="item.frozenState == 2">已冻结</span>
              <timeDown v-if="item.frozenState == 2" class="" :beginTime="item.frozenTime"  :sysTime="sysTime"></timeDown>
          </div>
        </div>
      </div>
    </mt-loadmore>
    </div>

  </div>
</template>

<script>

  import { Loadmore } from 'mint-ui'
  import { Toast } from 'mint-ui'
  
  import g from '@/global/global'
  import Cookies from 'js-cookie';

  export default {
    name: 'Trademark',
    data () {
      return {
        wrapperHeight: 0,  
        judgment: {
          meun: true,
          text: false,
          search: true,
          back: false
        },
        allLoaded: false,
        listData: [],
        reqPar: {
          pageSize: 10,
          pageNo: 1,
          goodType: 2
        }
      }
    },
   
    created () {
    	let vm = this;
      // Cookies.set('goodType', 2)
      localStorage.setItem('goodType', 2)
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
    methods:{
      // 获取系统时间
      getSysTime () {
        g.post('/api/common/sysTime', null, {}, (res) => {
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
      // ajax获取列表信息
      getList (cb) {
        var vm = this
        let par = vm.reqPar
        g.post('/api/sales/wap/info/list', par, null, (res) => {
              if (res.data.code === '000000' && res.data.result.length>0) {
                  vm.listData = vm.listData.concat(res.data.result);
              }else{
                  Toast('未查询到更多数据')
              }

              if(typeof cb == 'function'){
                cb()
              }
        }, (res) => {})

        
      },
      // 收藏
      collect (item) {
        var that = this
        g.post('api/sales/wap/collect/add', {'goodId': item.id}, null, (res) =>{
          if (res.data.code === '000000') {
            Toast('收藏成功')
            // that.getList()
            //window.location.reload()
            item.collected = true;
          } else {
            Toast('收藏失败')
          }
        }, (res) => {})
      },
      // 取消收藏
      delCollect (item) {
        const that = this
        g.post('api/sales/wap/collect/del', {'goodId': item.id}, null, (res) => {
          if (res.data.code === '000000') {
            Toast('取消成功')
            //that.getList()
            //window.location.reload()
            item.collected = false;
          } else {
            Toast('取消失败')
          }
        }, (res) => {})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  

</style>
