import 'egg';
import { CodeType } from '../app/extend/helper';

declare module 'egg' {
    interface Application {
        mysql: any,
        jwt: any
    }
    interface IHelper {
        respond: (ctx: any, code: CodeType, message: string, data?: any) => void;
    }
};