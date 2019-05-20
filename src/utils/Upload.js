import HTTP from './Http'
import MD5 from './MD5'
import Tips from './Tips'

//图片上传
export default class Upload extends HTTP {

  static minigramupload(self,index,data) {
    var _this = this;
    wx.chooseImage({
      count: 1, //最多可以选择的图片张数，默认9
      sizeType: ["compressed","original"], // 可以指定是原图还是压缩图，默认二者都有 "original" compressed
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: (r)=> {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        Tips.loading('图片上传中...')
        //_this.log(r);
        var tempFilePaths = r.tempFilePaths;
        var suffix = tempFilePaths[0].split('.')[tempFilePaths[0].split('.').length-1];
        data.suffix = suffix;
        let signData = JSON.stringify({
          'bizParams': this.dic(data),
          'sysParams': {
            'appId': this.appId,
            'appSecret': this.appSecret,
            'timestamp': this.mklog(),
            'sign': MD5.hex_md5(this.appId + JSON.stringify(this.dic(data,true)) + this.appSecret)
          }
        });
        _this.log(`${this.mklog()}【AJAX:-->】【M=file/minigramupload】【图片路径：】${tempFilePaths[0]}【P=${signData}】`);;
        wx.uploadFile({
          url: `${this.baseUrl}file/minigramupload`,
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'signData': signData
          },
          success: (res)=>{
            Tips.loaded();
            if(this.isSuccess(res)) {
              let data = JSON.parse(res.data);
              _this.log(`${this.mklog()}【M=file/minigramupload】【接口响应：】${res.data}`);;
              if(data.code == 0) {
                self.uploadUrl[index]=data.result;
                self.preview[index]=r.tempFilePaths[0];
                self.$apply();
              }else {
                try {
                  self.$invoke('toast', 'show', {
                    message:data.message,
                  });
                } catch (error) {
                  Tips.error(data.message);
                }
              }
            } else {
              throw this.requestException(res);
            }
          }
        })
      }
    });
  }



}
