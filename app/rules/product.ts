
export const createProductRule = {
    prodduct_name: 'string',
    product_code: 'string',
    product_type: { type: 'enum', values: ['1', '2', '3', '4'], required: true },
    price: 'number',
    descript: { type: 'string', required: false, },
    product_status: { type: 'int', required: false, }
};
export const updataeProductrRule = {
    id: 'int',
    ...createProductRule
};
