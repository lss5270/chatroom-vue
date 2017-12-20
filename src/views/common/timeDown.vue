<template >
	<span class="j_time">
		  <span v-if="timeShow">
        {{ ` ${hr}:${min}:${sec}` }}
      </span>
      <span v-else>
        等待解冻
      </span>
	</span>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      day: 0, 
      hr: 0, 
      min: 0, 
      sec: 0,
      timeShow: true,
    }
  },
  props:['beginTime','sysTime'],
  components:{
    
  },
  created: function(){
    
  },
  mounted: function(){
    this.countdown();
    // console.log('---',this.beginTime,'=====',this.sysTime) 
  },
  methods:{
    countdown: function (date) {
    	let vm = this;
    	//冻结24小时，接口给开始时间， 当前时间获取服务器的时间
          const end = Date.parse(new Date( new Date(this.beginTime).getTime() + 24*60*60*1000 ))
          const now = Date.parse(new Date())
          const msec = end - now
          let day = parseInt(msec / 1000 / 60 / 60 / 24)
          let hr = parseInt(msec / 1000 / 60 / 60 % 24)
          let min = parseInt(msec / 1000 / 60 % 60)
          let sec = parseInt(msec / 1000 % 60)
          this.day = day
          this.hr = hr > 9 ? hr : '0' + hr
          this.min = min > 9 ? min : '0' + min
          this.sec = sec > 9 ? sec : '0' + sec
          if(day<0 || hr<0 || sec<0){
            vm.timeShow = false;
          }
          setTimeout(function () {
            vm.countdown()
          }, 1000)
    },
  } 
}
</script>

<style type="text/css">
  
  .j_time{
    display: block;
    color: #f52e2e;
    margin-top: 0.1rem;
  }
</style> 			