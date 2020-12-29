import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/api/getCaptcha', controller.captcha.getCaptcha);
  router.post('/api/checkCaptcha', controller.captcha.checkCaptcha);

  router.get('/api/user/list', controller.user.list);
  router.post('/api/user/create', controller.user.create);
  router.post('/api/user/update', controller.user.update);
  router.post('/api/user/delete', controller.user.delete);

  router.post('/api/user/regist', controller.user.regist);
};
