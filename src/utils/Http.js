import wepy from 'wepy';
import Tips from './Tips';
import MD5 from './MD5';

// HTTP工具类
export default class Http {
  static debug = true;
  static baseUrl = 'https://mapi.finwood.vip/';
  //static baseUrl = 'https://fpapi.finwood.cn/';
  static appId = '56FK32PW09Q73';
  static appSecret = 'U6XJDcA004oDU96573FKlt580404t';

  static async request (method, url, data = {}, loading = false,error = false) {
    let params = JSON.stringify({
      'bizParams': this.dic(data),
      'sysParams': {
        'appId': this.appId,
        'appSecret': this.appSecret,
        'timestamp': this.mklog(),
        'sign': MD5.hex_md5(this.appId + JSON.stringify(this.dic(data,true)) + this.appSecret)
      }
    });
    this.log(`${this.mklog()}【AJAX:-->】【M=${url}】【P=${params}】`);
    const param = {
      url: `${this.baseUrl}${url}`,
      method: method,
      data: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    if (loading) {
      Tips.loading();
    }
    const res = await wepy.request(param);
    Tips.loaded();
    if (this.isSuccess(res)) {
      if(res.data.code == 0) {
        this.log(`${this.mklog()}【M=${url}】【接口响应：】${JSON.stringify(res.data, null, 4)}`);
        return res.data;
      }else if(res.data.code == 101) {
        this.log(`登录超时code=${res.data.code}`);
        wx.navigateTo({
          url:'/pages/login/login'
        })
      }else {
        Tips.modal(res.data.message);
        this.log(`${this.mklog()}【M=${url}】【接口提示：】${res.data.message} code=${res.data.code}`);
        if(error) {
          return res.data;
        }
      }
    } else {
      throw this.requestException(res);
    }
  }

  /**
   * 判断请求是否成功
   */
  static isSuccess (res) {
    const wxCode = res.statusCode;
    // 微信请求错误
    if (wxCode !== 200) {
      return false;
    }
    return res.data
  }

  /**
   * 异常
   */
  static requestException (res) {
    const error = {};
    error.statusCode = res.statusCode;
    const wxData = res.data;
    const serverData = wxData.data;
    if (serverData) {
      error.serverCode = wxData.code;
      error.message = serverData.message;
      error.serverData = serverData;
    }
    return error;
  }

  /**
   * @description 调试用的时间戳
   * @author suwill
   * @param {none} 不需要参数
   * @example mklog()
   */
  static mklog() {
    var date = new Date(); //新建一个事件对象
    var month = date.getMonth() + 1; //获取月份
    var strDate = date.getDate(); //获取日期
    var sh = date.getHours(); //获取时
    var sm = date.getMinutes(); //获取分
    var ss = date.getSeconds(); //获取秒
    if (month >= 1 && month <= 9) { //判断月份
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (sh >= 0 && sh <= 9) {
      sh = "0" + sh;
    }
    if (sm >= 0 && sm <= 9) {
      sm = "0" + sm;
    }
    if (ss >= 0 && ss <= 9) {
      ss = "0" + ss;
    }
    var ms = date.getMilliseconds();
    if (ms >= 10 && ms <= 100) {
      ms = '0' + ms;
    } else if (ms >= 0 & ms <= 9) {
      ms = '00' + ms;
    }
    var currentdate = `20${date.getYear() - 100}-${month}-${strDate} ${sh}:${sm}:${ss}`;
    return currentdate;
  }

  /**
   * 字典排序
   */
  static dic(value,type) {
    let sdic = Object.keys(value).sort();
    let _arr = {};
    for (let i in sdic) {
      if(type){
        if(value[sdic[i]] != null){
          _arr[sdic[i]] = value[sdic[i]];
        }
      }else {
        _arr[sdic[i]] = value[sdic[i]];
      }
    }
    return _arr;
  }

  /**
   * 日志输出
   */
  static log(r) {
    if (!this.debug) {
      return;
    }
    if (typeof (r) == "object") {
      console.log(JSON.stringify(r));
    } else {
      console.log(r);
    }
  }

  static get (url, data, loading, error) {
    return this.request('GET', url, data, loading, error);
  }

  static put (url, data, loading, error) {
    return this.request('PUT', url, data, loading, error);
  }

  static post (url, data, loading, error) {
    return this.request('POST', url, data, loading, error);
  }

  static delete (url, data, loading, error) {
    return this.request('DELETE', url, data, loading, error);
  }
}
