
export enum CodeType {
  success = 200,
  error = 500,
}
/**
 *
 * @param ctx context
 * @param data 返回数据
 * @description 后端返回响应数据
 */
export const respond = (ctx: any, code: CodeType, message: string, data?: any) => {
  ctx.body = { code, message, data }
  ctx.status = 200
}
