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
    RestaurantId:string
 }

 /**
  * 管理员获取全部餐厅
  */
export interface AdminGetAllRestauResponse{
    restaurant:model.RestauListItem[]
}

/**
 * 管理员查看单个餐厅信息
 */
export interface AdminGetResInfoResponse{
    restaurant:model.RestauInfo
}

/**
 * 管理员添加餐厅
 */
export interface AdminAddRestaurantResponse extends BaseResponse{
    restaurantID:number
}

/**
 * 管理员删除餐厅
 */
export interface AdminDelRestauResponse{
    
}

/**
 * 餐厅浏览本餐厅菜品
 */
export interface RestaurGetMyCuiResponse{
    cuisine:model.RestauCuiItem[]
}

/**
 * 餐厅添加菜品
 */
export interface RestauAddCuisineResponse extends BaseResponse{
    CuisineId:number
}

/**
 * 餐厅查看菜品
 */
export interface RestauGetCuiInfoResponse{
    cuisine:model.CuisineDetailInfo
  }

/**
 * 餐厅搜索菜品
 */
export interface RestauSearchCuiResponse extends BaseResponse{
    cuisine:model.RestauCuiItem[]
}

/**
 * 餐厅获取本餐厅信息
 */
export interface RestauGetMyInfoResponse{
    restaurant:model.RestauSetting
} 

/**
 * 获取首页轮播图
 */
export interface GetHomeSwipersResponse{
    swiper:model.GetHomeImage[]
}

/**
 * 餐厅浏览订单
 */
export interface RestauGetAllOrderResponse{
    order:model.OrderListItem[]
}

/**
 * 餐厅浏览单个订单
 */
export interface RestauGetOrderInfoResponse{
    order:model.OrderListItem
  }