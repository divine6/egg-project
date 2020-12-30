import { Service } from 'egg'

export default class UserService extends Service {
  async list() {
    return await this.app.mysql.select('user');
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
  async findUserByAccount(account: string) {
    return await this.app.mysql.select('user', { where: { account }, limit: 1, },)
  }
  async regist(user: any) {
    return await this.app.mysql.insert('user', user)
  }

}

