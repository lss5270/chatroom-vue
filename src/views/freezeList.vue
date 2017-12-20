<template>
  <div>
    <elHead title="冻结列表" :judgment="judgment"></elHead>
    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
        <div class="list">
          <!-- <FreezeItem /> -->

          <div class="item" v-for="item in list">
            <router-link v-if="item.goodType === 1" :to="'/trademarkDetail/' + item.id">
              <img :src="item.resImg"  alt=""/>
            </router-link>

            <router-link v-if="item.goodType === 2" :to="'/patentDetail/' + item.id">
              <img :src="item.resImg"  alt=""/>
            </router-link>

            <div class="info" v-if="item.goodType === 1">
              <router-link :to="'/trademarkDetail/' + item.id">
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
              <!-- <div class="price">￥{{item.terminalPrice}}</div> -->
              <div class="price" v-if="item.terminalPrice != 0 && item.terminalPrice !='' ">￥{{item.terminalPrice}}</div>
              <div class="price" v-else>面议</div>
              <div class="desc">核准商品/服务：{{item.goodsList}}</div>
            </div>

            <div class="info" v-if="item.goodType === 2">
              <router-link :to="'/patentDetail/' + item.id">
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
              <p class="btn btn-favorite2">剩余时间</p>
              <timeDown class="" :beginTime="item.frozenTime"  :sysTime="sysTime"></timeDown>
              
            </div>

          </div>

        </div>
    </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import g from '@/global/global'
  import { Toast } from 'mint-ui'
  
  export default {
    name: 'Trademark',
    data () {
      return {
        wrapperHeight: 0,
        allLoaded: false,  
        judgment: {
          meun: true,
          search: false,
          text: false
        },
        sysTime: '',    // 系统时间
        list: [],
        reqPar: {
          pageSize: 10,
          pageNo: 1,
          //goodType: 2
        }
      }
    },
    
    created () {
      let vm = this;
      vm.getList();
    },
    mounted () {
      let vm = this;
      //vm.getList();
      vm.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      vm.getSysTime()
     

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
      getList (cb) {
        let vm = this;
        let par = vm.reqPar
        g.post(g.baseUrl+'/api/sales/wap/frozen/list', par, null, (res) => {
          // res = res.data
          // if (res.code === '000000') {
          //   this.list = res.result
          // }
          if (res.data.code === '000000' && res.data.result.length>0) {
              vm.list = vm.list.concat(res.data.result);
          }else{
              Toast('未查询到更多数据')
          }

          if(typeof cb == 'function'){
            cb()
          }
        }, (res) => {})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn-freeze {
    /*color: #f52e2e;
    margin-top: 0.05rem;*/
  }
</style>
