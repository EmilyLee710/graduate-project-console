import {SkuAndSkuTypeInfo,ManagerInfo,UserInfo } from './Model'
import * as model from './Model'

export interface BaseResponse {
    stat: string
    message?: string
 }

/**
 * 添加商品的返回值
 */
export interface AdminAddSkuResponse extends BaseResponse{
    skuId:number
}

/**
 * 管理员获取商品详情
 */
export interface AdminGetSkuInfoResponse extends BaseResponse{
    item:SkuAndSkuTypeInfo
  }
  
  /**
   * 管理员搜索商品信息列表
   */
export interface AdminSearchSkuInfoResponse extends BaseResponse{
   items:SkuAndSkuTypeInfo[]
   total:number
}

/**
 * 添加首页轮播图
 */
export interface AdminAddHomeImageResponse extends BaseResponse{
   HomeImageId:number 
}

/**
 * 管理员添加商品分类
 */
export interface AdminAddSkuTypeResponse extends BaseResponse{
   skuTypeId:string
}

/**
 * 管理员获取所有的首页图片-按照position的位置从小到大排列
 */
export interface AdminGetAllHomeImagesResponse extends BaseResponse{
    items:model.HomeImagesInfo[]
}

/**
 * 管理员获取运费与售后地址信息
 */
export interface AdminGetFreightAndAfterSalesAddressConfigResponse extends BaseResponse{
    config:model.ConfigInfo
}

/**
 * 管理员枚举商品类型
 */
export interface AdminListSkuTypeResponse extends BaseResponse{
  items: model.SkuTypeInfo[]
}

/**
 * 管理员获取订单信息
 */
export interface AdminOrderInfoResponse extends BaseResponse{
    item:model.OrderAndBuyerAddressInfo
}

/**
 * 管理员搜索订单信息
 */
export interface AdminSearchOrderResponse extends BaseResponse{
  items:model.OrderAndBuyerAddressInfo[]
  total:number 
}

/**
 * 管理员有效的老的token换取一个新的token
 */
export interface AdminForkTokenResponse extends BaseResponse{
    token:string
}

/**
 * 管理员登录
 */
export interface AdminLoginResponse extends BaseResponse{
    UserId:string
    // user:ManagerInfo
}

/**
 * 管理员获取用户列表
 */
export interface AdminGetAllUserResponse extends BaseResponse{
    user:UserInfo[]
 }

 /**
  * 餐厅登录
  */
 export interface RestauLoginResponse extends BaseResponse{
    RestaurantID:string
 }
