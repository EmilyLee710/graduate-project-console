import * as httpService from './Http'

import {
    BaseResponse,
    AdminAddHomeImageResponse,
    GetHomeSwipersResponse
} from '../interfaces/Response'

import {
    // BaseRequest,
    // AdminAddHomeImageRequest,
    AdminAddHomeImgsRequest,
    AdminSetHomeImageRequest
}  from '../interfaces/Request'

// export function AdminAddHomeImage(opt:AdminAddHomeImageRequest) {
//   return httpService.post<AdminAddHomeImageResponse,AdminAddHomeImageRequest>(
//       '/api/config/AdminAddHomeImage',
//       opt
//     )
// }

// export function AdminAddSkuType(opt:AdminAddSkuTypeRequest){
//   return httpService.post<AdminAddSkuTypeResponse,AdminAddSkuTypeRequest>(
//     '/api/config/AdminAddSkuType',
//     opt  
//   )
// }

// export function AdminDeleteHomeImage(opt:AdminDeleteHomeImageRequest){
//   return httpService.post<BaseResponse,AdminDeleteHomeImageRequest>(
//     '/api/config/AdminDeleteHomeImage',
//     opt
//   )
// }

// export function AdminDeletedSkuType(opt:AdminDeletedSkuTypeRequest){
//   return httpService.post<BaseResponse,AdminDeletedSkuTypeRequest>(
//     '/api/config/AdminDeletedSkuType',
//     opt
//   )
// }

// export function AdminGetAllHomeImages(){
//   return httpService.post<AdminGetAllHomeImagesResponse>(
//     '/api/config/AdminGetAllHomeImages',{}
//   )
// }

// export function AdminGetFreightAndAfterSalesAddressConfig(){
//   return httpService.post<AdminGetFreightAndAfterSalesAddressConfigResponse>(
//     '/api/config/AdminGetFreightAndAfterSalesAddressConfig',{}
//   )
// }

// export function AdminListSkuType(){
//   return httpService.post<AdminListSkuTypeResponse>(
//     '/api/config/AdminListSkuType',{}
//   )
// }

// export function AdminSetGlobalAfterSalesAddress(opt:AdminSetGlobalAfterSalesAddressRequest){
//   return httpService.post<BaseResponse,AdminSetGlobalAfterSalesAddressRequest>(
//     '/api/config/AdminSetGlobalAfterSalesAddress',
//     opt
//   )
// }

// export function AdminSetGlobalFreight(opt:AdminSetGlobalFreightRequest){
//   return httpService.post<BaseResponse,AdminSetGlobalFreightRequest>(
//     '/api/config/AdminSetGlobalFreight',
//     opt
//   )
// }

export function AdminAddHomeImgs(opt:AdminAddHomeImgsRequest){
  return httpService.post<BaseResponse,AdminAddHomeImgsRequest>(
    '/api/AdminAddHomeImgs',
    opt
  )
}

export function GetHomeSwipers(){
  return httpService.post<GetHomeSwipersResponse>(
    '/api/GetHomeSwipers',
   
  )
}
