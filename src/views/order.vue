<template>
    <div>
        <elHead title="已下单列表" :judgment="judgment"></elHead>
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
          <div class="list">
              <div class="item" v-for="item in listData">
                  <div v-if="item.goodType==2">
                      <router-link :to="{ name: '订单详情', params: { id: item.id }}">
                          <img :src="item.resImg"  alt=""/>
                      </router-link>
                      <div class="info">
                          <router-link :to="{ name: '订单详情', params: { id: item.id }}">
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

                              <!-- <div class="no">注册号：{{item.resNum}}</div>
                              <div class="category">类别：{{item.inteTypeNum}}</div>
                              <div class="expire">专利期限：{{item.regeditNoticeDate | parseTime}}</div>
                              <div class="price" v-if="item.terminalPrice != 0 && item.terminalPrice !='' ">￥{{item.terminalPrice}}</div>
                              <div class="price" v-else>面议</div>
                      
                              
                              <div class="desc">{{item.summary}}</div> -->
                      </div>

                      <div class="item_fr">
                        <template v-if="item.salesState == 3">
                            <div class="status" >已售出</div>
                        </template>
                        <template v-else>
                            <div class="status" v-if="item.auditStatus == 0">待审核</div>
                            <div class="status" v-if="item.auditStatus == 1">审核通过</div>
                            <div class="status" v-if="item.auditStatus == 2">驳回</div>
                            <div class="status" v-if="item.auditStatus == 9">取消</div>
                        </template>
                      </div>
                      
                  </div>
                  <div v-if="item.goodType==1">
                      <router-link :to="{ name: '订单详情', params: { id: item.id }}">
                          <img :src="item.resImg"  alt=""/>
                      </router-link>
                      <div class="info">
                          <router-link  :to="{ name: '订单详情', params: { id: item.id }}" >
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
                      	<template v-if="item.salesState == 3">
                            <div class="status" >已售出</div>
                        </template>
                        <template v-else>
                            <div class="status" v-if="item.auditStatus == 0">待审核</div>
                            <div class="status" v-if="item.auditStatus == 1">审核通过</div>
                            <div class="status" v-if="item.auditStatus == 2">驳回</div>
                            <div class="status" v-if="item.auditStatus == 9">取消</div>
                        </template>
                      </div>
                  </div>
              </div>
          </div>
        </mt-loadmore>
        </div>

    </div>
</template>

<script>

  import g from '@/global/global'
  import { Loadmore } from 'mint-ui'
  import { Toast } from 'mint-ui'



  export default {
    name: 'Trademark',
    data(){
      return{
          wrapperHeight: 0,
          allLoaded: false,  
          judgment:{
            meun: true,
            text: false,
            search: false,
            back: false
          },
          status:"",
          listData: [],
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
      },
      methods:{
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
          var that = this
          let par = that.reqPar
          g.post(g.baseUrl+'/api/sales/wap/order/list', par, null, (res) => {
             if (res.data.code === '000000' && res.data.result.length>0) {
                 that.listData = that.listData.concat(res.data.result);
             }else{
                 Toast('未查询到更多数据')
             }

             if(typeof cb == 'function'){
               cb()
             }

            /*that.listData.map(n=>{
                switch(n.auditStatus){
                    case 0:
                    that.status='待审核';
                    break;
                    case 1:
                    that.status='审核通过';
                    break;
                    case 2:
                    that.status='驳回';
                    break;
                    case 9:
                    that.status='取消';
                    break;
                }
            })*/
          }, (res) => {})
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.status{
    /*position: absolute;*/
    padding: 0.1rem 0.2rem;
    height: 0.2rem;  
   /* top: 0.2rem;
    right: 0.2rem;*/
    background:#ccc;
    border-radius: 0.1rem;
}

</style>
