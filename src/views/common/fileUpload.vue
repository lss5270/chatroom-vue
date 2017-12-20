<template>
	<label class="upload_box">
		<!-- <input type="file" @change="upload($event)" multiple="multiple" accept="image/*"> -->
		<input type="file" @change="upload($event)" >
		<slot ></slot>	
	</label>
</template>

<script>
import g from '@/global/global'
import { Toast } from 'mint-ui'

	export default {
		data(){
			return{
				
			}
		},
		props:['url','callback'],
		methods:{
			upload: function(e){ 
				let vm = this;
				let filesData = e.target.files;
				if(!filesData){
					return false;
				}
				//let filesData = document.getElementById("file").files[0]; // js 获取文件对象
				var formData = new FormData()
					formData.append('imgFile', filesData[0])
					//接口不支持多文件
					/*for(var i=0; i< filesData.length; i++){
				        formData.append("file" , filesData[i] );
				    }*/
		
				g.post(vm.url,formData,null,function(res){
				  console.log('成功',res)
				  //成功执行父函数
				  //vm.$emit('uploadComplete',res) //子组件通过 $emit触发父组件的方法uploadComplete
				  
				  if(res.data.code === "000000"){
				    Toast({
				      message: '上传成功',
				      position: 'bottom',
				      duration: 2000
				    });

				    vm.callback(res)
				  }else{
				    Toast({
				      message: '上传失败',
				      position: 'bottom',
				      duration: 2000
				    });
				  }
				},function(res){
				  	
				  	Toast({
				      message: '上传失败',
				      position: 'bottom',
				      duration: 2000
				    });
				},false)
			},
			
		},
	}
</script>

<style scoped>
.upload_box input[type="file"]{
	display:none;
	
}
</style>