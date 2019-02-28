import { AdminLoginRequest } from '../interfaces/Request'
import { BaseResponse, AdminLoginResponse } from '../interfaces/Response'
import * as httpService from './Http'

/**
* 用户登录
// * @param name
// * @param pwd
*/
export function login(name: string, pwd: string) {
  return httpService.post<AdminLoginResponse,AdminLoginRequest>('/api/admin/AdminLogin', {
    name,
    pwd
  });
}
/**
 * 校验登录
 */
export function checkLogin() {
  return httpService.post<BaseResponse>('/api/admin/AdminCheckLogin', {});
}
/**
 * 注销登录
 */
// export function logout() {
//   return httpService.post<BaseResponse>('/api/admin/AdminLogout', {});
// }