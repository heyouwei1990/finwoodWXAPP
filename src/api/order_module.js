import base from './base';

/**
 * 订单模块
 */
export default class order extends base {
  static prefix = 'order/';

  /**
   * 支付信息
   */
  static payinfo(parms) {
    return this.post(`${this.prefix}payinfo`,parms);
  }

  /**
   * 立即购买
   */
  static async buynow(parms) {
    let r = await this.post(`${this.prefix}buynow`,parms);
    if(r.result.shippingAddress.length > 0) {
      for(let i = 0; i<r.result.shippingAddress.length; i++) {
        if(r.result.shippingAddress[i].isDefault == 1) {
          r.result.shippingAddress = r.result.shippingAddress[i];
        }
      }
    }else {
      r.result.shippingAddress = '';
    }
    return r;
  }

  /**
   * 查询买家或卖家订单
   */
  static listorders(parms) {
    return this.post(`${this.prefix}listorders`,parms);
  }

  /**
   * 买家订单详情
   */
  static buyerdetail(parms) {
    return this.post(`${this.prefix}buyerdetail`,parms);
  }

  /**
   * 卖家订单详情
   */
  static sellerdetail(parms) {
    return this.post(`${this.prefix}sellerdetail`,parms);
  }

  /**
   * 修改订单商品数量
   */
  static updateqty(parms) {
    return this.post(`${this.prefix}updateqty`,parms);
  }

  /**
   * 修改订单商品价格
   */
  static updateprice(parms) {
    return this.post(`${this.prefix}updateprice`,parms);
  }

  /**
   * 取消订单
   */
  static cancel(parms) {
    return this.post(`${this.prefix}cancel`,parms);
  }

  /**
   * 订单发货
   */
  static delivery(parms) {
    return this.post(`${this.prefix}delivery`,parms);
  }

  /**
   * 申请退款
   */
  static refundapply(parms) {
    return this.post(`${this.prefix}refundapply`,parms);
  }

  /**
   * 购物车数量
   */
  static cartqty(parms) {
    return this.post(`${this.prefix}cartqty`,parms);
  }

  /**
   * 添加到购物车
   */
  static addtocart(parms) {
    return this.post(`${this.prefix}addtocart`,parms);
  }

  /**
   * 移除购物车的商品
   */
  static delcartproduct(parms) {
    return this.post(`${this.prefix}delcartproduct`,parms);
  }

  /**
   * 订单确认收货
   */
  static confirmreceipt(parms) {
    return this.post(`${this.prefix}confirmreceipt`,parms);
  }

  /**
   * 订单结算信息
   */
  static async settleinfo(parms) {
    let r = await this.post(`${this.prefix}settleinfo`,parms);
    if(r.result.shippingAddress.length > 0) {
      for(let i = 0; i<r.result.shippingAddress.length; i++) {
        if(r.result.shippingAddress[i].isDefault == 1) {
          r.result.shippingAddress = r.result.shippingAddress[i];
        }
      }
    }else {
      r.result.shippingAddress = '';
    }
    return r;
  }

  /**
   * 下单确认
   */
  static confirmorder(parms) {
    return this.post(`${this.prefix}confirmorder`,parms);
  }

  /**
   * 提交支付凭证
   */
  static payvoucher(parms) {
    return this.post(`${this.prefix}payvoucher`,parms);
  }

  /**
   * 修改购物车商品数量
   */
  static updateproductcount(parms) {
    return this.post(`${this.prefix}updateproductcount`,parms);
  }

  /**
   * 计算购物车金额
   */
  static calcartamount(parms) {
    return this.post(`${this.prefix}calcartamount`,parms);
  }

  /**
   * 余额支付
   */
  static transferpay(parms) {
    return this.post(`${this.prefix}transferpay`,parms);
  }
}
