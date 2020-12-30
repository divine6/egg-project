import { Service } from 'egg'
export default class ProductService extends Service {
    async list(params: any) {
        return await this.app.mysql.select('product', this.ctx.helper.pageQuery(params));
    }
    async findProductById(params: any) {
        return await this.app.mysql.select('product', { where: params, limit: 1, })
    }
    async findProductByAccount(params: any) {
        return await this.app.mysql.select('product', { where: params, limit: 1, })
    }
    async regist(params: any) {
        return await this.app.mysql.insert('product', params)
    }
    async delete(params: any) {
        return await this.app.mysql.delete('product', params)
    }
    async update(params: any) {
        return await this.app.mysql.update('product', params, { where: { product_id: params.product_id } })
    }
    async create(params: any) {
        return await this.app.mysql.insert('product', params)
    }
}

