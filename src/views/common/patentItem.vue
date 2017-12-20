<template>
    <div class="item">
      <router-link to="/patentDetail">
        <img src="http://via.placeholder.com/300/300"  alt=""/>
      </router-link>
      <div class="info">
        <router-link to="/patentDetail">
            <div class="name">甲方乙方</div>
        </router-link>
            <div class="no">申请号：55555555</div>
            <div class="category">合作类型：合作类型</div>
            <div class="expire">专利类型：专利类型</div>
            <div class="expire">授权时间：2017.02.27</div>
            <div class="price">￥17990</div>
        
        <div class="desc" title="商品服务列表，如果过长就隐藏部分，点击详情查看全部">摘要：商品服务列表，如果过长就隐藏部分，点击详情查看全部</div>
      </div>

      <span class="btn btn-favorite">收藏</span>
      <span class="btn btn-favorite on">已收藏</span>
      <span class="btn btn-freeze on">已冻结</span>
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item {
    padding: 0.1rem;
    position: relative;
    border-radius: 0.1rem;
    background: #fff;
    margin-top: 0.1rem;
    height: 2.7rem;
    overflow: hidden;
}

.item img {
    width: 2.1rem;
    height: 2.7rem;
}

.info {
    display: inline-block;
    vertical-align: top;
    font-size:0.22rem;
    margin-left: 0.1rem;
    max-width: 60%
}

.name {
    font-size: 0.32rem;
    color:#333;
    font-weight: bold;
    margin-top: 0.1rem;
}

.no {
    margin-top: 0.1rem;
    color: #999;    
    line-height: 0.3rem;
}

.category {
    color: #999;
    line-height: 0.3rem;
}

.expire {
    color: #999;
    line-height: 0.3rem;
}

.desc {
    /*width: 80%;*/
    margin-top: 0.2rem;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    line-height: 0.3rem;

}

.btn-favorite {
    background: #fe8346;
    position: absolute;
    width: 1rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    color: #fff;
    font-size: 0.18rem;
    border-radius:0.05rem;
    right: 0.2rem;
    top: 0.2rem;
}
.btn-freeze {
    position: absolute;
    width: 1rem;
    height: 0.3rem;
    line-height: 0.33rem;
    text-align: center;
    color: #ccc;
    font-size: 0.18rem;
    border-radius:0.05rem;
    right: 0.2rem;
    top: 0.6rem;
    border: 0.01rem solid rgb(244,244,244);
}
.btn-favorite.on {
  background: #ccc;
}
.price {
    color: #f52e2e;
    margin-top: 0.1rem;
    border-bottom: 0.01rem solid rgb(244,244,244);
    line-height: 0.4rem;
    font-size: 0.28rem;
}
a {
    text-decoration: none;
}


</style>
