import 'egg';
import { CodeType } from '../app/extend/helper';

declare module 'egg' {
    interface Application {
        mysql: any,
        jwt: any
    }
    interface IHelper {
        success: (ctx: any, data?: any) => void;
        error: (ctx: any, code: CodeType = CodeType.error, message: string) => void;
    }
};