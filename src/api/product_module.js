import base from './base';

/**
 * 商品模块
 */
export default class product extends base {
  static prefix = 'product/';

  /**
   * 获取热搜索关键词
   */
  static hotsearchkey() {
    return this.post(`${this.prefix}hotsearchkey`);
  }

  /**
   * 商品详情
   */
  static detail(parms) {
    return this.post(`${this.prefix}detail`,parms);
  }

  /**
   * 商品搜索
   */
  static async list(parms) {
    let r = await this.post(`${this.prefix}list`,parms);
    for(let i=0;i<r.result.list.length;i++) {
      r.result.list[i].lastModifiedTime=r.result.list[i].lastModifiedTime.substring(0,10);
    }
    return r;
  }

  /**
   * 收藏/取消收藏商品
   */
  static collect(parms) {
    return this.post(`${this.prefix}collect`,parms);
  }

  /**
   * 是否收藏商品
   */
  static isfavorite(parms) {
    return this.post(`${this.prefix}isfavorite`,parms);
  }



  /**以下为店铺模块*/

  /**
   * 获取卖家店铺商品（商品管理）
   */
  static myshopproducts(parms) {
    return this.post('shop/myshopproducts',parms);
  }

  /**
   * 刷新商品
   */
  static refresh(parms) {
    return this.post(`${this.prefix}refresh`,parms);
  }

  /**
   * 商品上架
   */
  static pullon(parms) {
    return this.post(`${this.prefix}pullon`,parms);
  }
  /**
   * 商品下架
   */
  static pulloff(parms) {
    return this.post(`${this.prefix}pulloff`,parms);
  }
  /**
   * 商品删除
   */
  static delete(parms) {
    return this.post(`${this.prefix}delete`,parms);
  }

  /**
   * 商品编辑详情
   */
  static async editproduct(parms) {
    let r = await this.post(`${this.prefix}editproduct`,parms,true);
    //品牌国内加工置顶操作
    for(let i=0;i<r.result.relationVB.length;i++) {
      if(r.result.relationVB[i].text == '国内加工') {
        let value = r.result.relationVB[i];
        r.result.relationVB.splice(i,1);
        r.result.relationVB.unshift(value);
        break;
      }
    }

    for(let i = 0;i<r.result.lstWarehouse.length;i++) {
      r.result.lstWarehouse[i].text = r.result.lstWarehouse[i].fullName;
      r.result.lstWarehouse[i].value = r.result.lstWarehouse[i].pkid;
    }
    for(let i = 0;i<r.result.lstCategory.length;i++) {
      r.result.lstCategory[i].text = r.result.lstCategory[i].name;
      r.result.lstCategory[i].value = r.result.lstCategory[i].pkid;
    }
    let lstAdvanceRadio=[];
    for(let i = 0;i<r.result.lstAdvanceRadio.length;i++) {
      lstAdvanceRadio.push({
        text:r.result.lstAdvanceRadio[i],
        value:null
      })
    }
    r.result.lstAdvanceRadio = lstAdvanceRadio;
    try {
      let lstShopRegion = [];
      for(let i of r.result.lstShopRegion) {
        lstShopRegion.push({
          text:i.warehousePosition,
          value:null
        })
      }
      r.result.lstShopRegion = lstShopRegion;
    } catch (error) {

    }
    return r;
  }

  /**
   * 保存商品
   */
  static save(parms) {
    return this.post(`${this.prefix}save`,parms);
  }

  /**
   * 判断企业认证及是否开店
   */
  static judgementshop(parms) {
    return this.post('shop/judgementshop',parms);
  }


}
