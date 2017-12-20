<template>
	<div class="login">
	      <div class="logo">
	      	<p>IP资源库</p>
	      </div>
	      <div class="info">
	        <label class="phone"><i></i><input type="text" placeholder="用户名" v-model="username"></label>
	        <label class="password"><i></i><input type="password" placeholder="密码" v-model="password"></label>
	        <label class="code">
	        	<i></i><input type="text" placeholder="验证码"  v-model="captrue">
	        	<span @click="sendVerifyCode()" v-if="getVerifyCode">获取验证码</span>
	        	<span  v-else>{{sec}}s</span>
	        </label>
	        <label class="remeber" @click="check">
	        	<input type="checkbox" v-model="flag" style="display:none;">
	        	<div class="checkbox" ></div>
	        	<span>系统记住我</span>

	        </label>
	        <div class="deter" @click="login">登录</div>
	      </div>
	    </div>
  	</div>
</template>

<script>
	import g from '@/global/global'
	import { Toast } from 'mint-ui'
	import Cookies from 'js-cookie';
	import Vue from 'vue';

	export default {
		data(){
			return{
				flag:false,
				username: '',
				password: '',
				captrue: '',

				sec: 120,
				getVerifyCode: true,
			}
		},
		created:function(){
			let vm = this;
			// if(Cookies.get('username')){
			// 	vm.username = Cookies.get('username');
			// 	vm.flag = true;
			// }
			if(localStorage.getItem('username')){
				vm.username = localStorage.getItem('username');
				vm.flag = true;
			}
		},
		methods:{
			check:function(){
				// var icon = document.querySelector('.checkbox');
				// if(this.flag){
				// 	icon.style.background = "url('../src/assets/deter.png')";
				// 	icon.style.backgroundRepeat = "no-repeat";
				// 	icon.style.backgroundSize = "100% 100%";
					
				// }
				// if(!this.flag){
				// 	icon.style.background = "#ccc";
					
				// }
				// this.flag=!this.flag ;
			},
			//发送验证码后显示倒计时
			countDown:function(){
				let vm = this;
				//const sec = 120;
				if(vm.sec === 0){//console.log(0)
					clearTimeout(set)
					vm.getVerifyCode = true
				}else{
					vm.sec --
					
				}
				// let set = setInterval(function(){
				// 	console.log(11)
				// },1000)
				// function 
				var set = setTimeout(function () {
				  	vm.countDown()
				}, 1000)
			},
			//发送验证码
			sendVerifyCode:function(){
				let vm = this;
				let par = {
				  'username': vm.username
				};
				if(!vm.username){
					Toast('用户名不能为空！');
					return false;
				}
				
				g.post(g.baseUrl+'/api/common/sendVerifyCode',par,null,function(res){
				  console.log('成功',res)

				  if(res.data.code === "000000"){
				  	Toast('验证码发送成功');
				  	//显示倒计时
				  	vm.getVerifyCode = false;
				  	vm.sec = 121;
				  	vm.countDown();
				  }else{
				  	Toast(res.data.content);
				  	
				  }
				},function(res){
				  console.log('失败')
				},false)
			},
			//登录
			login:function(){
				let vm = this;
				//先校验参数不能为空
				if(!vm.username){
					Toast('用户名不能为空！');
					return false;
				}
				if(!vm.password){
					Toast('密码不能为空！');
					return false;
				}
				if(!vm.captrue){
					Toast('验证码不能为空！');
					return false;
				}

				let par = {
					  "captrue": vm.captrue,
					  "password": vm.password,
					  "username": vm.username
					}

				g.post(g.baseUrl+'/api/sys/login',par,null,function(res){
				  console.log('成功',res)
				  if(res.data.code === "000000"){
				  	//set cookie  res.data.result.authToken
				  	Toast('登录成功');
				  	//设置token和用户id
				  	// Cookies.set('auth-token', res.data.result.authToken, { expires: 1 });
				  	
				  	// Vue.http.headers.common['auth-token'] = 'Bearer.'+res.data.result.authToken;

				  	localStorage.setItem('auth-token', res.data.result.authToken)
					Vue.http.headers.common['auth-token'] = 'Bearer.'+res.data.result.authToken;

				  	//记住用户名
				  	if(vm.flag){
				  		// Cookies.set('username', vm.username, { expires: 30 });
				  		localStorage.setItem('username', vm.username)
				  	}else{
				  		// Cookies.remove('username');
				  		localStorage.removeItem('username');
				  	}
				  	//跳转首页
				  	vm.$router.push({ path: '/trademark' })
				  }else{
				  	Toast(res.data.content);
				  	
				  }
				},function(res){
				  console.log('失败')

				})
			}
		},
		mounted(){
		}
		// components
	}
</script>

<style scoped>
	.remeber input:checked + .checkbox{
		background: url('../assets/deter.png') no-repeat;
		background-size: cover;
	}

	.login{
	  width: 100%;
	}
	.logo{
	  width: 100%;
	  height: 5.29rem;
	  background: url("../assets/logo.png") no-repeat;
	  background-size: 100% 100%;
	}
	.logo p{
		font-size: 0.50rem;
		color: #FF0000;
		text-align: center;
		padding-top: 3.7rem;
	}
	.info{
	  width: 7rem;
	  height: 7rem;
	  background: #fff;
	  border-radius: 5px;
	  border: 1px solid #f6e7d4;
	  box-shadow:1px 1px 1px #f6efe5;
	  margin: -0.95rem auto 0;
	  z-index: 999;
	}
	.info label{
		display: block;
		margin:0 auto;
		width: 6.1rem;
		height: 0.9rem;
		background: #f5f5f5;
		border-radius: 20px;
		position: relative;
	}
	.info label i{
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		position: absolute;
		top: 50%;
		margin-top: -0.2rem;
		left: 0.4rem;
	}
	input[type~=text],input[type~=password]{
		width: 5rem;
		height: 0.9rem;
		color:#b6b6b6;
		line-height: 0.9rem;
		outline: none;
		background:#f5f5f5;
		margin-left: 1rem;
		font-size: 0.3rem;
		font-weight: bold;
	}
	label.phone{
		margin-top: 0.64rem;
	}
	.phone i{
		background:url("../assets/header.png") no-repeat;
		background-size: 100%;
	}
	label.password{
		margin-top: 0.4rem;
	}
	.password i{
		background:url("../assets/password.png") no-repeat;
		background-size: 100% 100%;
	}
	label.code{
		margin-top: 0.4rem;
	}
	.code i{
		background: url("../assets/code.png") no-repeat;
		background-size: 100% 100%;
	}
	.code span{
		position: absolute;
		width: 2.05rem;
		height: 0.55rem;
		line-height: 0.55rem;
		border: 1px solid #f08200;
		text-align: center;
		border-radius: 20px;
		top: 50%;
		margin-top: -0.275rem;
		right: 0.32rem;
		color:#f08200;
	}
	label.remeber{
		background: #fff;
		margin-top: 0.2rem;
	}
	.checkbox{
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: #ccc;
		position: absolute;
		top: 50%;
		margin-top: -0.2rem;
		left: 0.4rem;
	}
	.remeber span{
		height: 0.9rem;
		line-height: 0.9rem;
		margin-left: 1rem;
		font-size: 0.3rem;
		color:#999;
	}
	.deter{
		width: 5.15rem;
		height: 0.9rem;
		background: url("../assets/button.png") no-repeat;
		background-size: 100% 100%;
		margin:0 auto;
		text-align: center;
		line-height: 0.9rem;
		color:#fff;
		font-size: 0.3rem;
		font-weight: bold;
		margin-top: 0.2rem;
	}
</style>