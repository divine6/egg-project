'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
    async list() {
        const { ctx, service } = this;
        const data = await service.user.list()
        ctx.body = {
            code: 0,
            message: 'success',
            data
        }
    }
    async create() {
        const { ctx, service } = this
        const user = ctx.request.body
        await service.user.create(user)
        ctx.body = {
            code: 0,
            message: 'success'
        }
    }
    async update() {
        const { ctx, service } = this
        const user = ctx.request.body
        await service.user.update(user)
        ctx.body = {
            code: 0,
            message: 'success'
        }
    }
    async delete() {
        const { ctx, service } = this
        const user_id = ctx.request.body.user_id
        await service.user.delete(user_id)
        ctx.body = {
            code: 0,
            message: 'success'
        }
    }
}

module.exports = UserController;
