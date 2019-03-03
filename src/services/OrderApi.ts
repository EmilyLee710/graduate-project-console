// import * as httpService from './Http'

// import {
//     BaseResponse,
//     AdminOrderInfoResponse,
//     AdminSearchOrderResponse
// } from '../interfaces/Response'

// import {
//     OrderInfoRequest,
//     SearchOrderRequest,
//     SetAfterSaleCompleteRequest,
//     AfterSaleFailRequest,
//     ShippingOrderRequest
// }  from '../interfaces/Request'

// export function AdminOrderInfo(opt:OrderInfoRequest){
//   return httpService.post<AdminOrderInfoResponse,OrderInfoRequest>(
//     '/api/order/AdminOrderInfo',
//     opt
//   )
// }

// export function AdminSearchOrder(opt:SearchOrderRequest){
//   return httpService.post<AdminSearchOrderResponse,SearchOrderRequest>(
//     '/api/order/AdminSearchOrder',
//     opt
//   )
// }

// export function AdminSetAfterSaleComplete(opt:SetAfterSaleCompleteRequest){
//   return httpService.post<BaseResponse,SetAfterSaleCompleteRequest>(
//     '/api/order/AdminSetAfterSaleComplete',
//     opt
//   )
// }

// export function AdminSetAfterSaleFail(opt:AfterSaleFailRequest){
//   return httpService.post<BaseResponse,AfterSaleFailRequest>(
//     '/api/order/AdminSetAfterSaleFail',
//     opt
//   )
// }

// export function AdminShippingOrder(opt:ShippingOrderRequest){
//   return httpService.post<BaseResponse,ShippingOrderRequest>(
//     '/api/order/AdminShippingOrder',
//     opt
//   )
// }