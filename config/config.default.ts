import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
    const config = {} as PowerPartial<EggAppConfig>;

    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '18009666754';

    // add your egg config in here
    config.middleware = ['errorHandler'];
    config.errorHandler = {
        match: '/api',
    },
        // add your special config in here
        config.bcrypt = {
            saltRounds: 10 // default 10
        }
    config.jwt = {
        secret: '18009666754'
    }
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true,
        },
        domainWhiteList: ["http://localhost:8080"]
    }
    config.cors = {
        origin: '*',
        allowMethods: 'GET,POST'
    }
    const userConfig = {
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: 'localhost',
                // 端口号
                port: '3306',
                // 用户名
                user: 'root',
                // 密码
                password: 'root',
                // 数据库名
                database: 'meizu',
                dateStrings: true, // 处理时间格式
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        }
    };

    // the return config will combines to EggAppConfig
    return {
        ...config,
        ...userConfig,
    };
};
