import * as React from 'react'
import { UserInfo } from '../../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message, Tag, Tooltip } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'

import store from '../../../Store'

const { Header, Footer, Sider, Content } = Layout;
const Option = Select.Option

interface State{
   restauName:string,
   passwd:string,
   restauPhone:string,
   restauAddress:string
}

export default class UserManagement extends React.Component<RouteComponentProps<any>, State>{
   
   state:State={
    restauName:'',
   passwd:'',
   restauPhone:'',
   restauAddress:'' 
   }

   render(){
       return(
          <Layout className='add-restau-style'>
              <Header>
                    <Button type="primary" onClick={() => this.props.history.goBack()}>返回</Button>
                </Header>
                <Content>
                    <div className='flex padding-top'>
                        <label className='width-title'>餐厅名称：</label>
                        <Input style={{ width: 200 }} 
                        value={this.state.restauName}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>密码：</label>
                        <Input style={{ width: 200 }} type='password' 
                        value = {this.state.passwd}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>电话：</label>
                        <Input style={{ width: 200 }} 
                        value = {this.state.restauPhone}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>营业执照编码：</label>
                        <Input style={{ width: 200 }} 
                        value = {this.state.restauPhone}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>地址：</label>
                        <Input style={{ width: 200 }} 
                        value = {this.state.restauAddress}/>
                    </div>
                </Content>
                <Footer style={{ backgroundColor: 'white' }}>
                    <div className='footer'>
                        <Button className='margin-right' type="primary" onClick={() => this.props.history.goBack()}>保存</Button>
                        <Button type="primary" onClick={() => this.props.history.goBack()}>取消</Button>
                    </div>
                </Footer>
          </Layout>
       )
   }
   
   componentDidMount() {

    // this.getData()
  }
}