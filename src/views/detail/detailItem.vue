<template>
  <div>
    <div class="detail_header">
        <p>监控方向可调头盔</p>
        <p>注册号：201403525555 <span class="s1" v-if="category!='' && category != null">类别：{{category}}</span></p>
        <p>注册公告日期：2017.02.27</p>
        <span class="assignment common">转让</span>
        <span class="kind common">{{kind}}</span>
        <span class="price">￥17900</span>
    </div>
    <div class="detail_picture">
        <img src="../../assets/patent.png"/>
    </div>
  </div>
</template>

<script>
export default{
    name: 'HelloWorld',
    data (){
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    props:['kind','category']
}
</script>

<style scoped>
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
    position: absolute;
    top: 0.16rem;
    left:2.9rem;

}
.kind{
    position: absolute;
    top: 0.16rem;
    left:3.7rem;;
}
.price{
    position: absolute;
    top: 0.16rem;
    right:0.2rem;
    color:#f52e2e;
    font-size: 0.3rem;
    font-size: bolder;
}
.s1{
    margin-left: 0.36rem;
}
</style>
