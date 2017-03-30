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
      }) 
