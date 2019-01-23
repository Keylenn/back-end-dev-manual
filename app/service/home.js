'use strict';

/**
 * 服务Service，用于编写业务逻辑层--处理数据，请求等
 * 懒加载的，只有当访问到它的时候框架才会去实例化它
 * 将逻辑和展现分离，更容易编写测试用例
 * 一个 Service 文件只能包含一个类， 这个类需要通过 module.exports 的方式返回
 * Service 需要通过 Class 的方式定义，父类必须是 egg.Service
 * 可选，建议使用，具体参见https://eggjs.org/zh-cn/basics/service.html
 */

const Service = require('egg').Service;
class HomeService extends Service {
  async testPost(params) {
    /** Service ctx 详解
     * 1.this.ctx.curl 发起网络调用
     * 2.this.ctx.service.otherService 调用其他 Service
     * 3.this.app.mysql.query(sql, value)发起数据库调用等,尽量少直接执行SQL，以免引起SQL注入问题,使用CRUD
     */
    const { uesrId } = params;
    const resCurl = await this._getData();
    const resOtherService = await this.ctx.service.info.getInfo(params);
    const resMysql = await this.app.mysql.query('SELECT t.phone_number,t.systemid FROM user t WHERE systemid = ?', uesrId);
    console.log('resCurl', resCurl);
    console.log('resOtherService', resOtherService);
    console.log('resMysql', resMysql[0]);
    const res = Object.assign({}, resCurl, resOtherService, resMysql[0]);
    return res;
  }

  async _getData() {
    const result = await this.ctx.curl(
      'https://www.easy-mock.com/mock/5c46c3a124390d27ad6167f2/test-egg/keylenn',
      { dataType: 'json' } // 默认返回Buffer
    );
    return result.data;
  }
}


module.exports = HomeService;
