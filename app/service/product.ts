import { Service } from 'egg'
export default class ProductService extends Service {
    async list(params: any) {
        const product_type = params.product_type
        const pageSize = parseInt(params.pageSize) || 10
        const pageNum = (pageSize * parseInt(params.pageNum) - pageSize) || 0
        const countSql = 'select count(*) as total from product a join product_pic b on a.id = b.product_id where product_type=?'
        const listSql = 'select * from product a join product_pic b on a.id = b.product_id where product_type=? limit ? offset ?'
        const res = await this.app.mysql.query(countSql, [product_type]);
        const list = await this.app.mysql.query(listSql, [product_type, pageSize, pageNum]);
        return { list, total: res[0].total }
    }
    async findById(params: any) {
        const product_type = params.product_type
        const listSql = 'select * from product a join product_pic b on a.id = b.product_id where product_type=?'
        const list = await this.app.mysql.query(listSql, [product_type]);
        return list
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
        return await this.app.mysql.update('product', params, { where: { id: params.id } })
    }
    async create(params: any) {
        return await this.app.mysql.insert('product', params)
    }
}

