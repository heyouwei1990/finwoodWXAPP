/**
 * 提示与加载工具类
 */
export default class Tips {
  static isLoading = false;
  static pause = false;
  static timeout = 1000;

  /**
   * 弹出提示框
   */

  static success (title = '提示', duration = this.timeout) {
    wx.showToast({
      title: title,
      icon: 'success',
      mask: true,
      duration: duration
    });
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, duration);
      });
    }
  }

  /**
   * 弹出确认窗口
   */
  static modal (text = '是否确认', title = '芬木提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: false,
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      });
    });
  }

  /**
   * 弹出确认取消窗口
   */
  static confirm (text = '是否确认', payload = {}, title = '芬木提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve(payload);
          } else if (res.cancel) {
            reject(payload);
          }
        },
        fail: res => {
          reject(payload);
        }
      });
    });
  }

  static toast (title = '提示', onHide, icon = 'success') {
    wx.showToast({
      title: title,
      icon: icon,
      mask: true,
      duration: this.timeout
    });
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, this.timeout);
    }
  }

  /**
   * 警告框
   */
  static alert (title = '警告') {
    wx.showToast({
      title: title,
      image: '/images/icons/alert.png',
      mask: true,
      duration: this.timeout
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, this.timeout);
    });
  }

  /**
   * 错误框
   */

  static error (title = '错误', onHide) {
    wx.showToast({
      title: title,
      image: '/images/icons/error.png',
      mask: true,
      duration: this.timeout
    });
    // 隐藏结束回调
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, this.timeout);
    }
  }

  /**
   * 弹出加载提示
   */
  static loading (title = '加载中') {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    if (wx.showLoading) {
      wx.showLoading({
        title: title,
        mask: true
      });
    } else {
      wx.showNavigationBarLoading();
    }
  }

  /**
   * 加载完毕
   */
  static loaded () {
    if (this.isLoading) {
      this.isLoading = false;
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideNavigationBarLoading();
      }
    }
  }

  /**
   * 弹出下拉动作栏
   */
  static action (...items) {
    return new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: items,
        success: function (res) {
          const result = {
            index: res.tapIndex,
            text: items[res.tapIndex]
          };
          resolve(result);
        },
        fail: function (res) {
          reject(res.errMsg);
        }
      });
    });
  }

  static actionWithFunc (items, ...functions) {
    wx.showActionSheet({
      itemList: items,
      success: function (res) {
        const index = res.tapIndex;
        if (index >= 0 && index < functions.length) {
          functions[index]();
        }
      }
    });
  }

  static share (title, url, desc) {
    return {
      title: title,
      path: url,
      desc: desc,
      success: function (res) {
        Tips.toast('分享成功');
      }
    };
  }

  static setLoading () {
    this.isLoading = true;
  }
}
