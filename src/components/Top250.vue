<template>
  <div>
    <div class="well-received">
      <span>{{wRtitle}}</span>
      <span v-show="!wRtitle">loading...</span>
      <router-link to="/Top250All" class="fr">更多&gt;&gt;</router-link>
    </div>
    <div class="wR">
      <ul>
        <li v-for="item in wRlist">
          <router-link :to="/Top250/+item.id">
            <img class="fl" :src="item.images.small" />
            <h6 >{{item.title}}</h6>
            <div><strong>演员:</strong><span v-for="name in item.casts">{{name.name}},</span></div>
            <div><strong>剧情:</strong><span v-for="plot in item.genres">{{plot}},</span></div>           
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wRlist: [],
      wRtitle: ''
    }
  },
  mounted () {
    this.http();
  },
  methods: {
    http () {
      this.$store.dispatch('showLoading') 
      var _this = this;
      this.$http.get('https://bird.ioliu.cn/v1?url=http://api.douban.com/v2/movie/top250?start=0&count=10')
        .then(function (response) {
          _this.wRlist = response.data.subjects;
          _this.wRtitle = response.data.title;
          _this.$store.dispatch('hideLoading') 
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }

}
</script>
