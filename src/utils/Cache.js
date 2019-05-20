import wepy from 'wepy';
import {
  TOKEN,
  USER_INFO
} from "./Constant";

export default class Cache {
  /**
   * 判断是否授权&&登录
   */
  static isLogin() {
    if(wepy.getStorageSync(TOKEN) == null || wepy.getStorageSync(TOKEN) == "") {
      wepy.navigateTo({
        url:'/pages/login/login'
      })
      return false;
    }
    return true;
  }

  /**
   * 帐号登录
   */
  static login(value, type = false) {
    wepy.setStorageSync(TOKEN,value);
    if(type) {
      wx.navigateBack({
        delta: 2
      })
    }else {
      wepy.navigateBack();
    }
  }

}
