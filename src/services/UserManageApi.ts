import * as httpService from './Http'

import 
 {
    AdminGetAllUserRequest
 } from '../interfaces/Request'

 import
 {
    AdminGetAllUserResponse
 } from '../interfaces/Response'

 export function AdminGetAllUser(opt:AdminGetAllUserRequest){
    return httpService.post<AdminGetAllUserResponse,AdminGetAllUserRequest>('/api/AdminGetAllUser',
        opt
    )
 }