'use strict';
/**
 * 控制器Controller，用于解析用户的输入，处理后返回相应的结果
 * 校验、组装参数
 * 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求
 * 通过 HTTP 将结果响应给用户
 * 必须，具体参见 https://eggjs.org/zh-cn/basics/controller.html
 */
const Controller = require('egg').Controller;
const { getParams } = require('../../utils/func').common;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async testPost() {
    const { ctx, service } = this;
    const start = Date.now();
    const indexRule = {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
    };
    /**
     * 校验参数,默认检验ctx.request.body
     * 建议使用try-catch，捕获错误信息
     * 支持自定义校验规则，详情参考https://eggjs.org/zh-cn/basics/controller.html
     */
    try {
      ctx.validate(indexRule);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = { success: false };
      return;
    }
    /**
     * 组装参数
     */
    const uesrId = ctx.session.userId || '10000';
    const _params = Object.assign(getParams(ctx, 'body'), { uesrId });
    /**
     * 调用 Service 进行业务处理
     */
    const res = await service.home.testPost(_params);
    console.log('res_home-------', res);
    /**
     * 设置响应内容body， 响应状态码status， 响应头Header
     * ctx.body 是 ctx.response.body
     */
    const used = Date.now() - start;
    ctx.body = res;
    ctx.status = 200;
    ctx.set('show-response-time', used.toString());
  }
}

module.exports = HomeController;
