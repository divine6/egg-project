
import CaptchaController from './captcha'
export default class UserController extends CaptchaController {
    async list() {
        const { ctx, service } = this;
        const { pageNum, pageSize } = ctx.query
        let pNum: number = parseInt(pageNum)
        let pSize: number = parseInt(pageSize)
        const data = await service.user.list({ pNum, pSize })
        ctx.helper.respond(ctx, 200, 'success', data)
    }
    async create() {
        const { ctx, service } = this
        const user = ctx.request.body
        let data = await service.user.findUserByAccount(user.account)
        if (data && data.length > 0) {
            ctx.helper.respond(ctx, 500, '用户已存在',)
        } else {
            let res = await service.user.create(user)
            ctx.helper.respond(ctx, 200, 'success', res.insertId)
        }
    }
    async update() {
        const { ctx, service } = this
        const user = ctx.request.body
        let data = await service.user.findUserById(user.user_id)
        if (data && data.length > 0) {
            await service.user.update(user)
            ctx.helper.respond(ctx, 200, 'success',)
        } else {
            ctx.helper.respond(ctx, 500, '用户不存在',)
        }
    }
    async delete() {
        const { ctx, service } = this
        const user_id = ctx.request.body.user_id
        await service.user.delete(user_id)
        ctx.helper.respond(ctx, 200, 'success',)
    }
    async regist() {
        const { ctx, service } = this
        const { account, password } = ctx.request.body
        let user = await service.user.findUserByAccount(account)
        if (user.length > 0) {
            ctx.helper.respond(ctx, 500, '账号已存在',)
        } else {
            const pwd_hash = await ctx.genHash(password)
            let res = await service.user.regist({ account, password: pwd_hash })
            if (res.affectedRows === 1) ctx.helper.respond(ctx, 200, 'success',)
        }
    }
    async login() {
        const { ctx, service, app, config } = this
        const { account, password } = ctx.request.body
        if (this.checkCaptcha()) {
            let user = await service.user.findUserByAccount(account)
            if (user.length > 0) {
                const pwd_hash = user[0].password
                let checked: boolean = await ctx.compare(password, pwd_hash)
                if (checked) {
                    const token = app.jwt.sign({ account }, config.jwt.secret, { expiresIn: '60m' })
                    ctx.helper.respond(ctx, 200, 'success', token)
                } else {
                    ctx.helper.respond(ctx, 500, '密码不正确',)
                }
            } else {
                ctx.helper.respond(ctx, 500, '账号不存在',)
            }
        }
    }
}
