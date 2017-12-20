<template>
    <div class="patent_body">
      <elHead :title=title :judgment="judgment"></elHead>
      <!-- <Detail :kind="kind" :category="category"></Detail> -->
      <div v-if="listData.goodType == 1">
        <div class="detail_header" style="margin-top:1rem;">
            <p>
              {{listData.resName}}
              <span class="assignment common">转让</span>
              <!-- <span class="kind common">商标</span> -->
              <!-- <span class="price fr">￥17900</span> -->
               <span class="price fr" v-if="listData.terminalPrice != 0 && listData.terminalPrice !='' ">￥{{listData.terminalPrice}}</span>
                <span class="price fr" v-else>面议</span>
            </p>
            <p>商标号：{{listData.resNum}} <span class="s1" >类别：{{listData.inteTypeNum}}</span></p>
            <p>
                授权日期：{{listData.authorizationDate | parseTime}}
                <span class="s1" >
                资源类型：
                        <span v-if="listData.resourceType==1">自有资源</span>
                        <span v-if="listData.resourceType==2">可控资源</span>
                        <span v-if="listData.resourceType==3">第三方资源</span>
              </span>
            </p>
            
            
        </div>
        <div class="detail_picture">
          <img :src="listData.resImg" />
        </div>
        <p class="detail_content">{{listData.summary}}</p>
      </div>
      <div v-if="listData.goodType == 2">
        <div class="detail_header" style="margin-top:1rem;">
            <p>
              {{listData.resName}}
              <span class="assignment common">转让</span>
              <!-- <span class="kind common">商标</span> -->
              <!-- <span class="price fr">￥{{listData.terminalPrice}}</span> -->
              <span class="price fr" v-if="listData.terminalPrice != 0 && listData.terminalPrice !='' ">￥{{listData.terminalPrice}}</span>
              <span class="price fr" v-else>面议</span>

            </p>
            <p>专利号：{{listData.resNum}} <!-- <span class="s1" v-if="category!='' && category != null">类别：{{listData.inteTypeNum}}</span> --></p>
            <p>
                授权日期：{{listData.authorizationDate | parseTime}}
                <span class="s1" >
                资源类型：
                        <span v-if="listData.resourceType==1">自有资源</span>
                        <span v-if="listData.resourceType==2">可控资源</span>
                        <span v-if="listData.resourceType==3">第三方资源</span>
              </span>
            </p>
            
        </div>
        <div class="detail_picture">
          <img :src="listData.resImg" />
        </div>
        <p class="detail_content">{{listData.summary}}</p>
      </div>
      <table class="table1 table table-striped table-bordered table-hover">
        <thead>
          <th>下单时间</th>
          <th>审核状态</th>
          <th>备注</th>
        </thead>
        <tbody>
          <tr class="w100">
            <td class="w20">{{listData.orderTime | parseTime}}</td>
            <td class="w20">
              <span v-if="listData.auditStatus == 0">待审核</span>
              <span v-if="listData.auditStatus == 1">审核通过</span>
              <span v-if="listData.auditStatus == 2">驳回</span>
              <span v-if="listData.auditStatus == 9">取消</span>
            </td>
            <td class="w60">{{listData.auditRemark}}</td>
          </tr>
        </tbody>
      </table>
      <table class="table1 table table-striped table-bordered table-hover">
        <thead>
          <th>文件类型</th>
          <th>附件数量</th>
          <!-- <th>操作</th> -->
        </thead>
        <tbody>
          <tr>
            <td>确认单扫描件</td>
            <td><!-- <img :src="confirmImg" alt=""> --> <span v-if="confirmImg !='' ">{{confirmImg.length}}</span><span v-else>0</span></td>
            <!-- <td>编辑</td> -->
          </tr>
          <tr>
            <td>合同扫描件</td>
            <td><!-- <img :src="contractImg" alt=""> -->{{contractImg.length}}</td>
            <!-- <td>编辑</td> -->
          </tr>
          <tr>
            <td>收据扫描件</td>
            <td><!-- <img :src="receiptImg" alt=""> -->{{receiptImg.length}}</td>
           <!--  <td>编辑</td> -->
          </tr>
        </tbody>
      </table>
      <!-- 待审核、驳回 可编辑 -->
      <div  class="btn" @click="gotoEdit()" v-if="listData.auditStatus == 0 || listData.auditStatus == 2">编辑</div>

    </div>

</template>

<script>

  import g from '@/global/global'
  import { Toast } from 'mint-ui'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        title:'',
        kind:'订单',
        judgment:{
          back:true,
          text:true,
          meun:false,
          search:false
        },
        listData:{},
        confirmImg:'',
        contractImg:'',
        receiptImg:''
      }
    },
    
    created:function(){
      //获取id，根据id查询专利详情
      var that = this;
      that.getList()
    },
    mounted:function(){

    },
    methods:{
      removeEmptyArrayEle:function(arr){    
        for(var i = 0; i < arr.length; i++) {
         if(arr[i] == undefined || arr[i] == '') {
            arr.splice(i,1);
            i = i - 1; 
            
          }
         }
         console.log("=====",arr)
         return arr;
      },
      gotoEdit:function(){
        var vm = this;
        var _id = vm.$route.params.id;
        vm.$router.push({ name: '上传文件', params: { id: _id }})

      },
      getList:function(){
        var that = this;
        var vm = this;
        var _id = that.$route.params.id;
        g.post(g.baseUrl+'/api/sales/wap/order/detail',{'orderId':_id},null,function(res){
          that.listData = res.data.result;
          console.log('----------',that.listData)
          that.title = that.listData.resName+"详情";
          /*that.receiptImg = res.data.result.receiptImg.split(',')[0];
          that.contractImg = res.data.result.contractImg.split(',')[0];
          that.confirmImg = res.data.result.confirmImg.split(',')[0];*/
          that.receiptImg =  vm.removeEmptyArrayEle( res.data.result.receiptImg.split(',') );
          that.contractImg = vm.removeEmptyArrayEle( res.data.result.contractImg.split(',') );
          that.confirmImg = vm.removeEmptyArrayEle( res.data.result.confirmImg.split(',') );
          // console.log(that.confirmImg)
        },function(res){})
      }
    }
  }
</script>

<style scoped>
  img{
    vertical-align: middle;
    margin: 0.1rem 0;
  }
  .btn{
    width: 6rem;
    height: 0.6rem;
    margin: 0 auto;
    line-height: 0.6rem;
    text-align: center;
    color: #fff;
    background: #f08200;
    border-radius: 20px;
    font-size: 0.3rem;
    margin-top: 0.5rem;
  }




  .patent_body{
    width: 100%;
  }
  .detail_content{
    margin: 0.28rem  auto 0;
    font-size:0.24rem;
    font-weight: bold;
    line-height: 0.46rem;
    width:93%;
    color: #666666;
  }
  .table1{
    list-style: none;
    width: 96%;
    margin:0.31rem auto 0;
    /*overflow: hidden;*/
  }
  .table1 th,.table1 td{
    border: 1px solid #ccc;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
  }
  .table1 td img {
    width: 0.6rem;
    height: 0.6rem;
  }
  .table1 li:nth-child(4),.table1 li:nth-child(5),.table1 li:nth-child(6){
    border-top:none;
  }
  .table1 li:nth-child(1),.table1 li:nth-child(2),.table1 li:nth-child(4),.table1 li:nth-child(5){
    border-right: none;
  }
  .table2{
    list-style: none;
    width: 96%;
    margin:0.31rem auto 0;
    padding-bottom:1rem;
    overflow: hidden;
  }
  .table2 li{
    color:#404040;
    width: 32%;
    border-bottom: 1px solid #c7c7c7;
    border-right: 1px solid #c7c7c7;
    float: left;
    height: 0.76rem;
    text-align: center;
    line-height: 0.76rem;
    font-size: 0.25rem;
    font-weight: bold;
  }
  .table2 li:nth-child(6),.table2 li:nth-child(9),.table2 li:nth-child(12){
    color:#f08200;
  }
  .table2 li:nth-child(1),.table2 li:nth-child(2),.table2 li:nth-child(3){
    border-top:1px solid #c7c7c7;
  }
  .table2 li:nth-child(1),.table2 li:nth-child(4),.table2 li:nth-child(7),.table2 li:nth-child(10){
    border-left:1px solid #c7c7c7;
  }
  .attachment{
    margin:0.08rem auto 0;
    width:1.43rem;
    height: 0.6rem;
    background: #fdd1d1;
  }
  .attachment img{
    width: 100%;
    height: 100%;
  }
  .detail_header{
    margin:0.9rem auto 0.29rem;
    position: relative;
}
.detail_header p:nth-child(1){
    color:#000000;
    font-size: 0.3rem;
    font-weight: bold;
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
  display: inline-block;
    color:#fff;
    width:0.7rem;
    font-size: 0.18rem;
    line-height: 0.34rem;
    border-radius: 0.04rem;
    text-align: center;
    background-color: #cccccc;
    padding: 0 0.1rem;
}
.assignment{
    /*position: absolute;
    top: 0.16rem;
    left:3.9rem;*/
  margin-left: 0.2rem
}
.kind{
    /*position: absolute;
    top: 0.16rem;
    left:4.7rem;;*/
    margin-left: 0.2rem;
}
.price{
    /*position: absolute;
    top: 1.16rem;
    right:0.2rem;*/
    color:#f52e2e;
    font-size: 0.3rem;
    font-size: bolder;
}
.s1{
    margin-left: 0.36rem;
}
.w100 {
  width: 100%;
}
.w60 {
   width: 60%;
}
.w20 {
   width: 20%;
}
</style>
