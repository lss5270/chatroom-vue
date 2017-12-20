<template>
	<div class="header">
		<div class="back" v-if="judgment.back==true" @click="back">
			<i></i><span v-if="judgment.text == true">返回</span>
		</div>
		<div class="meun" v-if="judgment.meun == true">
			<i @click="meun"></i>
			<ul v-show="!flag">
				<li @click="flag=true"><router-link to="/trademark" >商标库</router-link></li>
				<router-link to="/patent"><li @click="flag=true">专利库</li></router-link>
				<router-link to="/trademarkCollect"><li @click="flag=true">商标收藏夹</li></router-link>	
				<router-link to="/patentCollect"><li @click="flag=true">专利收藏夹</li></router-link>	
				<router-link to="/order"><li @click="flag=true">已下单列表</li></router-link>	
				<router-link to="/freezeList" ><li @click="flag=true">冻结列表</li></router-link>	
				<router-link to="/personInfo" ><li @click="flag=true">个人信息</li></router-link>					
			</ul>
		</div>
		<p class="title">{{title}}</p>
		<router-link to="/search" slot="right" v-if="judgment.search == true">
	     	<div class="search" v-if="judgment.search == true">
	     		<i></i>
	     	</div>
	     </router-link>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				flag:true,
			}
		},
		props:['title','judgment'],
		methods:{
			back:function(){
				this.$router.go(-1)
			},
			meun:function(){
				this.flag =!this.flag
			}
		},
	}
</script>

<style scoped>
	.header{
		width: 100%;
		height: 0.9rem;
		background: #373b3e;
		color:#fff;
		position: fixed;
		top: 0;
		left: 0; 
		z-index: 999999;
	}
	.back{
		position: absolute;
		height: .9rem;
		line-height: .9rem;
	}
	div.back i{
		float: left;
		width: 0.2rem;
		height: 0.4rem;
		margin:0.25rem 0.1rem 0 0.2rem;
		background: url("../../assets/arrow.png") no-repeat;
		background-size: 100% 100%;
	}
	.meun{
		width: 50%;
		position: absolute;
		height: 0.9rem;
	}
	.meun i{
		float: left;
		width: 0.35rem;
		height: 0.3rem;
		margin:0.3rem 0 0 0.2rem;
		background: url("../../assets/meun.png") no-repeat;
		background-size: 100% 100%;
	}
	.meun ul{
		width: 60%;
		height: 6.3rem;
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 0;
		top: 0.9rem;
		z-index: 99999;
		justify-content: space-between;
		background: #333;
	}
	.meun ul li{
		width: 100%;
		height: 0.9rem;
		text-align: center;
		line-height: 0.9rem;
	}
	.title{
		/*width: 100%;*/
		width: 5rem;
		height: 100%;
		margin: 0 auto;
		text-align: center;
		line-height: .9rem;
		font-size: 0.3rem;

		white-space: nowrap;
		    text-overflow: ellipsis;
		    overflow: hidden;
	}
	.search{
		position: absolute;
		top: 0;
		right: 0;
	}
	.search i{
		float: right;
		width: 0.35rem;
		height: 0.35rem;
		margin:0.275rem 0.2rem 0 0;
		background: url("../../assets/search.png") no-repeat;
		background-size: 100% 100%;
	}
</style>
