
import { Controller } from 'egg'

import { createUserRule, updataeUserRule, registRule, loginRule } from '../rules/user'

const svgCaptcha = require('svg-captcha')
export default class UserController extends Controller {
    async list() {
        const { ctx, service } = this;
        const data = await service.user.list(ctx.query)
        ctx.helper.respond(ctx, 200, 'success', data)
    }
    async create() {
        const { ctx, service } = this
        const body = ctx.request.body
        ctx.validate(createUserRule, body)
        const data = await service.user.findUserByAccount({ account: body.account })
        if (data && data.length > 0) {
            ctx.helper.respond(ctx, 500, '用户已存在',)
        } else {
            let res = await service.user.create(body)
            ctx.helper.respond(ctx, 200, 'success', { id: res.insertId })
        }
    }
    async update() {
        const { ctx, service } = this
        const body = ctx.request.body
        ctx.validate(updataeUserRule, body)
        const data = await service.user.findUserById({ id: body.id })
        if (data && data.length > 0) {
            await service.user.update(body)
            ctx.helper.respond(ctx, 200, 'success',)
        } else {
            ctx.helper.respond(ctx, 500, '用户不存在',)
        }
    }
    async delete() {
        const { ctx, service } = this
        ctx.validate({ id: 'number' }, ctx.request.body)
        const id = ctx.request.body.id
        await service.user.delete({ id })
        ctx.helper.respond(ctx, 200, 'success')
    }
    async getCaptcha() {
        const { ctx } = this
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            ignoreChars: 'Ooli',
            width: 100,
            height: 40,
            noise: 3,
            color: true,
            background: '#cc9966',
        });
        ctx.session.captcha = captcha.text;
        ctx.response.type = 'image/svg+xml';
        ctx.body = captcha.data;
    }
    async checkCaptcha() {
        const { ctx } = this
        const session = ctx.session.captcha.toLowerCase()
        const capthcha = ctx.request.body.captcha.toLowerCase()
        return session === capthcha
    }
    async regist() {
        const { ctx, service } = this
        ctx.validate(registRule, ctx.request.body)
        const { account, password } = ctx.request.body
        const data = await service.user.findUserByAccount(account)
        if (data.length > 0) {
            ctx.helper.respond(ctx, 500, '账号已存在',)
        } else {
            const pwd_hash = await ctx.genHash(password)
            let res = await service.user.regist({ account, password: pwd_hash })
            if (res.affectedRows === 1) ctx.helper.respond(ctx, 200, 'success',)
        }
    }
    async login() {
        const { ctx, service, app, config } = this
        ctx.validate(loginRule, ctx.request.body)
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
