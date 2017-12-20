<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    
    
      <!-- <Head01 title="个人信息22"></Head01> -->
      <elHead title="专利库" :judgment=judgment></elHead>

    

    <div class="body">
      <mt-button type="default">default</mt-button>
      <mt-button type="primary">primary</mt-button>
      <mt-button type="danger">danger</mt-button>

      <mt-cell-swipe slot="left"
        title=" <div>text78787</div>"
        :right="[
          {
            content: 'Delete',
            style: { background: 'red', color: '#fff' },
            handler: () => this.$messagebox('delete')
          }
        ]">

        </mt-cell-swipe>
    </div>
  </div>
</template>

<script>
import elHead from './common/head'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      judgment:{
        back:true,
        search:true
      }
    }
  },
  components:{
    elHead,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}*/


</style>
