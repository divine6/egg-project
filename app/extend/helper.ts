
export enum CodeType {
    success = 200,
    error = 500,

}
/**
 * 
 * @param ctx context
 * @param data 请求成功数据
 * @description 成功默认显示success
 */
export const success = (ctx: any, data?: any) => {
    ctx.body = { code: 200, message: 'success', data }
    ctx.status = 200
}

/**
 * 
 * @param ctx context
 * @param code 请求错误状态码
 * @description 错误默认显示error 可自定义根据code配置
 */
export const error = (ctx: any, code: CodeType = CodeType.error, message: string = 'error') => {
    ctx.body = { code, message }
    ctx.status = 200
}
