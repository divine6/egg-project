import { Service } from 'egg'
export default class UserService extends Service {
    async list(parmas: any) {
        return await this.app.mysql.select('user', this.ctx.helper.pageQuery(parmas));
    }
    async count() {
        return await this.app.mysql.query('select count(*) as total from user;');
    }
    async findUserById(params: any) {
        return await this.app.mysql.select('user', { where: params, limit: 1, })
    }
    async findUserByAccount(params: any) {
        return await this.app.mysql.select('user', { where: params, limit: 1, })
    }
    async regist(params: any) {
        return await this.app.mysql.insert('user', params)
    }
    async delete(params: any) {
        return await this.app.mysql.delete('user', params)
    }
    async update(params: any) {
        return await this.app.mysql.update('user', params, { where: { user_id: params.user_id } })
    }
    async create(params: any) {
        return await this.app.mysql.insert('user', params)
    }
}

