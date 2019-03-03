import * as httpService from './Http'

import 
{
   AdminGetResInfoRequest,
   AdminAddRestaurantRequest,
   AdminDelRestauRequest
} from '../interfaces/Request'

import 
{
   AdminGetAllRestauResponse,
   AdminGetResInfoResponse,
   AdminAddRestaurantResponse,
   BaseResponse
} from '../interfaces/Response'

export function  AdminGetAllRestau(){
    return httpService.post<AdminGetAllRestauResponse>(
       '/api/AdminGetAllRestau',
        
    )
 }

 export function  AdminGetResInfo(opt:AdminGetResInfoRequest){
    return httpService.post<AdminGetResInfoResponse,AdminGetResInfoRequest>(
       '/api/AdminGetResInfo',
        opt
    )
 }

 export function  AdminAddRestaurant(opt:AdminAddRestaurantRequest){
    return httpService.post<AdminAddRestaurantResponse,AdminAddRestaurantRequest>(
       '/api/AdminAddRestaurant',
        opt
    )
 }

 export function  AdminDelRestau(opt:AdminDelRestauRequest){
    return httpService.post<BaseResponse,AdminDelRestauRequest>(
       '/api/AdminDelRestau',
        opt
    )
 }