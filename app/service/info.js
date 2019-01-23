'use strict';
const Service = require('egg').Service;
class InfoService extends Service {
  async getInfo(params) {
    const { uesrId, firstName, lastName } = params;
    if (uesrId === '10000') {
      return {
        name: `${firstName} ${lastName}`,
      };
    }
    return {};
  }
}

module.exports = InfoService;
