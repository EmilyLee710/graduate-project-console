import * as httpService from './Http'

import 
{
    RestaurGetMyCuiRequest,
    RestauAddCuisineRequest,
    RestauGetCuiInfoRequest,
    RestauSetCuiInfoRequest,
    RestauDelCuisineRequest
} from '../interfaces/Request'

import 
{
  RestaurGetMyCuiResponse,
  RestauAddCuisineResponse,
  RestauGetCuiInfoResponse,
  BaseResponse
} from '../interfaces/Response'

export function RestaurGetMyCui(opt:RestaurGetMyCuiRequest){
    return httpService.post<RestaurGetMyCuiResponse,RestaurGetMyCuiRequest>('/api/RestaurGetMyCui',
        opt
    )
 }

 export function RestauAddCuisine(opt:RestauAddCuisineRequest){
    return httpService.post<RestauAddCuisineResponse,RestauAddCuisineRequest>('/api/RestauAddCuisine',
        opt
    )
 }

 export function RestauGetCuiInfo(opt:RestauGetCuiInfoRequest){
    return httpService.post<RestauGetCuiInfoResponse,RestauGetCuiInfoRequest>('/api/RestauGetCuiInfo',
        opt
    )
 }

 export function RestauSetCuiInfo(opt:RestauSetCuiInfoRequest){
    return httpService.post<BaseResponse,RestauSetCuiInfoRequest>('/api/RestauSetCuiInfo',
        opt
    )
 }

 export function RestauDelCuisine(opt:RestauDelCuisineRequest){
    return httpService.post<BaseResponse,RestauDelCuisineRequest>('/api/RestauDelCuisine',
        opt
    )
 }