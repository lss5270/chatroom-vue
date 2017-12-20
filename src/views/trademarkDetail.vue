<template>
  <div >
    <elHead :title=title :judgment="judgment"></elHead>
    <!-- <DetailItem :kind="kind" :category="category"></DetailItem> -->
    <div class="detail_header">
        <p>
          {{listData.resName}}
           <span class="assignment common">转让</span>
           <!-- <span class="kind common">商标</span> -->
           <span class="price fr" v-if="listData.terminalPrice != 0 && listData.terminalPrice !='' ">￥{{listData.terminalPrice}}</span>
            <span class="price fr" v-else>面议</span>
        </p>
        <p>注册号：{{listData.resNum}} <span class="s1" >类别：{{listData.inteTypeNum}}</span></p>
        <p>注册公告日期：{{listData.regeditNoticeDate | parseTime}}
          <span class="s1" >
            资源类型：
                    <span v-if="listData.resourceType==1">自有资源</span>
                    <span v-if="listData.resourceType==2">可控资源</span>
                    <span v-if="listData.resourceType==3">第三方资源</span>
          </span>
        </p>
        
        
    </div>
    <div class="detail_picture">
        <img :src="listData.resImg"/>
    </div>

    <div>
      <h3>服务类别</h3>
      <ul>
        <li v-for="item in typeList">{{item}}</li>

      </ul>
    </div>
    <div class="fixed">
      <!-- frozenState 1未冻结，2冻结。frozenBySelf，true自己冻结 -->
      <div v-if="listData.frozenState !== 2 && !listData.frozenBySelf"> 
        <span class="active" @click="freeze()">申请冻结</span>
        <router-link :to="{ name: '上传文件', params: { id: listData.id }}">
          <span>立即下单</span>
        </router-link>
      </div>
      <div v-if="listData.frozenState === 2 && listData.frozenBySelf"> 
        <span class="active" @click="delFreeze()">申请解冻</span>
        <router-link :to="{ name: '上传文件', params: { id: listData.id }}">
          <span>立即下单</span>
        </router-link>
      </div>

    </div>
  </div>

</template>

<script>

  import g from '@/global/global'
  import { Toast } from 'mint-ui'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        title: '',
        kind: '商标',
        judgment: {
          text: true,
          back: true,
          meun: false,
          search: false
        },
        listData: {},
        typeList: []
      }
    },
    
    created () {
      this.getList()
    },
    mounted () {
    },
    methods: {
      // 获取详情信息
      getList () {
        g.post(g.baseUrl+'/api/sales/wap/info/detail', {'goodId': this.$route.params.id}, null, (res) => {
          if (res.data.code === '000000') {
            this.listData = res.data.result;
            this.title = this.listData.resName + '详情';
            //this.listData.goodsList = this.listData.goodsList.replace(/;/g,',').replace(/|/,',');

            this.typeList = this.listData.goodsList ? this.listData.goodsList.split(',') : []
          } else {
            Toast(res.data.content)
          }
        }, (res) => {
          console.log('失败')
        })
      },
      // 冻结
      freeze () {
        let vm = this;
        g.post(g.baseUrl+'/api/sales/wap/frozen/off', {'ids': [this.listData.id]}, null, (res) => {
          if (res.data.code === '000000') {
            Toast('冻结成功')
            vm.getList()
          } else {
            Toast(res.data.content)
          }
        }, (res) => {
          console.log('失败')
        })
      },
      // 解冻
      delFreeze () {
        let vm = this;
        g.post(g.baseUrl+'/api/sales/wap/frozen/on', {'ids': [this.listData.id]}, null, (res) => {
          if (res.data.code === '000000') {
            Toast('解冻成功')
             vm.getList()
          } else {
            Toast(res.data.content)
          }
        }, (res) => {
          console.log('失败')
        })
      },
    }
  }
</script>

<style scoped>
  h3 {
    height: 0.6rem;
    line-height: 1rem;
    font-size: 0.3rem;
    margin-top: 0.1rem;
    font-weight: bold;
    margin-bottom: 0.15rem;
    padding-left: 0.2rem;
  }
  ul {
    padding: 0 0.3rem 1rem;
    overflow: hidden;
  }
  li {
    float: left;
    font-size: 0.3rem;
    font-weight: 600;
    /*height: 0.4rem;*/
    line-height: 0.4rem;
    padding: 0.17rem;
    background-color: #feefdd;
    color: #f18f2b;
    border-radius: 0.07rem;
    margin: 0.1rem;
  }
  .fixed {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
  }
  .fixed span {
    font-weight: bold;
    font-size:0.24rem;
    float: left;
    display: block;
    background-color: #f08200;
    color: #fff;
    height: 1rem;
    line-height: 1rem;
    width: 50%;
    text-align: center;
  }
  .fixed .active {
    background-color: #95c94b;
    color: #fff;
  }




  .detail_header{
    margin:0.9rem auto 0.29rem;
    position: relative;
}
.detail_header p:nth-child(1){
    color:#000000;
    font-size: 0.3rem;
    font-weight: bolder;
    line-height: 0.6rem;
    width:96%;
    margin: 1.09rem auto 0 ;
}
.detail_header p:nth-child(2),.detail_header p:nth-child(3){
    color:#999999;
    font-size: 0.22rem;
    line-height: 0.38rem;
    width:96%;
   margin:0 auto;
}
.detail_picture{
    width: 7.08rem;
    margin: 0 auto;
}
.detail_picture img{
   width:100%;
}
.common{
    color:#fff;
    width:0.7rem;
    font-size: 0.18rem;
    line-height: 0.34rem;
    border-radius: 0.06rem;
    text-align: center;
    background-color: #cccccc;
}
.assignment{
   /* position: absolute;
    top: 0.16rem;
    left:2.9rem;*/
    display: inline-block;
    margin-left: 0.2rem;

}
.kind{
    /*position: absolute;
    top: 0.16rem;
    left:3.7rem;*/
    display: inline-block;
    margin-left: 0.2rem;
}
.price{
    /*position: absolute;
    top: 0.16rem;
    right:0.2rem;*/
    color:#f52e2e;
    font-size: 0.3rem;
    font-size: bolder;
}
.s1{
    margin-left: 0.36rem;
}
</style>
