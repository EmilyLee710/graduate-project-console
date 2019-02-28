import * as React from 'react'
import * as model from '../../interfaces/Model'

import { Layout, Button, Table, Input, Select, Row, Col, Modal, Collapse } from 'antd';
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import restauList from '../../screens/RestauManagement/RestauList'
import checkService from '../../services/Checked'
import * as OrderService from '../../services/OrderApi'

import './style.less'

interface Props {
    id: number
}

interface State {
    visible: boolean
    restauInfo: model.RestauInfo
}

export default class extends React.Component<Props, State>{
    state: State = {
        visible: true,
        restauInfo: {
            id: null,
            ctime: 0,
            name: '',
            passwd: '',
            phone: '',
            address: ''
        }
    }

    render() {
        const Panel = Collapse.Panel;
        return (
            <Modal
                title='餐厅信息'
                maskClosable={false}
                visible={this.state.visible}
                onOk={this.close.bind(this)}
                onCancel={this.close.bind(this)}
                destroyOnClose={true}
            >
                {/* <div className='header'>
               <p>订单信息</p>
           </div> */}
                <div className='content'>
                    <p>餐厅名称：{this.state.restauInfo.name}</p>
                    <p>密码：{this.state.restauInfo.passwd}</p>
                    <p>电话：{this.state.restauInfo.phone}</p>
                    <p>地址：{this.state.restauInfo.address}</p>
                    <p>创建时间：{checkService.timestampToDate(this.state.restauInfo.ctime)}</p>
                </div>       
            </Modal >
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
                // this.setState({
                //     orderInfo: result.item
                // })
            } else {
                throw result.stat
            }
        } catch (error) {
            // console.log(error)
        }
    }

    componentWillMount() {
        // this.getOrderInfo()
        const id = this.props.id
        restauList.map((item,i)=>{
            if(item.id === id){
                this.setState({
                    restauInfo:item
                })
            }
        })
    }
}