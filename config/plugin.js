'use strict';

/**
 * 插件Plugin，用于配置需要加载的插件，具体参见https://eggjs.org/zh-cn/basics/plugin.html
 */

// 表单校验插件
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// 使用 mysql 插件
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

