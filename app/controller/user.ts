


import { Controller } from 'egg'

export default class UserController extends Controller {
    async list() {
        const { ctx, service } = this;
        const data = await service.user.list()
        ctx.helper.success(ctx, data)
    }
    async create() {
        const { ctx, service } = this
        const user = ctx.request.body
        await service.user.create(user)
        ctx.helper.success(ctx)
    }
    async update() {
        const { ctx, service } = this
        const user = ctx.request.body
        await service.user.update(user)
        ctx.helper.success(ctx)

    }
    async delete() {
        const { ctx, service } = this
        const id = ctx.request.body.id
        await service.user.delete(id)
        ctx.helper.success(ctx)

    }
    async regist() {
        const { ctx, service } = this
        const { account, password } = ctx.request.body
        let user = await service.user.findUserByAccount(account)
        if (user.length > 0) {
            ctx.helper.error(ctx, 1, '账号已存在')
        } else {
            const pwd_hash = await ctx.genHash(password)
            let res = await service.user.regist({ account, password: pwd_hash })
            if (res.affectedRows === 1) ctx.helper.success(ctx)
        }
    }
    async login() {
        const { ctx, service, app, config } = this
        const { account, password } = ctx.request.body
        let user = await service.user.findUserByAccount(account)
        if (user.length > 0) {
            const pwd_hash = user[0].password
            let checked: boolean = await ctx.compare(password, pwd_hash)
            if (checked) {
                const token = app.jwt.sign({ account }, config.jwt.secret, { expiresIn: '60m' })
                ctx.helper.success(ctx, token)
            } else {
                ctx.helper.error(ctx, 1, '密码不正确')
            }
        } else {
            ctx.helper.error(ctx, 1, '账号不存在')
        }
    }
}