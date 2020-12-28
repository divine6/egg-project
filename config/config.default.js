/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1608961461883_2049';

    // add your middleware config here
    config.middleware = [];
    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        security: {
            csrf: {
                enable: false,
            },
        }
    }
    userConfig.mysql = {
        // 单数据库信息配置
        client: {
            // host
            host: 'localhost',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: 'qy5201314',
            // 数据库名
            database: 'meizu',
            dateStrings: true, // 处理时间格式
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    };
    return {
        ...config,
        ...userConfig,
    };
};