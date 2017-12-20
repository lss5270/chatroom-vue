<template>
  <div>
    <elHead title="专利收藏夹" :judgment="judgment"></elHead>
    <div class="list">
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
          <span class="btn btn-favorite on" v-if="item.collected" @click="delCollect(item.id)">已收藏</span>
          <span class="btn btn-favorite" v-else @click="collect(item.id)" >收藏</span>

          <span class="btn btn-freeze on" v-if="item.frozenState == 2">已冻结</span>
          <timeDown v-if="item.frozenState == 2" class="" :beginTime="item.frozenTime"  :sysTime="sysTime"></timeDown>
        </div>
      </div>
    </div>
    <div class="export" @click="exportList()" v-if="listData.length >0">导出列表</div>
  </div>
</template>

<script>

  import { Loadmore } from 'mint-ui';
  import g from '@/global/global'
  import { Toast } from 'mint-ui'


  export default {
    name: 'Trademark',
    data () {
      return {
        judgment: {
          meun: true,
          text: false,
          search: false
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
    
    mounted () {
      var vm = this
      vm.getList();
      vm.getSysTime();
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
        this.allLoaded = true
        setTimeout(() => {
          this.allLoaded = false
        }, 2500)
      },
      // 获取列表信息
      getList (cb) {
        const that = this
        const par = that.reqPar
        g.post(g.baseUrl+'/api/sales/wap/collect/list', par, null, (res) => {
          that.listData = res.data.result;
          if (res.data.code === '000000') {
            //vm.listData = vm.listData.concat(res.data.result);
            that.listData = res.data.result;
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
        g.post(g.baseUrl+'/api/sales/wap/collect/add', {'goodId': id}, null, (res) => {
          if (res.data.code === '000000') {
            Toast('收藏成功')
            this.getList()
          } else {
            Toast('收藏失败')
          }
        }, (res) => {})
      },
      // 取消收藏
      delCollect (id) {
        g.post(g.baseUrl+'/api/sales/wap/collect/del', {'goodId': id}, null, (res) => {
          if (res.data.code === '000000') {
            Toast('取消成功')
            this.getList()
          } else {
            Toast('取消失败')
          }
        }, (res) => {})
      },
        // 获取导出列表key 
        exportList() {
            const that = this;
            g.post(g.baseUrl+'/api/sales/wap/collect/exportPatent', {} ,null,(res) => {
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
