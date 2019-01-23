'use strict';
/**
 * 默认的配置文件，所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件
 * 具体参见https://eggjs.org/zh-cn/basics/structure.html
 */

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1548034023285_7825';

  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  config.middleware = [ 'errorHandler' ];

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  // 修改默认端口号
  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: 'localhost',
    },
  };
  // 连接数据库
  exports.mysql = {
    // 单数据库信息配置
    client: {
      host: 'localhost', // host
      port: '3306', // 端口号
      user: 'root', // 用户名
      password: '1223abcd', // 密码
      database: 'testmysql', // 数据库名
    },
    app: true, // 是否加载到 app 上，默认开启
    agent: false, // 是否加载到 agent 上，默认关闭
  };

  // 安全校验
  exports.security = {
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
    },
  };

  return config;
};

