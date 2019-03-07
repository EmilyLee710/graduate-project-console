/**
 * 订单信息
 */
export interface OrderAndBuyerAddressInfo {
  /**
   * 订单id
   */
  id:number
  /**
   * 订单号（唯一的）
   */
  serial_number:string
  /**
   * 创建时间
   */
  ctime:number
  /**
   * 支付价格 100分=1元
   */
  pay_price:number
  /**
   * 支付订单的编号
   */
  pay_order_number:string
  /**
   * 支付方式
   */
  pay_method:string
  /**
   * 备注
   */
  comment:string
  /**
   * 订单状态
   */
  order_status:number
  /**
   * 0：未支付；1：待发货；2：已发货；3：已完成；4：售后；5：删除; 6:售后失败；7:售后完成
   */
  /**
   * 退款金额
   */
  refund_price:number
  /**
   * 退款描述
   */
  refund_desc:string
  /**
   * 退款订单号
   */
  refund_number:string
  /**
   * 退款方式
   */
  refund_method:number
  /**
   * 购物车商品信息
   */
  skuItmes:OrderSkuItemsInfo[]
  /**
   * 订单地址
   */
  address:OrderAddressInfo
  /**
   * 购买者信息
   */
  buyer:UserInfo
  /**
   * 物流信息
   */
  logistics:LogisticsInfo
  /**
   * 运费 100分=1元
   */
  freight:number 
  /**
   * 支付时间
   */
  pay_time:number
  /**
   * 收货时间
   */
  receiving_time:number
  /**
   * 售后状态
   */
  afterSale_status:number
}

//购物车商品信息
export interface OrderSkuItemsInfo{
  id:number
  /**
   * 商品
   */
  sku:SkuInfo
  /**
   * 数量
   */
  number:number
  /**
   * 价格
   */
  price:number
}

//商品信息
export interface SkuInfo{
  id:number
  /**
   * 类型名称
   */
  name:string
  /**
   * 商品轮播图
   */
  images:string[]
  /**
   * 创建时间
   */
  ctime:number
  /**
   * 商品详情 url
   */
  details:string
  /**
   * 库存
   */
  total_stock:number
  /**
   * 价格 100分=1元
   */
  price:number
  /**
   * 商品状态，0：正常；1：删除
   */
  sku_status:number
}

//收货人信息
export interface OrderAddressInfo{
  id:number
  /**
   * 收货人
   */
  consignee:string
  /**
   * 手机号
   */
  phone:string
  /**
   * 地区
   */
  location:string
  /**
   * 详细地址
   */
  detailed_address:string
}

// export interface UserInfo{
//   id:number
//   /**
//    * 手机号
//    */
//   phone:string
//   /**
//    * 密码
//    */
//   pwd:string
//   /**
//    * 创建时间
//    */
//   ctime:number
//   /**
//    * 用户状态 0：正常，1：删除
//    */
//   user_status:number
//   /**
//    * 昵称
//    */
//   nickName:string
//   /**
//    * 头像
//    */
//   avatar:string
//   /**
//    * session
//    */
//   session:SessionInfo
// }

export interface SessionInfo{
  id:number
  /**
   * 令牌
   */
  token:string
  /**
   * 过期时间
   */
  expires:number
}

//物流信息
export interface LogisticsInfo{
  id:number
  /**
   * 创建时间
   */
  ctime:number
  /**
   * 快递公司编码
   */
  shipperCode:string
  /**
   * 物流单号
   */
  logisticsCode:string
  /**
   * 物流公司名字
   */
  logisticsName:string
  /**
   * 2在途中 3：已签收 4：问题件
   */
  stat:number
  /**
   * 物流的详细信息
   */
  info:string
}

/**
 * 商品设置Request
 */

export interface SkuAndSkuTypeInfo{
  /**
   * 序号id
   */
  id: number
  /**
   * 商品名称
   */
  name: string
  /**
   * 单价 100分=1元
   */
  price: number
  /**
   * 原价
   */
  original_price:number
  /**
   * 库存
   */
  total_stock: number
  /**
   * 创建时间
   */
  ctime:number
  /**
   * 轮播图
   */
  images:string[]
 /**
  * 商品详情 url
  */
  details:string
  /**
   * src_skuType
   */
  src_skuType:SkuTypeInfo[]
}

export interface SkuTypeInfo{
  id:number
  name:string
}


// export interface IOptions{
//   key:string
//   optionItem:Array<string>
// }

export interface ConfigInfo{
  id:number
  /**
   * 首页轮播图
   */
  home_images:HomeImagesInfo[]
  /**
   * 运费 100分=1元
   */
  freight_config:number,
  /**
   * 售后收货地址
   */
  after_sale_address:string
}

/**
 * 运营管理
 */

 //首页轮播图
 export interface HomeImagesInfo{
   id:number
   /**
    * 图片的url
    */
   image_url:string
   /**
    * 图片的位置
    */
   postion:number
 }

 /**
  * ManagerInfo
  */
 export interface ManagerInfo{
   id:number
   /**
    * 账号（唯一的）
    */
   account:string
   pwd:string
   nickName:string
   ctime:number
   /**
    * 管理员账户状态 0正常
    */
   manager_status:number
   session:ManagerSessionInfo[]
 }

 export interface ManagerSessionInfo{
   id:number
   token:string
   /**
    * 过期时间
    */
   expires:number
 }

 export interface UserInfo{
    id:number,
    ctime:number,
    username:string,
    phone:string,
    sex:number,
    address:string,
 }

 export interface RestauInfo{
   id:number,
   ctime:number,
   restauname:string,
   phone:string,
   address:string,
   licence:string,
   cover_url:string,
   cuisinelist:RestauCuiItem[],
   collect_num:number,
   description:string,
   sale_info:string
 }

 export interface OrderCuisineInfo{
   id:number,
   name:string,
   number:number,
   sumprice:number
 }

 export interface OrderInfo{
   id:number,
   cuisinelist:OrderCuisineInfo[],
   orderId:string,
   ctime:number,
   pay_price:number,
   buyer:string,
   buyerphone:string,
   status:number
 }

 export interface CuisineInfo{
   id:number,
   ctime:number,
   c_name:string,
   tag:string,
   price:number,
   origin_price:number,
   cover_url:string,
   detail_url:string
 }

 export interface RestauCuiItem{
   id:number,
   c_name:string,
   price:number,
   cover_url:string,
   origin_price:number,
   ctime:number,
   tag:string
 }

 export interface AdminInfo{
   id:number,
   name:string ,
   passwd:string,
   phone:string,
   ctime:number,
   sex:number
 }

 export interface RestauListItem{
   id:number,
   restaurantname:string,
   address:string,
   ctime:number
 }

 export interface CuisineDetailInfo {
    id:number,
    c_name:string,
    price:number,
    cover_url:string,
    detail_url:string,
    origin_price:number,
    sell_num:number,
    collect_num:number,
    ctime:number,
    tag:string
 }

 export interface RestauSetting{
  restaurantID:number,
  cover_url:string,
  restaurantname:string,
  phone:string,
  address:string,
  license:string,
  passwd:string,
  description:string,
  sale_info:string
 }

 export interface HomeImagecommit{
   url:string,
   index:number
 }

 export interface GetHomeImage{
   id:number,
   url:string,
   index:number
 }

 export interface OrderListItem{
    id:number,
    ctime:number,
    comment:string,
    tot_price:number,
    user_id:number,
    user_name:string,
    phone:string
    cuisine_id:{
     id:number,
     name:string,
     num:number,
     cover_url:string
   }[],
   order_status:number,
   appoint_time:number
 }