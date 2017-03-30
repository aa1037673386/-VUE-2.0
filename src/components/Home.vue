<template>
  <div>
  <el-button>默认按钮</el-button>
<el-button type="primary">主要按钮</el-button>
<el-button type="text">文字按钮</el-button>
<el-switch
  v-model="value1"
  on-text=""
  off-text="">
</el-switch>
<el-switch
  v-model="value2"
  on-color="#13ce66"
  off-color="#ff4949">
</el-switch>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'


export default {
  data () {
    return {
        value1: true,
        value2: true
    }
  },
  computed:mapGetters([
    'loading'
  ]),
  mounted () {
    this.proto();
  },
  methods: {
    proto () {
      var that = this;
      // http://172.13.31.187:9205/DemoSvr/TestProtobuf/
      // this.$http.get('http://172.13.31.187:9205/DemoSvr/TestProtobuf/'})
      //   .then(function (RequestPack) {
          protobuf.load("./src/assets/proto/awesome.proto")
              .then(function(root) {
                  //  获取消息类型
                  var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
                  // 典型的负载
                  var payload = { awesomeField: "AwesomeString"}; 
                   // 必要时验证有效载荷（如可能不完整或无效）
                  var errMsg = AwesomeMessage.verify(payload);
                  if (errMsg)
                      throw Error(errMsg);
                  // 创建新消息
                  var message = AwesomeMessage.fromObject(payload); //  或创建使用时，如果已知道有效载荷

                   // 编码信息的uint8array（浏览器）或Buffer（节点）
                  var buffer = AwesomeMessage.encode(message).finish();
                  // 解码uint8array（浏览器）或Buffer（节点）到一个消息
                  var message = AwesomeMessage.decode(buffer);
                   // 用信息做某事
                  console.log(message)
              }) 
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      
      // this.$http('http://172.13.31.187:9205/DemoSvr/TestProtobuf/');
      var instance = this.$http.create({
        baseURL: 'http://172.13.31.187:9205/DemoSvr/TestProtobuf/',
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
      });
    }
  }
}
</script>