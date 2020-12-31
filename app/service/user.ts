import { Service } from 'egg'
export default class UserService extends Service {
    async list(params: any) {
        const pageSize = parseInt(params.pageSize) || 10
        const pageNum = (pageSize * parseInt(params.pageNum) - pageSize) || 0
        const countSql = 'select count(*) as total from user'
        const listSql = 'select * from user limit ? offset ?'
        const res = await this.app.mysql.query(countSql);
        const list = await this.app.mysql.query(listSql, [pageSize, pageNum]);
        return { list, total: res[0].total }
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
        return await this.app.mysql.update('user', params, { where: { id: params.id } })
    }
    async create(params: any) {
        return await this.app.mysql.insert('user', params)
    }
}

