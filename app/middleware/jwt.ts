
export default function (options) {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode: any;
    if (token) {
      try {
        decode = ctx.app.jwt.verify(token, options.secret);
        await next();
        console.log(decode);
      } catch (error) {
        ctx.status = 401;
        ctx.helper.error(ctx, error.message)
        return;
      }
    } else {
      ctx.status = 401;
      ctx.helper.error(ctx, 'token失效')
      return;
    }
  };
}