'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        const { ctx, service } = this;
        const data = await service.user.list()
        ctx.body = {
            code: 0,
            message: 'success',
            data
        }
    }
}

module.exports = UserController;
