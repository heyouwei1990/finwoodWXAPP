import base from './base';

/**
 * 数据模块
 */
export default class data extends base {
  static prefix = 'data/';

  /**
   * 首页数据
   */
  static async homedata() {
    let data=await this.post(`${this.prefix}homedata`);
    for(let i=0;i<data.result.lastestProduct.length;i++) {
      data.result.lastestProduct[i].lastModifiedTime=data.result.lastestProduct[i].lastModifiedTime.substring(0,10);
    }
    for(let i=0;i<data.result.lastestInquiry.length;i++) {
      data.result.lastestInquiry[i].lastModifiedTime=data.result.lastestInquiry[i].lastModifiedTime.substring(0,10);
    }
    return data;
  }

  /**
   * 搜索求购
   */
  static async searchinquiry(parms) {
    let data=await this.post(`${this.prefix}searchinquiry`,parms);
    for(let i=0;i<data.result.list.length;i++) {
      data.result.list[i].lastModifiedTime=data.result.list[i].lastModifiedTime.substring(0,10);
    }
    return data;
  }

  /**
   * 发布求购
   */
  static submitinquiry(parms) {
    return this.post(`${this.prefix}submitinquiry`,parms);
  }

  /**
   * 求购详情
   */
  static inquirydetail(parms) {
    return this.post(`${this.prefix}inquirydetail`,parms);
  }

  /**
   * 我要供货
   */
  static supplyquotate(parms) {
    return this.post(`${this.prefix}supplyquotate`,parms);
  }

  /**
   * 申请贷款
   */
  static applyloan(parms) {
    return this.post(`${this.prefix}applyloan`,parms);
  }

  /**
   * 首页最新现货（带分页）
   */
  static async lastestproduct(parms) {
    let data=await this.post(`${this.prefix}lastestproduct`,parms);
    for(let i=0;i<data.result.list.length;i++) {
      data.result.list[i].lastModifiedTime=data.result.list[i].lastModifiedTime.substring(0,10);
    }
    return data
  }

}
