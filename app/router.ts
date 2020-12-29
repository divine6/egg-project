import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/api/getCaptcha', controller.captcha.getCaptcha);
  router.post('/api/checkCaptcha', controller.captcha.checkCaptcha);
};
