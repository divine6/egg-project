


import { Controller } from 'egg'

export default class UserController extends Controller {
    public async list() {
        const { ctx, service } = this;
        const data = await service.user.list()
        ctx.helper.success({ ctx, data })
    }
    public async create() {
        const { ctx, service } = this
        const user = ctx.request.body
        await service.user.create(user)
        ctx.helper.success({ ctx })
    }
    public async update() {
        const { ctx, service } = this
        const user = ctx.request.body
        await service.user.update(user)
        ctx.helper.success({ ctx })
    }
    public async delete() {
        const { ctx, service } = this
        const id = ctx.request.body.id
        await service.user.delete(id)
        ctx.helper.success({ ctx })
    }
}