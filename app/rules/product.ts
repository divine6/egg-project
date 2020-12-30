
export const createProductRule = {
    prodduct_name: 'string',
    product_code: 'string'
};
export const updataeProductrRule = {
    product_id: 'number',
    ...createProductRule
};
