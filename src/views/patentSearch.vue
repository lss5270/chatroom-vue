<template>
  <div class="search">
   
    <elHead title="搜索" :judgment="judgment"></elHead>
   
    <div class="body">
        <div class="input_box">
          <input type="text" placeholder="专利名称或摘要"> <a class="btn_search" @click="search()">搜索</a>
        </div>

        <div class="classify">
          <h2>分类</h2>
          <ul class="clearfix">
            <li >
              <label><input type="checkbox"><span >发明专利</span> </label>
            </li>
            <li>
              <label><input type="checkbox"><span >实用新型</span> </label>
            </li>
            <li>
              <label><input type="checkbox"><span >外观专利</span> </label>
            </li>
            <li>
              <span>更多</span>
            </li>
            <li>
              <span>全部</span>
            </li>
          </ul>

          <h2>商标金额</h2>
          <ul class="clearfix">
            <li >
              <label><input type="checkbox" checked=""><span class="ckecked">全部</span></label>
            </li>
            <li>
              <label><input type="checkbox"><span>1000以下</span></label>
            </li>
            <li class="">
              <label><input type="checkbox"><span>1000-4999</span></label> 
            </li>
            <li>
              <label><input type="checkbox"><span>5000-9990</span></label>
            </li>
            <li class="">
              <label><input type="checkbox"><span>10000-15000</span></label>  
            </li>
            <li>
              <label><input type="checkbox"><span>15000以上</span></label>
            </li>
            
          </ul>
        </div>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        judgment:{
          back:true,
          meun:false,
          text:false,
          search:false
        }
      }
    },
    
    methods:{
      search:function(){
        alert(0)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

h2{
  color: #030303;
  font-size: 0.3rem;
  margin-top: 0.6rem;
  font-weight: bold;   

}
.input_box{
  margin: 0 0.32rem;
  padding-top: 0.2rem;
  input{
    width: 5.9rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-indent: 0.3rem;
    background: #f7f7f7;
    border-radius: 0.08rem;
  }
  .btn_search{
    display: inline-block;
    width: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    font-size: 0.3rem;
 
    font-weight: bold;   
  }
}
.classify{
  margin: 0 0.32rem;
  overflow: hidden;
  ul{
    width: 110%;
  }
}
.classify li{
  float: left;
  position: relative; 
  /*width: 0.8rem;*/
 /* padding: 0 0.3rem;*/
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  background: #f7f7f7;
  font-size: 0.3rem;
  margin: 0.24rem 0.24rem 0 0;
  border-radius: 0.08rem;
  span{
    display: block;
    padding: 0 0.3rem;
  }
  &.ckecked{
    color: #f08200;
    background: #feefdd;
  }
  input[type="checkbox"]{
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    &:checked + span{
      color: #f08200;
      background: #feefdd;
    }
  }
}
</style>
