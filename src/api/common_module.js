import base from './base';

/**
 * 通用模块
 */
export default class common extends base {
  static prefix = 'common/';

  /**
   * 获取物流公司列表
   */
  static listlogistics() {
    return this.post(`${this.prefix}listlogistics`);
  }

  /**
   * 获取省数据
   */
  static listprovince() {
    return this.post(`${this.prefix}listprovince`);
  }

  /**
   * 获取市数据
   */
  static listcity(parms) {
    return this.post(`${this.prefix}listcity`,parms);
  }

  /**
   * 生成图片验证码
   */
  static verifyimg(parms) {
    return this.post(`${this.prefix}verifyimg`,parms);
  }

  /**
   * 发送短信验证码
   */
  static sendsms(parms) {
    return this.post(`${this.prefix}sendsms`,parms,false,true);
  }

  /**
   * 获取全局基础数据
   */
  static globalinfo() {
    return this.post(`${this.prefix}globalinfo`);
  }
}
