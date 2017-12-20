<template>
	<div class="main">
		<elHead :title="title" :judgment="judgment"></elHead>
		<div class="contract">
			<h3>合同扫描件：<fileUpload :url="uploadUrl"  :callback="uploadComplete1">选择文件</fileUpload></h3>
			<ul class="thumbnail clearfix">
              <li v-for="item in contractImg" v-if="item!=''" @click="delcontractImg(item)">    
                <img :src="item" alt="" class="img_avatar">
                <i>X</i>
              </li>
             
			</ul>
		</div>
		<div class="receipt">
			<h3>收据扫描件：<fileUpload :url="uploadUrl"  :callback="uploadComplete2">选择文件</fileUpload></h3>
			<ul class="thumbnail clearfix">
              <li v-for="item in receiptImg" v-if="item!=''" @click="delreceiptImg(item)">    
                <img :src="item" alt="" class="img_avatar">
                <i>X</i>
              </li>
             
			</ul>
		</div>
		<div class="deter">
			<h3>确认单扫描件：<fileUpload :url="uploadUrl"  :callback="uploadComplete3">选择文件</fileUpload></h3>
			<ul class="thumbnail clearfix">
              <li  v-for="item in confirmImg" v-if="item!=''" @click="delconfirmImg(item)">    
                <img :src="item" alt="" class="img_avatar">
                <i>X</i>
              </li>
             
			</ul>
		</div>
		<div class="btn" @click="submit">确定</div>
		<div class="cancel" @click="cancel">取消</div>
	</div>
</template>

<script>

import g from '@/global/global'
import { Toast } from 'mint-ui'
	export default {
		data(){
			return {
				title: '上传证明文件',
				judgment:{
					text:false,
					back:true,
					meun:false,
					search:false
				},
				confirmImg: [],
				contractImg: [],
				receiptImg: [],
				isEdit: false,
				uploadUrl: g.baseUrl+'/api/common/ipresources/upload',
			}
		},
		props:[],
		
		created:function(){
			let vm = this;
			vm.getList()
		},
		methods:{
			//获取附件列表
			getList:function(){
			  var vm = this;
			  var _id = vm.$route.params.id;
			  g.post(g.baseUrl+'/api/sales/wap/order/detail',{'orderId':_id},null,function(res){
			    vm.listData = res.data.result;
			    console.log('----------',vm.listData);
			    //合同和收据 附件是必填
			    if(res.data.code === "000000" && res.data.result.contractImg.length>0){
			    	vm.title = "订单编辑";
			    	vm.receiptImg = res.data.result.receiptImg!='' ? res.data.result.receiptImg.split(',') : [];
			    	vm.contractImg = res.data.result.contractImg!='' ? res.data.result.contractImg.split(',') : [];
			    	vm.confirmImg = res.data.result.confirmImg!='' ? res.data.result.confirmImg.split(',') : [];

			    	//切换到附件编辑模式（下单和附件编辑）
			    	vm.isEdit = true;
			    }else{
			    	
			    }
			    
			   
			    
			    // console.log(that.confirmImg)
			  },function(res){})
			},
			//合同扫描件
			uploadComplete1: function(res){
				let vm = this;
				vm.contractImg.push(res.data.result.url);
			},
			delcontractImg:function(item){
				let vm = this;
				let index = vm.contractImg.indexOf(item);
				vm.contractImg.splice(index,1)
			},
			//收据扫描件：
			uploadComplete2: function(res){
				let vm = this;
				vm.receiptImg.push(res.data.result.url);
			},
			delreceiptImg:function(item){
				let vm = this;
				let index = vm.receiptImg.indexOf(item);
				vm.receiptImg.splice(index,1)
			},
			//确认单扫描件：
			uploadComplete3: function(res){
				let vm = this;
				vm.confirmImg.push(res.data.result.url);
			},
			delconfirmImg:function(item){
				let vm = this;
				let index = vm.confirmImg.indexOf(item);
				vm.confirmImg.splice(index,1)
			},
			submit() {
				var that = this;
				if(that.contractImg.length == 0){
					Toast('合同扫描件不能为空');
					return false;
				}
				if(that.receiptImg.length == 0){
					Toast('收据扫描件不能为空');
					return false;
				}


				var _id = that.$route.params.id;
				var _confirmImg = that.confirmImg.join(',');
				var _contractImg = that.contractImg.join(',');
				var _receiptImg = that.receiptImg.join(',');


				
				if(that.isEdit){
					//编辑
					g.post(g.baseUrl+'/api/sales/wap/order/edit',{'orderId':_id,confirmImg:_confirmImg,contractImg:_contractImg,receiptImg:_receiptImg},null,function(res){
						if(res.data.code === "000000"){
							Toast('修改成功');
							//跳转已下单列表
							that.$router.go(-1);
						}else{
							Toast(res.data.content);
						}
					},function(res){})
				}else{
					//下单
					g.post(g.baseUrl+'/api/sales/wap/order/submit',{'goodId':_id,confirmImg:_confirmImg,contractImg:_contractImg,receiptImg:_receiptImg},null,function(res){
						if(res.data.code === "000000"){
							Toast('订单提交成功');
							//跳转已下单列表
							that.$router.push({ path: '/order' });
						}else{
							Toast(res.data.content);
						}
					},function(res){})
				}
				
			},
			cancel() {
				var that = this;
				
				that.$router.go(-1)
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.thumbnail{
		margin: 0.3rem 0.5rem;
		li{
			float: left;
			margin:0 0.2rem 0.2rem 0;
			position: relative;
			width: 1.2rem;
			height: 1rem;
			text-align: center;
			overflow: hidden;
			img{
				width: 100%;
				/*max-height: 100%;*/
			}
			i{
				position: absolute;
				right: 0;
				top: 0;
				color:red;
			}
		}
	}
	.main{
		padding-bottom: 1rem;
	}
	.contract{
		width: 100%;
		/*height: 1.9rem;*/
		margin-top: 1.32rem;
	}
	h3{
		padding-left: 0.5rem;
		font-size: 0.3rem;
		font-weight: bold;
	}
	h3 label{
		display: inline-block;
		width: 1.45rem;
		height: 0.4rem;
		border:1px solid #c2c2c2;
		border-radius: 5px;
		font-size: 0.2rem;
		color:#c2c2c2;
		text-align: center;
		line-height: 0.4rem;
	}
	h3 label input{
		display: none;
	}

	/*.thumbnail .img_avatar{
		display: inline-block;
		width: 1.25rem;
		height: 1rem;
		background: #ffefdc;
		margin-left: 0.2rem;
		margin-top: 0.25rem;
		margin-bottom: 0.45rem;
		position: relative;
	}
	.thumbnail div img{
		width: 100%;
		height: 100%;
		vertical-align: top;
	}*/
	.thumbnail div:nth-child(1){
		margin-left: 0.5rem;
	}
	.btn{
		width: 6rem;
		height: 0.6rem;
		margin:0 auto;
		line-height: 0.6rem;
		text-align: center;
		color:#fff;
		background:#f08200;
		border-radius: 20px;
		font-size: 0.3rem;
		margin-top: 1.5rem;
	}
	.cancel{
		width: 6rem;
		height: 0.6rem;
		margin:0 auto;
		line-height: 0.6rem;
		text-align: center;
		color:#fff;
		background:#ccc;
		border-radius: 20px;
		font-size: 0.3rem;
		margin-top: 0.2rem;
	}
	i.delete{
		position: absolute;
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 50%;
		background:url('../assets/delete.png') no-repeat;
		background-size: 100% 100%;
		top: -0.15rem;
		right: -0.15rem;
	}
</style>