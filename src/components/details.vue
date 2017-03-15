<template>
  <div>
     <header v-show="imgLarge">
       <span onclick="window.history.go(-1)">&lt;</span>
       <span v-show="!imgLarge">loading...</span>
     </header>
     <section v-show="imgLarge">
        <div>
            <img :src="imgLarge" alt="" />
            <h5><b>电影：</b>{{subject.title}}</h5>
            <div><b>所在地：</b><span v-for="item in subject.countries">{{item}}</span></div>
            <div><b>剧情：</b><span v-for="genre in subject.genres">{{genre}}，</span></div>
            <div><b>演员：</b><span v-for="name in subject.casts">{{name.name}}，</span></div>
            <div><b>简介：</b>{{subject.summary}}</div>
        </div>
     </section>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            subject:[],
            imgLarge:''
        }
    },
    computed:mapGetters([
      'loading'
    ]),
    watch:{
        $route(to){
            // console.log(to.path);
            // var reg=/wellReceived\/\d+/;
            // if(reg.test(to.path)){
            //     var articleId=this.$route.params.id || 0;
            //     this.fetchData(articleId);
            // }
            // console.log(this.$route.params.id)
        }
    },
    mounted (){
        var id = this.$route.params.id;
        // console.log(id)
        this.fetchData(id)
    },
    methods:{
        fetchData(id){
            var _this=this;

          this.$nextTick(function () {
            // 'https://bird.ioliu.cn/v1?url=http://api.douban.comhttp://api.douban.com/v2/movie/subject/'+id
            this.$http.get('https://bird.ioliu.cn/v1?url=http://api.douban.com/v2/movie/subject/'+id).then(function(res){
                console.log(res.data);
                _this.subject = res.data;
                _this.imgLarge = res.data.images.large
            }).catch(function(err){
                console.log(err);
            })         
           
          })
        }
    }

}
</script>