/**
 *
 * @param ctx context
 * @param data 返回数据
 * @description 后端返回响应数据
 */
export const respond = (ctx: any, code: number, message: string, data?: any) => {
    ctx.body = { code, message, data }
    ctx.status = 200
}

/**
 *
 * @param pageNum 页码
 * @param pageSize 一页多少
 */
export const pageQuery = (params: { pageNum: string, pageSize: string }) => {
    let pNum: number = parseInt(params.pageNum)
    let pSize: number = parseInt(params.pageSize)
    return { limit: pSize, offset: pNum * pSize - pSize }
}
