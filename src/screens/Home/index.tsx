import * as React from 'react'
//antd
import { Layout, Menu, Icon, Button, message, Modal, Row, Col, Avatar } from 'antd'
import { ClickParam } from 'antd/lib/menu'
//route
import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'
//redux+store
import { Unsubscribe } from 'redux'
import store from '../../Store'
//other
import './style.less'
import * as authService from '../../services/Auth'

//antd
const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
//route
import IRouteMenuAdmin from './IRouteMenuAdmin'// 引入菜单和路由配置相关数据
import IRouteMenuRestau from './IRouteMenuRestau'
//redux+store
//other

// var init:string
export default class extends React.Component<RouteComponentProps<any>> {
  unsub: Unsubscribe
  state = {
    menu: [''],
    title: '',
    identity:''
  }
  render() {
    return (
      <Layout className="home-style">
        <Sider className="home-slider">
          {/* 配置菜单 */}
          <p className='frame-logo'>喵喵餐饮管理后台</p>
          <Menu
            className='home-menu'
            theme='dark'
            style={{ border: 'none' }}
            mode="inline"
            selectedKeys={this.state.menu}
            onClick={this.menuClick.bind(this)}
          >
            {this.state.identity === '1' ? IRouteMenuAdmin.map((item, i) => {
              return (<Menu.Item key={item.key}>
                <Icon type={item.icon} />
                {item.title}
              </Menu.Item>)
            }) :IRouteMenuRestau.map((item, i) => {
              return (<Menu.Item key={item.key}>
                <Icon type={item.icon} />
                {item.title}
              </Menu.Item>)
            })}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header className='frame-header'>
            <Row>
              <Col span={5}>
                <p className='header-title'>{this.state.title}</p>
              </Col>
              <Col span={5}></Col>
              <Col span={5}></Col>
              <Col span={3}></Col>
              <Col span={2}>
                <Avatar size="large" src={require('../../assets/cat.png')}/>
              </Col>
              <Col span={2}>
                <p>{this.checkIdentity(localStorage.getItem('identity'))}</p>
              </Col>
              {/* <Col span={2}>
                <a onClick={()=>this.props.location.pathname = 'login'}>退出</a>
              </Col> */}
            </Row>
          </Header>
          <Content>
            {/* 配置父菜单路由 */}
            {this.state.identity === '1' ?
              IRouteMenuAdmin.map((item, i) => {
                return (<div key={i}>
                   <Route
                      exact
                      path={`${this.props.match.url}/${item.key}/`}
                      component={item.component}
                    />
                </div>)
              }) : IRouteMenuRestau.map((item, i) => {
                return (<div key={i}>
                  {item.key === 'order' ? <Route
                    path={`${this.props.match.url}/${item.key}/`}
                    component={item.component}
                  /> : <Route
                      exact
                      path={`${this.props.match.url}/${item.key}/`}
                      component={item.component}
                    />}
                </div>)
              })
            }
            {/* 配置与父菜单布局平行的页面路由（不出现在菜单上）+需要通过页面传值的 */}
            { this.state.identity === '1' ?
              IRouteMenuAdmin.map((item, i) => {
                return (<div key={i}>
                  {item.listRoute.length > 0 ?//判断是否存在子页面
                    item.listRoute.map((inner, j) => {
                      return (<div key={j}>
                        <Route
                          exact
                          path={`${this.props.match.url}/${item.key}/${inner.key}`}
                          component={inner.component}
                        />
                      </div>)
                    })
                    : null}
                </div>)
              }) : IRouteMenuRestau.map((item, i) => {
                return (<div key={i}>
                  {item.listRoute.length > 0 ?//判断是否存在子页面
                    item.listRoute.map((inner, j) => {
                      return (<div key={j}>
                        <Route
                          exact
                          path={`${this.props.match.url}/${item.key}/${inner.key}/:status/:id`}
                          component={inner.component}
                        />
                      </div>)
                    })
                    : null}
                </div>)
              })
            }
          </Content>
        </Layout>
      </Layout>
    )
  }
  //点击跳转页面并防止重复点击报错
  menuClick(args: ClickParam) {
    if (args.key && location.hash !== `#/home/${args.key}`) {
      try {
        this.props.history.push('/home/' + args.key)
      } catch (error) { }
    }
  }
  //登出
  // logout() {
  //   authService.logout()
  //   this.props.history.push('/login')
  //   message.success('注销成功')
  // }
  async checkLogin() {
    try {
      let result = await authService.checkLogin()
      // console.log(result)
      if (result.stat !== 'ok') {
        message.error(result.message)
        var error
        throw error = new Error('')
      }
    } catch (error) {
      if(error === 'Key token not found'){
        Modal.error({
          title: '提示',
          content: '请重新登录'
        })
      } else{
        Modal.error({
          title: '提示',
          content: error
        })
      }
    }
  }

  checkIdentity(type:string){
     if(type === '1'){
       return "管理员"
     } else if(type === '2'){
       return "餐厅"
     }
  }
  componentWillMount() {
    //监控store中值的变化
    // this.checkLogin()
    this.unsub = store.subscribe(() => {
      this.setState({
        menu: [store.getState().menu],
        title: [store.getState().title],
        identity:localStorage.getItem('identity')
      }, () => {
        // console.log(this.state.menu)
        // console.log(this.state.title)
        // console.log(this.state.identity)
      })
    })
  }
  componentWillUnmount() {
    this.unsub()
  }
}
