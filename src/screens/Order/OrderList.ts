import * as model from '../../interfaces/Model'

const list: model.OrderInfo[] = [{
    id: 1,
    cuisinelist: [{
        id: 1,
        name: '麻婆豆腐',
        number: 1,
        sumprice: 20
    }],
    orderId: '56985232',
    ctime: 0,
    pay_price: 20,
    buyer: '阿滢',
    buyerphone: '18171011645',
    status: 0
},{
    id: 2,
    cuisinelist: [{
        id: 1,
        name: '麻婆豆腐',
        number: 1,
        sumprice: 20
    }],
    orderId: '569456232',
    ctime: 0,
    pay_price: 20,
    buyer: '阿滢',
    buyerphone: '18171011645',
    status:1
},{
    id: 3,
    cuisinelist: [{
        id: 1,
        name: '麻婆豆腐',
        number: 1,
        sumprice: 20
    }],
    orderId: '59855232',
    ctime: 0,
    pay_price: 20,
    buyer: '阿滢',
    buyerphone: '18171011645',
    status:2
}]

export default list