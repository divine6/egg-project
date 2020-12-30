import { Service } from 'egg'

export default class UserService extends Service {
    async list({ pNum, pSize }) {
        return await this.app.mysql.select('user', { limit: pSize, offset: pNum * pSize - pSize });
    }
    async create(user: any) {
        return await this.app.mysql.insert('user', user)
    }
    async update(user: any) {
        return await this.app.mysql.update('user', user, { where: { id: user.id } })
    }
    async delete(id: number) {
        return await this.app.mysql.delete('user', { id })
    }
    async findUserById(user_id: number) {
        return await this.app.mysql.select('user', { where: { user_id }, limit: 1, },)
    }
    async findUserByAccount(account: string) {
        return await this.app.mysql.select('user', { where: { account }, limit: 1, },)
    }
    async regist(user: any) {
        return await this.app.mysql.insert('user', user)
    }

}

