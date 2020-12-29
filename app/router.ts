import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.get('/', controller.home.index);
  router.get('/api/getCaptcha', controller.captcha.getCaptcha);
  router.post('/api/checkCaptcha', controller.captcha.checkCaptcha);

  router.get('/api/user/list', controller.user.list);
  router.post('/api/user/create', jwt, controller.user.create);
  router.post('/api/user/update', jwt, controller.user.update);
  router.post('/api/user/delete', jwt, controller.user.delete);

  router.post('/api/user/regist', controller.user.regist);
  router.post('/api/user/login', controller.user.login);
};
