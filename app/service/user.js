const { Service } = require('egg');

class UserService extends Service {
    async list() {
        return await this.app.mysql.select('user');
    }
}

module.exports = UserService;
