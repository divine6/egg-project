import { Controller } from 'egg';

export default class ProductController extends Controller {
    async list() {
        const { ctx, service } = this;
        const data = await service.product.list()
        ctx.helper.respond(ctx, 200, 'success', data)
    }
    async create() {
        const { ctx, service } = this
        const product = ctx.request.body
        await service.product.create(product)
        ctx.helper.respond(ctx, 200, 'success',)
    }
    async update() {
        const { ctx, service } = this
        const product = ctx.request.body
        await service.user.update(product)
        ctx.helper.respond(ctx, 200, 'success',)
    }
    async delete() {
        const { ctx, service } = this
        const product_id = ctx.request.body.product_id
        await service.user.delete(product_id)
        ctx.helper.respond(ctx, 200, 'success',)
    }
}
