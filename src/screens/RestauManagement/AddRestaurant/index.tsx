import * as React from 'react'
import { UserInfo } from '../../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message, Tag, Tooltip } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'

import store from '../../../Store'
import * as RestaurantService from '../../../services/RestauManageApi'

const { Header, Footer, Sider, Content } = Layout;
const Option = Select.Option

interface State{
    restauname:string,
    passwd:string,
    phone:string,
    licence:string,
    address:string
}

export default class UserManagement extends React.Component<RouteComponentProps<any>, State>{
   
   state:State={
    restauname:'',
    passwd:'',
    phone:'',
    licence:'',
    address:'' 
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
                        value={this.state.restauname}
                        onChange={(e)=>this.setState({restauname:e.target.value.trim()})}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>密码：</label>
                        <Input style={{ width: 200 }} type='password' 
                        value = {this.state.passwd}
                        onChange={(e)=>this.setState({passwd:e.target.value.trim()})}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>电话：</label>
                        <Input style={{ width: 200 }} 
                        value = {this.state.phone}
                        onChange={(e)=>this.setState({phone:e.target.value.trim()})}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>营业执照编码：</label>
                        <Input style={{ width: 200 }} 
                        value = {this.state.licence}
                        onChange={(e)=>this.setState({licence:e.target.value.trim()})}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>地址：</label>
                        <Input style={{ width: 200 }} 
                        value = {this.state.address}
                        onChange={(e)=>this.setState({address:e.target.value.trim()})}/>
                    </div>
                </Content>
                <Footer style={{ backgroundColor: 'white' }}>
                    <div className='footer'>
                        <Button className='margin-right' type="primary" onClick={() => this.addRestaurant()}>保存</Button>
                        <Button type="primary" onClick={() => this.props.history.goBack()}>取消</Button>
                    </div>
                </Footer>
          </Layout>
       )
   }

   async addRestaurant(){
    const { restauname,passwd,phone,licence,address} = this.state
    if(restauname === '' ||passwd === '' ||phone === ''
    ||licence === '' || address === ''){
        message.error('请将信息填写完整')
    } else{
        try {
            const result = await RestaurantService.AdminAddRestaurant({
                restauname,
                passwd,
                phone,
                licence,
                address
            })
            if(result.stat === '1'){
               message.success('添加成功');
               this.props.history.goBack()
            } else {
                throw result.stat
            }
          } catch (error) {
            Modal.error({
              title: '提示错误',
              content: '添加失败'
            })
          }    
      } 
   }
   
   componentDidMount() {
     
    // this.getData()
  }
}