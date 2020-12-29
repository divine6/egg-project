

import { Controller } from 'egg'

const svgCaptcha = require('svg-captcha')

export default class CaptchaController extends Controller {
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
        const { capthcha } = ctx.request.body
        if (session === capthcha.toLowerCase()) {
            ctx.body = '验证码正确'
        } else {
            ctx.body = '验证码错误'
        }
    }

}