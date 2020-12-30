
import CaptchaController from './captcha'
export default class UserController extends CaptchaController {
  async list() {
    const { ctx, service } = this;
    const data = await service.user.list()
    ctx.helper.respond(ctx, 200, 'success', data)
  }
  async create() {
    const { ctx, service } = this
    const user = ctx.request.body
    await service.user.create(user)
    ctx.helper.respond(ctx, 200, 'success',)
  }
  async update() {
    const { ctx, service } = this
    const user = ctx.request.body
    await service.user.update(user)
    ctx.helper.respond(ctx, 200, 'success',)
  }
  async delete() {
    const { ctx, service } = this
    const id = ctx.request.body.id
    await service.user.delete(id)
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
