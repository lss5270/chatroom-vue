<template>
  <div class="search">

    <elHead title="搜索" :judgment="judgment"></elHead>

    <div class="body">
      <div class="input_box">
        <input v-if="goodType === 1" type="text" placeholder="商标名" v-model="resName">
        <input v-if="goodType === 2" type="text" placeholder="专利名" v-model="resName">
        <a class="btn_search" @click="search()">搜索</a>
      </div>

      <div class="input_box">
        <input v-if="goodType === 1" type="text" placeholder="商品服务列表" v-model="goodsList">
        <input v-if="goodType === 2" type="text" placeholder="摘要" v-model="summary">
      </div>

      <div class="classify">
        <div v-if="goodType === 1">
          <h2>分类</h2>
          <ul class="clearfix">
            <li v-for="item in classifyList">
              <label><input type="checkbox" :value="item.value" v-model="inteTypeList"><span >{{item.text}}</span> </label>
            </li>

            <li v-if="isMore">
              <span @click="moreClassify()">更多</span>
            </li>
            <li v-else>
              <span @click="allClassify()">全部</span>
            </li>
          </ul>
        </div>

        <div v-if="goodType === 2">
          <h2>分类</h2>
          <ul class="clearfix">
            <li>
              <label><input type="radio" name="patType" value="1" v-model="patType"><span>发明专利</span></label>
            </li>
            <li class="">
              <label><input type="radio" name="patType" value="2" v-model="patType"><span>实用新型</span></label>
            </li>
            <li>
              <label><input type="radio" name="patType" value="3" v-model="patType"><span>外观专利</span></label>
            </li>
            <li>
              <label><input type="radio" name="money" value="4" v-model="patType"><span>其他</span></label>
            </li>
          </ul>
        </div>

        <h2>金额</h2>
        <ul class="clearfix">
          <li >
            <label><input type="radio" name="amount" value="" v-model="amount"><span class="ckecked">全部</span></label>
          </li>
          <li>
            <label><input type="radio" name="amount" value="0-1000" v-model="amount"><span>1000以下</span></label>
          </li>
          <li class="">
            <label><input type="radio" name="amount" value="1000-4999" v-model="amount"><span>1000-4999</span></label>
          </li>
          <li>
            <label><input type="radio" name="amount" value="5000-9990" v-model="amount"><span>5000-9990</span></label>
          </li>
          <li class="">
            <label><input type="radio" name="amount" value="10000-15000" v-model="amount"><span>10000-15000</span></label>
          </li>
          <li>
            <label><input type="radio" name="amount" value="15000-" v-model="amount"><span>15000以上</span></label>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  
  import _g from '@/global/global'
  import Cookies from 'js-cookie';
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        judgment: {
          text: false,
          back: true,
          meun: false,
          search: false
        },
        resName: '',
        goodType: 1,
        amount: '',
        patType: '',
        summary: '',
        classifyList: [],
        inteTypeList: [],
        isMore: true,
        goodsList: ''
      }
    },
    computed: {
      minPrice () {
        if (!this.amount) return ''
        return this.amount.split('-')[0]
      },
      maxPrice () {
        if (!this.amount) return ''
        return this.amount.split('-')[1]
      }
    },
    
    created () {
      let vm = this;

      // if ( !!Cookies.get('goodType') ) {
      //   this.goodType = Number(Cookies.get('goodType'))
      // }
      if ( !!localStorage.getItem('goodType') ) {
        this.goodType = Number(localStorage.getItem('goodType'))
      }

      
      
      for (let i = 1; i < 11; i++) {
        let item = {'text': i, 'value': i}
        vm.classifyList.push(item)
      }
    },
    methods: {
      search () {
      	let par = { goodType: this.goodType, minPrice: this.minPrice, maxPrice: this.maxPrice, inteTypeList: this.inteTypeList, resName: this.resName, patType: this.patType, summary: this.summary, goodsList: this.goodsList, pageNo: 1, pageSize: 10 };

        // window['_common'].store.set('reqPar', { goodType: this.goodType, minPrice: this.minPrice, maxPrice: this.maxPrice, inteTypeList: this.inteTypeList, resName: this.resName, patType: this.patType, summary: this.summary, goodsList: this.goodsList, pageNo: 1, pageSize: 10 })
        if (this.goodType === 1) {
          //this.$router.push({path: '/trademark'})
          this.$router.push({ path: '/trademark', query: par })
        }
        if (this.goodType === 2) {
          this.$router.push({path: '/patent', query: par })
        }
      },
      moreClassify () {
        let vm = this
        for (let i = 11; i < 46; i++) {
          let item = {'text': i, 'value': i}
          vm.classifyList.push(item)
        }
        vm.isMore = !vm.isMore
      },
      allClassify () {
        let vm = this
        if (vm.inteTypeList.length === 45) {
          vm.inteTypeList = []
          return false
        }
        vm.inteTypeList = []
        for (let i = 1; i < 46; i++) {
          vm.inteTypeList.push(i)
        }
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
    margin: 0.2rem 0.24rem 0 0;
    border-radius: 0.08rem;
    span{
      display: block;
      padding: 0 0.3rem;
    }
    &.ckecked{
      color: #f08200;
      background: #feefdd;
    }
    input{
      display: none;
      &:checked + span{
        color: #f08200;
        background: #feefdd;
      }
    }
  }
</style>
