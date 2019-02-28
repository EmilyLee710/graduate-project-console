import * as React from 'react'
import * as model from '../../interfaces/Model'

import { Layout, Button, Table, Input, Select, Row, Col, Modal, Collapse, message } from 'antd';
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import orderList from '../../screens/Order/OrderList'
import * as OrderService from '../../services/OrderApi'
import checkService from '../../services/Checked'

import './style.less'

interface Props {
    id: number
}

interface State {
    visible: boolean
    orderInfo: model.OrderInfo
}

export default class extends React.Component<Props, State>{
    state: State = {
        visible: true,
        orderInfo: {
            id: 0,
            cuisinelist: [],
            orderId: '',
            ctime: 0,
            pay_price: 0,
            buyer: '',
            buyerphone: '',
            status: 0
        }
    }

    render() {
        const Panel = Collapse.Panel;
        return (
            <Modal
                title='订单状态：待接单'
                maskClosable={false}
                visible={this.state.visible}
                onOk={this.close.bind(this)}
                onCancel={this.close.bind(this)}
                destroyOnClose={true}
            >
                <Collapse defaultActiveKey={['skuitem']} onChange={this.callback}>
                    <Panel header='菜品信息' key='skuitem'>
                        <Row type="flex" gutter={16} justify="space-around" style={{ textAlign: 'center' }}>
                            <Col span={8}>商品名</Col>
                            <Col span={8}>商品数量</Col>
                            <Col span={8}>单价</Col>
                        </Row>
                        {this.state.orderInfo.cuisinelist.map((item, i) => {
                            return <Row key={i} type="flex" gutter={16} justify="space-around" style={{ textAlign: 'center' }}>
                                <Col span={8}>{item.name}</Col>
                                <Col span={8}>{item.number}</Col>
                                <Col span={8}>{item.sumprice}</Col>
                            </Row>
                        })}
                    </Panel>
                    {/* <Panel header='物流信息' key='logistics'>
                        <div className='express'>
                            <p>物流：{this.state.orderInfo.logistics.logisticsName}</p>
                            <p>&nbsp;&nbsp;单号：{this.state.orderInfo.logistics.logisticsCode}</p>
                            <br /><p>发货时间：{checkService.timestampToDate(this.state.orderInfo.logistics.ctime)}</p>
                        </div>
                    </Panel> */}
                    <Panel header='订单信息' key='orderinfo'>
                        <div className='content'>
                            <p>买家：{this.state.orderInfo.buyer}</p>
                            <p>手机号：{this.state.orderInfo.buyerphone}</p>
                            <p>订单编号：{this.state.orderInfo.orderId}</p>
                            <p>下单时间：{checkService.timestampToDate(this.state.orderInfo.ctime)}</p>
                        </div>
                    </Panel>
                </Collapse>
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
        orderList.map((item,i)=>{
            if(item.id === id){
                this.setState({
                    orderInfo:item
                })
            }
        })
    }
}