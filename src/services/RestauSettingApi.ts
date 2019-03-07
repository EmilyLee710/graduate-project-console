import * as httpService from '../services/Http'

import 
{
   RestauSetInfoRequest,
   RestauGetMyInfoRequest
} from '../interfaces/Request'

import 
{
   BaseResponse,
   RestauGetMyInfoResponse
} from '../interfaces/Response'

export function  RestauSetInfo(opt:RestauSetInfoRequest){
    return httpService.post<BaseResponse,RestauSetInfoRequest>(
       '/api/RestauSetInfo',
        opt
    )
}

 export function  RestauGetMyInfo(opt:RestauGetMyInfoRequest){
   return httpService.post<RestauGetMyInfoResponse,RestauGetMyInfoRequest>(
      '/api/RestauGetMyInfo',
       opt
   )
}