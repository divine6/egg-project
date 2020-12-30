
export const createUserRule = {
    account: 'string',
    password: 'string',
    nick_name: { type: 'string', required: false },
    full_name: { type: 'string', required: false },
    age: { type: 'int', required: false },
    gender: { type: 'enum', values: ['1', '2'], required: false },
    mobile: { type: 'string', required: false },
    email: { type: 'string', required: false },
    regist_time: { type: 'dateTime', required: false },
    level: { type: 'enum', values: ['1', '2', '3'], required: false },
};
export const updataeUserRule = {
    user_id: 'number',
    ...createUserRule
};
export const registRule = {
    account: 'string',
    password: 'string',
};
export const loginRule = {
    captcha: 'string',
    ...registRule,
};

