import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    // const jwt = app.middleware.jwt(app.config.jwt);
    router.get('/', controller.home.index);
    router.get('/api/user/getCaptcha', controller.user.getCaptcha);
    router.post('/api/user/checkCaptcha', controller.user.checkCaptcha);
    router.post('/api/user/regist', controller.user.regist);
    router.post('/api/user/login', controller.user.login);

    router.get('/api/user/list', controller.user.list);
    router.post('/api/user/create', controller.user.create);
    router.post('/api/user/update', controller.user.update);
    router.post('/api/user/delete', controller.user.delete);

    router.get('/api/product/list', controller.product.list);
    router.post('/api/product/create', controller.product.create);
    router.post('/api/product/update', controller.product.update);
    router.post('/api/product/delete', controller.product.delete);


};
