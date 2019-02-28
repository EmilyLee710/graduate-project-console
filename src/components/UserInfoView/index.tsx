import * as React from 'react'
import * as model from '../../interfaces/Model'

import { Layout, Button, Table, Input, Select, Row, Col, Modal, Collapse, message } from 'antd';
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import userList from '../../screens/UserManagement/UserList'
import * as OrderService from '../../services/OrderApi'
import checkService from '../../services/Checked'

import './style.less'

interface Props {
    id: number
}

interface State {
    visible: boolean
    userInfo: model.UserInfo
}

export default class extends React.Component<Props, State>{
    state: State = {
        visible: true,
        userInfo: {
            id: null,
            ctime: 0,
            name: '',
            passwd: '',
            phone: '',
            sex: '',
            address: ''
        }
    }

    render() {
        const Panel = Collapse.Panel;
        return (
            <Modal
                title='用户信息'
                maskClosable={false}
                visible={this.state.visible}
                onOk={this.close.bind(this)}
                onCancel={this.close.bind(this)}
                destroyOnClose={true}
            >

                <div className='content'>
                    <p>用户昵称：{this.state.userInfo.name}</p>
                    <p>用户密码:{this.state.userInfo.passwd}</p>
                    <p>手机号：{this.state.userInfo.phone}</p>
                    <p>性别：{this.state.userInfo.sex}</p>
                    <p>地址：{this.state.userInfo.address}</p>      
                    <p>创建时间：{checkService.timestampToDate(this.state.userInfo.ctime)}</p>
                </div>

            </Modal>
        )
    }

    close() {
        this.setState({
            visible: false
        })
    }

    callback(key: any) {
        // console.log(key);
    }

    async getOrderInfo() {
        const id = this.props.id
        const token = localStorage.getItem('token')
        try {
            let result = await OrderService.AdminOrderInfo({
                // token: token,
                orderId: id
            })
            if (result.stat === 'ok') {
                // console.log(result.item)
                // this.setState({
                //     orderInfo: result.item
                // })
            } else {
                throw result.stat
            }
        } catch (error) {
            message.error(error)
            // console.log(error)
        }
    }

    componentWillMount() {
        // this.getOrderInfo()
        const id = this.props.id
        userList.map((item,i)=>{
            if(item.id === id){
                this.setState({
                    userInfo:item
                })
            }
        })
    }
}