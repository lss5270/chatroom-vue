<template>
  <div id="app" v-cloak>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
[v-cloak] {
  display: none;
}

body{
    background:#fff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;
  color: #2c3e50;*/
  /*margin-top: 60px;*/
  background-color: #fff;

  font-size: 0.24rem;
  -webkit-overflow-scrolling: touch;
}
*{
  margin: 0;
  padding: 0;
}
.mint-header{
  background: #666;
  font-size: 0.3rem;
  line-height: normal;
  height: 0.9rem;
}
.mint-header-title{
  font-size: 0.36rem;
}
.mintui{
  font-size: 0.30rem;
}
.body{
  /*height: 10rem;*/
  margin-top: 0.9rem;
  /*padding: 1rem 0;*/
}

/*临时性解决分页加载更多bug*/
.page-loadmore-wrapper {

    margin-top: -1px;
    overflow: auto;
}
</style>
