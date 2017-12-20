<template>
  <div>
    <elHead title="商标收藏夹" :judgment="judgment"></elHead>
    <!-- <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false"> -->
        <div class="list">
          <!-- <TradeItem /> -->
          <!-- <div class="item">
              <a >
                <router-link to="/trademarkDetail">
                  <img src="http://via.placeholder.com/300/300"  alt=""/>
                </router-link>
                <div class="info">
                  <router-link to="/trademarkDetail">
                      <div class="name">甲方乙方</div>

                  </router-link>
                      <div class="no">注册号：55555555</div>
                      <div class="category">类别：类别</div>
                      <div class="expire">注册公告日期：2017-11-23 10:20:30</div>
                      <div class="price">￥17990</div>

                      <div class="desc">核准商品/服务：商品服务列表，如果过长就隐藏部分，点击详情查看全部</div>


                      <span class="btn btn-favorite">收藏</span>
                      <span class="btn btn-favorite on">已收藏</span>
                      <span class="btn btn-freeze on">已冻结</span>
                </div>



                <i @click="del(1)">删除</i>
              </a>
          </div>

          <div class="item">
              <a >
                <router-link to="/trademarkDetail">
                  <img src="http://via.placeholder.com/300/300"  alt=""/>
                </router-link>
                <div class="info">
                  <router-link to="/trademarkDetail">
                      <div class="name">甲方乙方</div>

                  </router-link>
                      <div class="no">注册号：55555555</div>
                      <div class="category">类别：类别</div>
                      <div class="expire">注册公告日期：2017-11-23 10:20:30</div>
                      <div class="price">￥17990</div>

                      <div class="desc">核准商品/服务：商品服务列表，如果过长就隐藏部分，点击详情查看全部</div>


                      <span class="btn btn-favorite">收藏</span>
                      <span class="btn btn-favorite on">已收藏</span>
                      <span class="btn btn-freeze on">已冻结</span>
                </div>



                <i @click="del(2)">删除</i>
              </a>
          </div> -->
          <div class="item" v-for="item in listData">
            <router-link :to="{ name: '商标详情', params: { id: item.id }}">
              <img :src="item.resImg"  alt=""/>
            </router-link>
            <div class="info">
              <router-link  :to="{ name: '商标详情', params: { id: item.id }}" >
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
              <span class="btn btn-favorite on" v-if="item.collected" @click="delCollect(item.id)">已收藏</span>
              <span class="btn btn-favorite" v-else @click="collect(item.id)" >收藏</span>

              <span class="btn btn-freeze on" v-if="item.frozenState == 2">已冻结</span>
              <timeDown v-if="item.frozenState == 2" class="" :beginTime="item.frozenTime"  :sysTime="sysTime"></timeDown>
            </div>
          </div>

        </div>
       <!--  </mt-loadmore>
    </div> -->
    <div class="export" @click="exportList()" v-if="listData.length >0">导出列表</div>
  </div>
</template>

<script>
  
  import g from '@/global/global'
  import { Loadmore, Toast } from 'mint-ui'


  export default {
    name: 'Trademark',
    data () {
      return {
        wrapperHeight: 0, 
        judgment: {
          meun: true,
          text: false,
          search: false
        },
        expansion: null,                                                   // 是否存在展开的list
        allLoaded: false,
        listData: [],
        reqPar: {
          pageSize: 10,
          pageNo: 1,
          goodType: 1
        }
      }
    },
   
    created () {
        let vm = this;
        vm.getList();
        vm.getSysTime();
    },
    mounted () {
      // var $this=this;                                                     //将$this保存 区分以下触发事件的this
      // var container = document.querySelectorAll('.list .item a');
      // for(var i = 0; i < container.length; i++){                          //为每个特定DOM元素绑定touchstart touchmove时间监听 判断滑动方向
      //     var x,  X;
      //     container[i].addEventListener('touchstart', function(event) {   //记录初始触控点横坐标
      //         x = event.changedTouches[0].pageX;
      //     });
      //     container[i].addEventListener('touchmove', function(event){
      //         X = event.changedTouches[0].pageX;                          //记录当前触控点横坐标
      //         if($this.expansion){                                       //判断是否展开，如果展开则收起
      //             $this.expansion.className = "";
      //         }
      //         if(X - x > 10){                                             //右滑
      //             this.className = "";                                    //右滑收起
      //         }
      //         if(x - X > 10){                                             //左滑
      //             this.className = "swipeleft";                           //左滑展开
      //             $this.expansion = this;
      //         }
      //     });
      // }
      let vm = this;
      //vm.getList();
      //vm.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods: {
      // del:function(name,idx){
      //     alert("确认删除"+name);
      //     //this.list.splice(idx,1);                                        //删除List这条数据 DOM随之更新渲染
      //     var container = document.querySelector('.swipeleft');           //将展开的DOM归位 除掉样式类
      //         container.className="";
      //         this.expansion=null;
      // }

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
      // 获取列表信息
      getList (cb) {
        const vm = this
        const par = vm.reqPar
        g.post(g.baseUrl+'/api/sales/wap/collect/list', par, null, (res) => {
          if (res.data.code === '000000') {
              //vm.listData = vm.listData.concat(res.data.result);
              vm.listData = res.data.result;
              if(res.data.result.length <= 0){
                Toast('未查询到更多数据')
              }
          }
          if(typeof cb == 'function'){
            cb()
          }
        }, (res) => {})


      },
      // 收藏
      collect (id) {
        var that = this
        g.post(g.baseUrl+'/api/sales/wap/collect/add', {'goodId': id}, null, (res) =>{
          if (res.data.code === '000000') {
            Toast('收藏成功')
            that.getList()
          } else {
            Toast('收藏失败')
          }
        }, (res) => {})
      },
      // 取消收藏
      delCollect (id) {
        var that = this
        g.post(g.baseUrl+'/api/sales/wap/collect/del', {'goodId': id}, null, (res) => {
          if (res.data.code === '000000') {
            Toast('取消成功')
            that.getList()
          } else {
            Toast('取消失败')
          }
        }, (res) => {})
      },
      // 获取导出列表key 
        exportList() {
            const that = this;
            g.post(g.baseUrl+'/api/sales/wap/collect/exportTrademark', {} ,null,(res) => {
                if (res.data.code === '000000') {
                window.open(g.baseUrl+'/api/sales/common/download/resource.pdf?key=' + res.data.result.key, '_blank');
                }
            }, (res) => {})
        }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 左滑删除
  .list {
      margin-top: 1rem;
      margin-bottom: 1rem;
  }
  .list .item {
      padding: 0.2rem;
      position: relative;
      border-radius: 0.1rem;
      background: #fff;
      border-bottom: 0.01rem solid rgb(244,244,244);
  }
  .list .item > a{
      display: block;
      -webkit-transition:all 0.3s;transition:all 0.3s;
      width: 125%;
  }
  .list .item i{float:right;width:17%;text-align:center;background:#E2421B;color:#fff; line-height: 10;}
  .swipeleft{transform:translateX(-17%);-webkit-transform:translateX(-17%);}
  左滑删除 end

  .list .item img {
      width: 2rem;
      height: 2.5rem;
  }

  .name {
      font-size: 0.32rem;
      color:#333;
  }

  .no {
      margin-top: 0.1rem;
      color: #999;
  }

  .category {
      color: #999;
  }

  .expire {
      color: #999;
  }

  .btn-favorite {
      background: #fe8346;
      position: absolute;
      width: 0.6em;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      color: #fff;
      font-size: 0.18rem;
      border-radius: 0.05rem;
      right: 0.2rem;
      top: 0.2rem;
  }

  .export {
      position: fixed;
      bottom: 0;
      right: 0;
      height: 1rem;
      line-height: 1rem;
      background-color: #f08200;
      color: #fff;
      font-size: 0.36rem;
      width: 100%;
      text-align: center;
      font-weight: 500;
  }

  item
  .item {
      padding: 0.1rem;
      position: relative;
      border-radius: 0.1rem;
      background: #fff;
      margin-top: 0.1rem;
      height: 2.7rem;
      overflow: hidden;
  }

  .item img {
      width: 2.1rem;
      height: 2.7rem;
  }

  .info {
      position: relative;
      display: inline-block;
      vertical-align: top;
      font-size:0.22rem;
      margin-left: 0.4rem;
      max-width: 4.6rem;
  }

  .name {
      font-size: 0.32rem;
      color:#333;
      font-weight: bold;
      margin-top: 0.1rem;
  }

  .no {
      margin-top: 0.1rem;
      color: #999;
      line-height: 0.3rem;
  }

  .category {
      color: #999;
      line-height: 0.3rem;
  }

  .expire {
      color: #999;
      line-height: 0.3rem;
  }

  .desc {
      margin-top: 0.2rem;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 0.3rem;

  }

  .btn-favorite {
      background: #fe8346;
      position: absolute;
      width: 1rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      color: #fff;
      font-size: 0.18rem;
      border-radius:0.05rem;
      right: 0.2rem;
      top: 0.2rem;
  }
  .btn-freeze {
      position: absolute;
      width: 1rem;
      height: 0.3rem;
      line-height: 0.33rem;
      text-align: center;
      color: #ccc;
      font-size: 0.18rem;
      border-radius:0.05rem;
      right: 0.2rem;
      top: 0.6rem;
      border: 0.01rem solid rgb(244,244,244);
  }
  .btn-favorite.on {
    background: #ccc;
  }
  .price {
      color: #f52e2e;
      margin-top: 0.2rem;
      border-bottom: 0.01rem solid rgb(244,244,244);
      line-height: 0.4rem;
      font-size: 0.28rem;
  }
  a {
      text-decoration: none;
  } */


  .export{
    width:100%;
    height: 1rem;
    color:#fff;
    background:#f08200;
    text-align: center;
    line-height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0.4 rem;
  }
  .list{
    margin-bottom: 1rem;
  }
</style>
