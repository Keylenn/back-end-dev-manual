'use strict';
const Service = require('egg').Service;
const { CRUD } = require('../../utils/func');


class UserService extends Service {
  // 其他的service的crud方法的实现可以参考下面的形式（controller传type，crudMap实现对应的方法）
  async crud(options) {
    const { type, condition, data, idName } = options;
    const crudMap = {
      readAll: async () => await CRUD.read(this, 'user'), // 查询全表
      readOne: async () => await CRUD.read(this, 'user', condition), // 查询一条记录
      createOne: async () => await CRUD.create(this, 'user', data), // 插入一条记录
      updateOne: async () => await CRUD.update(this, 'user', { data, idName }), // 更新一条记录,idName为id时可以不传
      deleteOne: async () => await CRUD.delete(this, 'user', condition), // 删除一条记录
    };
    return await crudMap[type]();
  }
}

module.exports = UserService;
