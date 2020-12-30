import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    validate: {
        enable: true,
        package: 'egg-validate',
    },
    mysql: {
        enable: true,
        package: 'egg-mysql',
    },
    bcrypt: {
        enable: true,
        package: 'egg-bcrypt'
    },
    jwt: {
        enable: true,
        package: 'egg-jwt',
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    }
};

export default plugin;
