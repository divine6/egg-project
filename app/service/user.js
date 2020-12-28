const { Service } = require('egg');

class UserService extends Service {
    async list() {
        return await this.app.mysql.select('user');
    }
    async create(user) {
        return await this.app.mysql.insert('user', user)
    }
    async update(user) {
        return await this.app.mysql.update('user', user)
    }
    async destroy(user_id) {
        return await this.app.mysql.delete('user', { user_id })
    }

}

module.exports = UserService;
