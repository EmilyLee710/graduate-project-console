import { AdminLoginRequest ,RestaurantLoginRequest} from '../interfaces/Request'
import { BaseResponse, AdminLoginResponse,RestauLoginResponse } from '../interfaces/Response'
import * as httpService from './Http'

/**
* 用户登录
// * @param name
// * @param pwd
*/
export function adminLogin(phone: string, passwd: string) {
  return httpService.post<AdminLoginResponse,AdminLoginRequest>('/api/AdminLogin', {
    phone,
    passwd
  });
}
/**
 * 餐厅登录
 */
export function restauLogin(phone: string, passwd: string) {
  return httpService.post<RestauLoginResponse,RestaurantLoginRequest>('/api/RestaurantLogin', {
    phone,
    passwd
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