import * as React from 'react'
import * as model from '../../interfaces/Model'

import { Layout, Button, Table, Input, Select, Row, Col, Modal, Collapse, message } from 'antd';
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import adminList from '../../screens/AdminManagement/AdminList'
import * as OrderService from '../../services/OrderApi'
import checkService from '../../services/Checked'

import './style.less'

interface Props {
    id: number
}

interface State {
    visible: boolean
    adminInfo: model.AdminInfo
}

export default class extends React.Component<Props, State>{
    state: State = {
        visible: true,
        adminInfo: {
            id: null,
            ctime: 0,
            name: '',
            passwd: '',
            phone: '',
            sex:0
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
                    <p>管理员昵称：{this.state.adminInfo.name}</p>
                    <p>用户密码:{this.state.adminInfo.passwd}</p>
                    <p>手机号：{this.state.adminInfo.phone}</p>  
                    <p>创建时间：{checkService.timestampToDate(this.state.adminInfo.ctime)}</p>
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
        adminList.map((item,i)=>{
            if(item.id === id){
                this.setState({
                  adminInfo:item
                })
            }
        })
    }
}