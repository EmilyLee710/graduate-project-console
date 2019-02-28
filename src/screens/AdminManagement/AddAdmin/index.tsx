import * as React from 'react'
import { UserInfo } from '../../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message, Tag, Tooltip } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'

import store from '../../../Store'

const { Header, Footer, Sider, Content } = Layout;
const Option = Select.Option

interface State {
    // userList: UserInfo[]
    adminName: string,
    passwd: string,
    sex: string,
    userPhone: string,
    userAddress: string
}

export default class UserManagement extends React.Component<RouteComponentProps<any>, State>{

    state: State = {
        adminName: '',
        passwd: '',
        sex: '',
        userPhone: '',
        userAddress: ''
    }

    render() {
        return (
            <Layout className='add-admin-style'>
                <Header>
                    <Button type="primary" onClick={() => this.props.history.goBack()}>返回</Button>
                </Header>
                <Content>
                    <div className='flex padding-top'>
                        <label className='width-title'>昵称：</label>
                        <Input style={{ width: 200 }} 
                        value = {this.state.adminName}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>密码：</label>
                        <Input style={{ width: 200 }} type='password' 
                        value = {this.state.passwd}/>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>性别：</label>
                        <Select style={{ width: 200 }} 
                        placeholder='性别' onChange={(value) =>this.setSex(value.toString())}>
                            <Option value="man">男</Option>
                            <Option value="woman">女</Option>
                            <Option value="secret">保密</Option>
                        </Select>
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>电话：</label>
                        <Input style={{ width: 200 }} />
                    </div>
                    <div className='flex padding-top'>
                        <label className='width-title'>住址：</label>
                        <Input style={{ width: 200 }} />
                    </div>
                </Content>
                <Footer style={{ backgroundColor: 'white' }}>
                    <div className='footer'>
                        <Button className='margin-right' type="primary" onClick={() => this.props.history.goBack()}>保存</Button>
                        <Button type="primary" onClick={() => this.props.history.goBack()}>取消</Button>
                    </div>
                </Footer>
            </Layout >
        )
    }
    
    setSex(record:string){
        // console.log(record)
        if(record === 'man'){
            this.setState({
                sex:'男'
            })
        } else if(record === 'woman'){
            this.setState({
                sex:'女'
            })
        } else if(record === 'secret'){
            this.setState({
                sex:'保密'
            })
        }
    }

    componentDidMount() {

        // this.getData()
    }
}