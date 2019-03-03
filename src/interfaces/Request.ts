import { } from './Model'

// export interface BaseRequest{
//   token:string
// }

//获取订单信息
export interface OrderInfoRequest{
  orderId:number
}

// //搜索订单列表
// export interface SearchOrderRequest{
//   /**
//    * 订单类型筛选：All(全部)、NoPay（未支付）, Receiving（代发货）, Shipped（已发货）, Complete（已完成）, AfterSale（售后）
//    */
//   type:string
//   /**
//    * 关键字 默认值: null
//    */
//   keyword?:string
//   /**
//    * 分页页码 默认值: 0
//    */
//   pageIndex?:number
//   /**
//    * 每页展示大小 默认值: 0
//    */
//   pageSize?:number
//   /**
//    * 排序字段 默认值: ctime
//    */
//   sort?:string
//   /**
//    * 排序规则（asc与desc） 默认值: desc
//    */
//   order?:string
// }

// //设置售后成功
// export interface SetAfterSaleCompleteRequest{
//   orderId:number
//   refund:number
// }

// //设置售后失败
// export interface AfterSaleFailRequest{
//   orderId:number
// }

// //点击发货
// export interface ShippingOrderRequest {
//   /**
//    * 订单id
//    */
//   orderId:number
//   /**
//    * 物流订单号
//    */
//   logisticsCode:string
//   /**
//    * 物流公司名称
//    */
//   logisticsName:string
// }

//添加首页轮播图
export interface AdminAddHomeImageRequest {
  image_url:string
  position:number
}

// //添加商品分类
// export interface AdminAddSkuTypeRequest{
//   name:string
// }

//管理员删除首页轮播图的信息
export interface AdminDeleteHomeImageRequest {
  homeImageId:number
}

// //管理员删除商品分类对象
// export interface AdminDeletedSkuTypeRequest {
//   skuTypeIds:number[]
// }

// //管理员设置全局的售后地址
// export interface AdminSetGlobalAfterSalesAddressRequest {
//   afterSale_address:string
// }

// //管理员设置全局的运费
// export interface AdminSetGlobalFreightRequest {
//   freight:number
// }

//管理员修改首页轮播图的图片
export interface AdminSetHomeImageRequest {
  homeImageId:number
  image_url:string
}
/**
 * 管理员添加商品
 */
// export interface AdminAddSkuRequest {
//  /**
//   * 商品名称
//   */
//  name: string
//  /**
//   * 轮播图
//   */
//  images:string[]
// /**
//  * 商品详情 url
//  */
//  details:string
//  /**
//   * 库存
//   */
//  total_stock: number
//  /**
//   * 单价 100分=1元
//   */
//  price: number
//  /**
//   * 原价
//   */
//  original_price:number
//  /**
//   * 需要关联的商品类型的id集合
//   */
//  skuTypeIds:number[]
// }

/**
 * 管理员删除商品
 */
// export interface AdminDeleteSkuRequest {
//   /**
//    * 商品id集合
//    */
//   skuIds:number[]
// }


// /**
//  * 管理员获取商品详情
//  */
// export interface AdminGetSkuInfoRequest {
//   /**
//    * 商品id
//    */
//   skuId:number
// }

/**
 * 管理员搜索商品信息列表
 */
// export interface AdminSearchSkuInfoRequest {
//   /**
//    * 关键字 默认值：null
//    */
//   keyword?:string
//   /**
//    * 分页页码 
//    */
//   pageIndex?:number
//   /**
//    * 每页展示大小
//    */
//   pageSize?:number
//   /**
//    * 排序字段 默认值：ctime
//    */
//   sort?:string
//   /**
//    * 排序规则（asc与desc）默认值: desc
//    */
//   order?:string
// }
/**
 * 商品设置
 */
// export interface AdminSetSkuRequest {
// /**
//    * 序号id
//    */
//   skuId: number
//   /**
//    * 商品名称
//    */
//   name: string
//     /**
//    * 轮播图
//    */
//   images:string[]
//    /**
//   * 商品详情 url
//   */
//  details:string
//  /**
//    * 库存
//    */
//   total_stock: number
//   /**
//    * 单价 100分=1元
//    */
//   price: number
//   /**
//   * 原价
//   */
//  original_price:number
//   /**
//    * 需要关联的商品类型的id集合src_skuType
//    */
//   skuTypeIds:number[]
// }
/**
 * 管理员登陆
 */
export interface AdminLoginRequest{
  phone:string
  passwd:string
}

/**
 * 管理员获取用户列表
 */
export interface AdminGetAllUserRequest{
   UserId:string
}

/**
 * 管理员查看用户信息
 */
export interface AdminGetUserInfoRequest{
  
}

/**
 * 餐厅登录
 */
export interface RestaurantLoginRequest{
  phone:string
  passwd:string
}

/**
 * 管理员删除用户
 */
export interface AdminDelUserRequest{
  userID:number
}

/**
 * 管理员查看餐厅列表
 */
export interface AdminGetAllRestauRequest{

}

/**
 * 管理员查看单个餐厅信息
 */
export interface AdminGetResInfoRequest{
  restaurantID:number
}

/**
 * 管理员添加餐厅
 */
export interface AdminAddRestaurantRequest{
  restauname:string,
  passwd:string,
  phone:string,
  licence:string,
  address:string
}

/**
 * 管理员删除餐厅
 */
export interface AdminDelRestauRequest{
  restaurantID:number
}