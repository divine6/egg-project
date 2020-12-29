

export const success = ({ ctx, message, data, }) => {
    ctx.body = {
        code: 0,
        data,
        message
    }
    ctx.status = 200
}
