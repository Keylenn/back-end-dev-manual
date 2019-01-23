'use strict';

/**
 * RESTful 风格的Controller
 * 普通Controller的功能：校验、组装参数 | 调用 Service 进行业务处理...
 * 通过响应状态码来标识响应的状态，保持响应的 body 简洁，只返回接口数据
 * 必须，具体参见 https://eggjs.org/zh-cn/tutorials/restful.html
 */

const Controller = require('egg').Controller;
const { getParams } = require('../../utils/func').common;

class UserController extends Controller {
  // method: get, path: /users, routerName: users
  async index() {
    const { ctx, service } = this;
    const res = await service.user.crud({
      type: 'readAll',
    });
    console.log('res_user_index-------', res);
    ctx.body = res;
  }

  /*
  // method: get, path: /users/new, routerName: new_user
  async new() {}
  */

  // method: get, path: /users/:id, routerName: user
  async show() {
    const { ctx, service } = this;
    const params = getParams(ctx);
    let res = await service.user.crud({
      type: 'readOne',
      condition: {
        systemid: params.id,
      },
    });
    console.log('res_user_show-------', res);
    if (!res) {
      res = {
        exist: false,
      };
    }
    ctx.body = res;
  }

  // method: post, path: /users routerName: users
  async create() {
    const { ctx, service } = this;
    const params = getParams(ctx, 'body');
    const res = await service.user.crud({
      type: 'createOne',
      data: params,
    });
    ctx.body = res;
  }

  /*
  // method: post, path: /users/:id/edit  routerName: edit_user
  async edit() {}
  */

  // method: put, path: /users/:id  routerName: user
  async update() {
    const { ctx, service } = this;
    const params = getParams(ctx, 'body');
    const res = await service.user.crud({
      type: 'updateOne',
      data: params,
      idName: 'systemid',
    });
    console.log(res);
    ctx.body = res;
  }

  // method: delete, path: /users/:id  routerName: user
  async destroy() {
    const { ctx, service } = this;
    const params = getParams(ctx, 'body');
    const condition = Object.assign({}, params);
    const res = await service.user.crud({
      type: 'deleteOne',
      condition,
    });
    ctx.body = res;
  }
}

module.exports = UserController;
