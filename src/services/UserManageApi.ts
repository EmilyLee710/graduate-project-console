import * as httpService from './Http'

import 
 {
    AdminGetAllUserRequest,
    AdminDelUserRequest
 } from '../interfaces/Request'

 import
 {
    AdminGetAllUserResponse,
    BaseResponse
 } from '../interfaces/Response'

 export function AdminGetAllUser(opt:AdminGetAllUserRequest){
    return httpService.post<AdminGetAllUserResponse,AdminGetAllUserRequest>('/api/AdminGetAllUser',
        opt
    )
 }

 export function AdminDelUser(opt:AdminDelUserRequest){
   return httpService.post<BaseResponse,AdminDelUserRequest>('/api/AdminDelUser',
       opt
   )
}