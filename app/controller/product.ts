
import { Controller } from 'egg'

import { createProductRule, updataeProductrRule, } from '../rules/product'

export default class ProductController extends Controller {
    async list() {
        const { ctx, service } = this;
        const data = await service.product.list(ctx.query)
        ctx.helper.respond(ctx, 200, 'success', data)
    }
    async create() {
        const { ctx, service } = this
        const body = ctx.request.body
        ctx.validate(createProductRule, body)
        const data = await service.product.findProductByAccount({ product_name: body.product_name })
        if (data && data.length > 0) {
            ctx.helper.respond(ctx, 500, '商品已存在')
        } else {
            let res = await service.product.create(body)
            ctx.helper.respond(ctx, 200, 'success', { product_id: res.insertId })
        }
    }
    async detail() {
        const { ctx, service } = this
        const body = ctx.request.body
        const data = await service.product.findById({ id: body.id })
        if (data && data.length > 0) {
            ctx.helper.respond(ctx, 200, 'success', data[0])
        } else {
            ctx.helper.respond(ctx, 500, '商品不存在')
        }

    }
    async update() {
        const { ctx, service } = this
        const body = ctx.request.body
        ctx.validate(updataeProductrRule, body)
        const data = await service.product.findById({ id: body.id })
        if (data && data.length > 0) {
            await service.product.update(body)
            ctx.helper.respond(ctx, 200, 'success')
        } else {
            ctx.helper.respond(ctx, 500, '商品不存在')
        }
    }
    async delete() {
        const { ctx, service } = this
        const body = ctx.request.body
        ctx.validate({ id: 'number' }, body)
        const data = await service.product.findById({ id: body.id })
        if (data && data.length > 0) {
            await service.product.delete({ id: body.id })
            ctx.helper.respond(ctx, 200, 'success')
        } else {
            ctx.helper.respond(ctx, 500, '商品不存在',)
        }
    }
}
