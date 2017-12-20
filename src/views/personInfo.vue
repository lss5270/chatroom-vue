<template>
  <div class="">

    <elHead title="个人信息" :judgment="judgment"></elHead>




    <div class="body">
      <!-- 非编辑状态 -->
      <div class="info_box info_noEdit" v-if="!isEdit">
        <ul>
          <li class="clearfix">
            <label class="fl">我的头像</label>
            <span class="fr"><img :src="userInfo.photo" alt="" class="img_avatar"></span>
          </li>
          <li class="clearfix">
            <label class="fl">姓名</label>
            <span class="fr">{{userInfo.name}}</span>
          </li>
          <li class="clearfix">
            <label class="fl">职位</label>
            <span class="fr">{{userInfo.job}}</span>
          </li>
        </ul>

        <ul>
          <li class="clearfix">
            <label class="fl">微信号</label>
            <span class="fr">{{userInfo.wechatNum}}</span>
          </li>
          <li class="clearfix">
            <label class="fl">QQ</label>
            <span class="fr">{{userInfo.qqNum}}</span>
          </li>
          <li class="clearfix">
            <label class="fl">手机</label>
            <span class="fr">{{userInfo.mobile}}</span>
          </li>
        </ul>

        <ul>
          <li class="clearfix">
            <label class="fl">地址</label>
            <span class="fr">{{userInfo.address}}</span>
          </li>

        </ul>

      </div>

      <!-- 编辑状态 -->
      <div class="info_box info_edit" v-else>
        <ul>
          <li class="clearfix">
            <label class="fl">我的头像</label>

            <span class="fr">
             
                
                <fileUpload :url="uploadUrl"  :callback="uploadComplete"><img :src="userInfo.photo" alt="" class="img_avatar"></fileUpload>
              
            </span>
          </li>
          <li class="clearfix">
            <label class="fl">姓名</label>
            <span class="fr">{{userInfo.name}}</span>
          </li>
          <li class="clearfix">
            <label class="fl">职位</label>
            <span class="fr">{{userInfo.job}}</span>
          </li>
        </ul>

        <ul>
          <li class="clearfix">
            <label class="fl">微信号</label>
            <span class="fr"><input type="text" v-model="userInfo.wechatNum"></span>
          </li>
          <li class="clearfix">
            <label class="fl">QQ</label>
            <span class="fr"><input type="text" v-model="userInfo.qqNum"></span>
          </li>
          <li class="clearfix">
            <label class="fl">手机</label>
            <span class="fr">{{userInfo.mobile}}</span>
          </li>
        </ul>

        <ul>
          <li class="clearfix">
            <label class="fl">地址</label>
            <span class="fr"><input type="text" v-model="userInfo.address"></span>
          </li>

        </ul>

      </div>

      <div class="btn_edit" @click="changeEdit()" v-if="!isEdit">编辑</div>
      <div class="btn_save" @click="saveUserInfo" v-else>保存</div>

    </div>
  </div>
</template>

<script>
 
  import g from '@/global/global'
  import { Toast } from 'mint-ui'



  // 头像，微信号，手机号，地址这几个可以改
  export default {
    name: 'HelloWorld',
    data () {
      return {
        isEdit:false,   //编辑标示符
        judgment:{
          meun: true,
          text: false,
          search: false
        },
        userInfo:{
          //av: 'http://via.placeholder.com/300/300',
        },
        uploadUrl: g.baseUrl+'/api/common/ipresources/upload',
      }
    },
    
    created: function(){
      // document.getElementsByTagName('body')[0].className = 'gray'
     
      let vm = this;
      // document.getElementsByTagName('body')[0].style.backgroundColor = '#efefef';
      vm.getUserInfo();
    },
    mounted: function(){
      let vm = this;
      
    },
    methods:{
      changeEdit: function(){
        var vm = this;
        vm.isEdit = true;
      },
      //获取用户信息
      getUserInfo: function(){
        var vm = this;
        g.get(g.baseUrl+'/api/sys/user/infoData',{},function(res){
          console.log('成功',res)
          vm.userInfo = res.data.result;
          console.log('---------',vm.userInfo)
        },function(res){
          console.log('失败')
        })

        /*g.post('/api/common/sysTime',{},null,function(res){
         console.log('成功',res)
         },function(res){
         console.log('失败')
         })*/
      },
      //保存用户信息
      saveUserInfo:function(){
        var vm = this;

        g.post(g.baseUrl+'/api/sys/user/save',vm.userInfo,null,function(res){
          console.log('提交成功',res)

          if(res.data.code === "000000"){
            Toast('修改成功');
            setTimeout(function(){
              //window.location.reload()
              vm.isEdit = false;
              vm.getUserInfo();
            },1000)
          }else{
            Toast('修改失败');
          }
        },function(res){
          console.log('失败')
        })
      },
      uploadComplete: function(res){
        let vm = this;
        // console.log('上传完成 返回-----',res);alert('上传完成 返回-----',res.data.result.url)
        vm.userInfo.photo = res.data.result.url;


      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .body{
    background: #efefef !important;

  }
  .img_avatar{
    width: 0.8rem;
    height: 0.8rem;
    vertical-align: middle;
  }

  .info_box{
    padding-top: 0.24rem;
    ul{
      margin-bottom: 0.24rem;
      background: #fff;
    }
    li{
      padding: 0 0.28rem;
      border-bottom: 1px solid #ededed;
      line-height: 1rem;
      .fl{
        color: #242424;
        font-size: 0.3rem;
        font-weight: bold;
      }
      .fr{
        color: #959595;
        font-size: 0.24rem;
        max-width: 5.5rem;
        input{
          line-height: 1rem;
          width: 5rem;
          text-align: right;
          padding: 0 0.2rem;
          font-size: 0.24rem;
        }
      }
    }
  }
  .btn_edit,.btn_save{
    margin: 0.7rem 0.28rem;
    background: #ffe4d0;
    border-radius: 0.1rem;
    color: #f08200;
    font-size: 0.3rem;
    line-height: 0.94rem;
    text-align: center;

  }
  .btn_save{
    background: #f08200;
    color: #fff;
  }
</style>
