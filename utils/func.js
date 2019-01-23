'use strict';


const _isObject = value => Object.prototype.toString.call(value) === '[object Object]';

exports.type = {
  isObject: _isObject(),
  isFunc: value => Object.prototype.toString.call(value) === '[object Function]',
  isArray: value => (!Array.isArray
    ? Object.prototype.toString.call(value) === '[object Array]'
    : Array.isArray(value)),
  isNumber: value => typeof value === 'number',
  isString: value => typeof value === 'string',
};

exports.common = {
  getParams(ctx, type) { // 暂支持：query，Router params， body，具体参考https://eggjs.org/zh-cn/basics/controller.html
    if (type === undefined) {
      type = 'router';
    }
    const { query, params, request } = ctx;
    const paramsMap = {
      query,
      router: params,
      body: request.body,
      bodyJson: JSON.stringify(request.body),
    };
    return paramsMap[type];
  },
};

exports.CRUD = {
  create: async (ctx, tableName, data) => await ctx.app.mysql.insert(tableName, data),
  read: async (ctx, tableName, condition) => {
    if (_isObject(condition)) {
      return await ctx.app.mysql.get(tableName, condition);
    }
    return await ctx.app.mysql.select(tableName);
  },
  update: async (ctx, tabelName, options) => {
    const { data, idName } = options;
    const row = Object.assign({}, data);
    if (idName && idName !== 'id') {
      delete row[idName];
      const options = {
        where: {
          [idName]: data[idName],
        },
      };
      return await ctx.app.mysql.update(tabelName, row, options);
    }
    return await ctx.app.mysql.update(tabelName, row);
  },
  delete: async (ctx, tableName, condition) => await ctx.app.mysql.delete(tableName, condition),
};
