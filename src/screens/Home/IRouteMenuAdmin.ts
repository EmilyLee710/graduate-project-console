import UserManagementComponent from '../UserManagement'

import RestauManagementComponent from '../RestauManagement'
import AddRestaurantComponent from '../RestauManagement/AddRestaurant'
// import EditSessionComponent from '../Session/EditSession'

import AdminManagementComponent from '../AdminManagement'
import AddAdminComponent from '../AdminManagement/AddAdmin'

import OperationComponent from '../Operation'
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
  key: 'usermanagement',
  title:'用户管理',
  icon:'shopping-cart',
  status:true,
  component:UserManagementComponent,
  children:[],
  listRoute:[{
    key:'addadmin',
    component:AddAdminComponent
  }]
}, {
  key: 'restaumanagement',
  title:'餐厅管理',
  icon:'shop',
  status:true,
  component:RestauManagementComponent,
  children:[],
  listRoute:[{
    key:'addrestaurant',
    component:AddRestaurantComponent
  }]
}, {
  key: 'adminmanagement',
  title:'管理员管理',
  icon:'shop',
  status:true,
  component:AdminManagementComponent,
  children:[],
  listRoute:[{
    key:'addadmin',
    component:AddAdminComponent
  }]
},  {
  key: 'operation',
  title:'运营管理',
  icon:'user',
  status:true,
  component:OperationComponent,
  children:[],
  listRoute:[]
}]

export default routeMenu