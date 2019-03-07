import * as httpService from './Http'

import {
    BaseResponse,
    RestauGetAllOrderResponse,
    RestauGetOrderInfoResponse
} from '../interfaces/Response'

import {
    RestauGetAllOrderRequest,
    RestauReceiveOrderRequest,
    RestauRefuseOrderRequest,
    RestauSetOrderFinishedRequest,
    RestauGetOrderInfoRequest
}  from '../interfaces/Request'

export function RestauGetAllOrder(opt:RestauGetAllOrderRequest){
  return httpService.post<RestauGetAllOrderResponse,RestauGetAllOrderRequest>(
    '/api/RestauGetAllOrder',
    opt
  )
}

export function RestauReceiveOrder(opt:RestauReceiveOrderRequest){
  return httpService.post<BaseResponse,RestauReceiveOrderRequest>(
    '/api/RestauReceiveOrder',
    opt
  )
}

export function RestauRefuseOrder(opt:RestauRefuseOrderRequest){
    return httpService.post<BaseResponse,RestauRefuseOrderRequest>(
      '/api/RestauRefuseOrder',
      opt
    )
}

export function RestauSetOrderFinished(opt:RestauSetOrderFinishedRequest){
  return httpService.post<BaseResponse,RestauSetOrderFinishedRequest>(
    '/api/RestauSetOrderFinished',
    opt
  )
}

export function RestauGetOrderInfo(opt:RestauGetOrderInfoRequest){
  return httpService.post<RestauGetOrderInfoResponse,RestauGetOrderInfoRequest>(
    '/api/RestauGetOrderInfo',
    opt
  )
}

// export function AdminShippingOrder(opt:ShippingOrderRequest){
//   return httpService.post<BaseResponse,ShippingOrderRequest>(
//     '/api/order/AdminShippingOrder',
//     opt
//   )
// }