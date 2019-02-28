import CommodityComponent from '../Commodity'
import EditCommodityComponent from '../Commodity/EditCommodity'

import OrderComponent from '../Order'
// import EditSessionComponent from '../Session/EditSession'

import RestauSettingComponent from '../RestauSetting'
// import EditUserComponent from '../User/EditUser'

interface RouteMenuList {
  key: string//路由配置的key
  title?:string//菜单显示名称
  icon?:string//父菜单的icon
  status?:boolean//权限状态
  component:any//路由组件的引用名称
  children?: RouteMenuList[]//如果有子菜单可以添加children
  listRoute?:RouteMenuList[]//不出现在子菜单但与菜单页面平齐的页面路由配置
}

const routeMenu: RouteMenuList[] = [{
  key: 'commodity',
  title:'菜品设置',
  icon:'shopping-cart',
  status:true,
  component:CommodityComponent,
  children:[],
  listRoute:[{
    key:'set',
    component:EditCommodityComponent
  }]
}, {
  key: 'order',
  title:'订单管理',
  icon:'shop',
  status:true,
  component:OrderComponent,
  children:[],
  listRoute:[]
}, {
  key: 'operation',
  title:'餐厅设置',
  icon:'user',
  status:true,
  component:RestauSettingComponent,
  children:[],
  listRoute:[]
}]

export default routeMenu