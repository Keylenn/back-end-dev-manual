'use strict';

/**
 * 路由Router，用于配置 URL 路由规则，具体参见 https://eggjs.org/zh-cn/basics/router.html
 * @param {Egg.Application} app - egg application
 * 常见用法1：router.http方法([路由名字, ] url路径, [中间件, ] 处理请求的方法)
 * 常见用法2（通过 RESTful 的方式来定义路由）：app.resources（[路由名字, ] url路径, 处理请求的js) ps：在js内实现对应的函数
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api', controller.home.index);
  router.post('/api/home', controller.home.testPost);
  router.resources('users', '/api/users', controller.users);
};
