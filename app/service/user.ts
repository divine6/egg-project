import { Service } from 'egg'

export default class UserService extends Service {
    async list() {
        return await this.app.mysql.select('user');
    }
    async create(user) {
        return await this.app.mysql.insert('user', user)
    }
    async update(user) {
        return await this.app.mysql.update('user', user, { where: { id: user.id } })
    }
    async delete(id) {
        return await this.app.mysql.delete('user', { id })
    }

}

