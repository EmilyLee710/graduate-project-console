import * as React from 'react'

import { Layout,Menu,Input,Row,Col } from 'antd';

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import store from '../../Store'
import { Unsubscribe } from 'redux'

import IRoute from './Imenu'

const { Header, Footer, Sider, Content } = Layout
const Search = Input.Search;
export default class extends React.Component<RouteComponentProps<any>> {
  
  render() {
    return (<div>
      {/* <p>订单管理</p> */}
      {/* <Layout>
        <Header>
           <Row style={{width:'100%'}}>
             <Col span={10}>
              <Menu 
                onClick={this.handleClick}
                selectedKeys={[store.getState().tag]}
                mode="horizontal"
                style={{marginLeft:'-60px'}}
                >
                  {IRoute.map((item,i)=> (<Menu.Item key={item.tag}>{item.name}</Menu.Item>
                  ))}
              </Menu>
             </Col>
             <Col span={3}></Col>
             <Col span={3}></Col>
             <Col span={3}>
               
             </Col>
             <Col span={5}>
              <Search
                className='search'
                placeholder="请输入编号"
                onSearch={value => console.log(value)}
                enterButton
                style={{ width: '100%' }}
                />
             </Col>
          </Row>
        </Header>
        <Content>
          <Switch>
            <Redirect exact from={`${this.props.match.url}/`}  to={`${this.props.match.url}/${IRoute[0].tag}`}/>
             {IRoute.map((item,i) => (<Route exact key={item.tag} path={`${this.props.match.url}/${item.tag}`} component={item.component}/>))}
          </Switch>
        </Content>
      </Layout> */}
      <Menu 
       onClick={this.handleClick}
       selectedKeys={[store.getState().tag]}
       mode="horizontal"
       style={{}}
      >
        {IRoute.map((item,i)=> (<Menu.Item key={item.tag}>{item.name}</Menu.Item>
        ))}
      </Menu>
      <Switch>
         <Redirect exact from={`${this.props.match.url}/`}  to={`${this.props.match.url}/${IRoute[0].tag}`}/>
         {IRoute.map((item,i) => (<Route exact key={item.tag} path={`${this.props.match.url}/${item.tag}`} component={item.component}/>))}
      </Switch>
    </div>)
  }

  handleClick = (e: any) => {
    this.setState({
      tag: e.key
    })
    let url = '#'+this.props.match.url+'/'+e.key
    if (e.key && location.hash !== url) {//防止重复点击报错
      try {
        this.props.history.push(`${this.props.match.url}/${e.key}`)
      } catch (error) { }
    }
  }

  unsub: Unsubscribe
  componentWillMount() {
    this.unsub = store.subscribe(() => {
      this.setState({
        tag: [store.getState().tag]
      })
    })
    this.unsub()
  }

  componentDidMount() {
    store.dispatch({
      type: 'SET_MENU',
      menu: 'order'
    })
    store.dispatch({
      type: 'SET_TITLE',
      title: '订单管理'
    })
  }
}