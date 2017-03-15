<template>
  <div>
    <header>
       <!-- 返回上一页 -->
       <span onclick="window.history.go(-1)">&lt;</span>
       <span>{{wRtitle}}</span>
       <!-- 没有内容的时候，现在loading中 -->
       <span v-show="!wRtitle">loading...</span>
     </header>
    <div class="wR" v-show="!loading">
      <ul>
        <!-- 遍历所有的影片 -->
        <li v-for="item in wRlist">
          <router-link :to="/ReleaseAll/+item.id">
            <!-- 电影海报 -->
            <img class="fl" :src="item.images.small" />
            <!-- 电影名 -->
            <h6 >{{item.title}}</h6>
            <div><strong>演员:</strong><span v-for="name in item.casts">{{name.name}},</span></div>
            <div><strong>剧情:</strong><span v-for="plot in item.genres">{{plot}},</span></div>           
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 页码 -->
    <div class="total" v-show="!loading,wRtitle"><b>总数：</b>{{totalALL}}&nbsp;&nbsp;<b>当前页：</b>{{page+1}}/{{total}}</div>
    <!-- 分页 -->
    <div class="paging" v-show="!loading">
      <a class="Previous" @click="Previous">&lt;&nbsp;上一页</a>
      <a class="Next" @click="next">下一页&nbsp;&gt;</a>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
let start = 0;
export default {
  data () {
    return {
      wRlist: [],
      wRtitle: '',
      totalALL: Number,
      total: Number,
      page: ''
    }
  },
  computed:mapGetters([
    'loading' // 过载动画数据管理
  ]),
  mounted () {
    // 页面打开加载内容
    start = 0;
    this.http(start);
  },
  methods: {
    http (start) {
      // console.log(start)
      var _this = this;
      // 过载动画启动
      _this.$store.dispatch('showLoading');
      // 请求开始
      // https://bird.ioliu.cn/v1?url=http://api.douban.com/v2/movie/coming_soon?start='+start+'&count=10
      this.$http.get('https://bird.ioliu.cn/v1?url=http://api.douban.com/v2/movie/coming_soon?start='+start+'&count=10')
        .then(function (response) {
          // 所有影片
          _this.wRlist = response.data.subjects;
          // 影院描述
          _this.wRtitle = response.data.title;
          // 页码
          _this.totalALL = response.data.total;
          _this.total = Math.ceil(response.data.total/10);
          // 当前页
          _this.page = start/10;
          // 请求完 动画退出
          _this.$store.dispatch('hideLoading');
        })
        .catch(function (error) {
          console.log(error);
        });

    },
    Previous () {
      // 返回上一页
      if(start <= 0) {
        return false;
      } else {
        start-=10;
      }
      // 加载请求的页面
      this.http(start);
    },
    next() {
      // 跳转下一页  
      if((start+10)/10 >= this.total) {
         return false;
      } else {
        start+=10;
      };
      // 加载请求的页面
      this.http(start);
    }
  }

}
</script>
