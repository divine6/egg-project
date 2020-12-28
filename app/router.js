'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/api/user/list', controller.user.list);
    router.post('/api/user/create', controller.user.create);
    router.post('/api/user/update', controller.user.update);
    router.post('/api/user/delete', controller.user.delete);
};
