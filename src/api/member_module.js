import base from './base';

/**
 * 会员模块
 */
export default class member extends base {
  static prefix = 'member/';

  /**
   * 企业认证结果
   */
  static companyauthen(parms) {
    return this.post(`${this.prefix}companyauthen`,parms);
  }

  /**
   * 提交企业审核
   */
  static companyapply(parms) {
    return this.post(`${this.prefix}companyapply`,parms);
  }

  /**
   * 账户余额
   */
  static accountbalance(parms) {
    return this.post(`${this.prefix}accountbalance`,parms);
  }

  /**
   * 账户信息
   */
  static info(parms) {
    return this.post(`${this.prefix}info`,parms);
  }

  /**
   * 保存账户信息
   */
  static updateinfo(parms) {
    return this.post(`${this.prefix}updateinfo`,parms);
  }

  /**
   * 个人认证结果
   */
  static presonalauthen(parms) {
    return this.post(`${this.prefix}presonalauthen`,parms);
  }

  /**
   * 提交个人认证
   */
  static personalapply(parms) {
    return this.post(`${this.prefix}personalapply`,parms);
  }

  /**
   * 我的收藏
   */
  static listfavorite(parms) {
    return this.post(`${this.prefix}listfavorite`,parms);
  }

  /**
   * 我的购物车
   */
  static async mycart(parms) {
    let r=await this.post(`${this.prefix}mycart`,parms);
    for(let i=0;i<r.result.length;i++) {
      r.result[i].itemCheck=false;
      let products=r.result[i].products;
      for(let j=0;j<products.length;j++) {
        products[j].detailCheck=false;
        products[j].style=0;
      }
    }
    return r;
  }

  /**
   * 个人中心
   */
  static centerinfo(parms) {
    return this.post(`${this.prefix}centerinfo`,parms);
  }

  /**
   * 收货地址列表
   */
  static listshoppingaddr(parms) {
    return this.post(`${this.prefix}listshoppingaddr`,parms);
  }

  /**
   * 收货地址详情
   */
  static shoppingaddrdetail(parms) {
    return this.post(`${this.prefix}shoppingaddrdetail`,parms);
  }

  /**
   * 设为默认地址
   */
  static setdefaultaddr(parms) {
    return this.post(`${this.prefix}setdefaultaddr`,parms);
  }

  /**
   * 删除收货地址
   */
  static delshoppingaddr(parms) {
    return this.post(`${this.prefix}delshoppingaddr`,parms);
  }

  /**
   * 保存收货地址
   */
  static saveshoppingaddr(parms) {
    return this.post(`${this.prefix}saveshoppingaddr`,parms);
  }

  /**
   * 会员注册
   */
  static register(parms) {
    return this.post(`${this.prefix}register`,parms,false,true);
  }

  /**
   * 会员登录
   */
  static login(parms) {
    return this.post(`${this.prefix}login`,parms,false,true);
  }

  /**
   * 小程序用户信息
   */
  static miniprogramauserinfo(parms) {
    return this.post('social/miniprogramauserinfo',parms);
  }

  /**
   * 分配小程序用户的sessionid
   */
  static miniprogramasessionid(parms) {
    return this.post('social/miniprogramasessionid',parms);
  }

  /**
   * 添加店铺成员
   */
  static shopmemberadd(parms){
    return this.post('member/shopmemberadd',parms);
  }

  /**
   * 店铺成员列表
   */
  static listshopmember(parms){
    return this.post('member/listshopmember',parms);
  }

  /**
   * 删除店铺成员
   */
  static shopmemberdel(parms){
    return this.post('member/shopmemberdel',parms);
  }

  /**
   * 会员登出
   */
  static logout(parms){
    return this.post('member/logout',parms);
  }


}
