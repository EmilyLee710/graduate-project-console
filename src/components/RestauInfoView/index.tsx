import * as React from 'react'
import * as model from '../../interfaces/Model'

import { Layout, Button, Table, Input, Select, Row, Col, Modal, Collapse, message } from 'antd';
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import restauList from '../../screens/RestauManagement/RestauList'
import checkService from '../../services/Checked'
// import * as OrderService from '../../services/OrderApi'
import * as RestaurantService from '../../services/RestauManageApi'

import './style.less'
import Item from 'antd/lib/list/Item';

interface Props {
    id: number
}

interface State {
    visible: boolean
    restauInfo: model.RestauInfo
    cuisinelist: model.RestauCuiItem[]
}

export default class extends React.Component<Props, State>{
    state: State = {
        visible: true,
        restauInfo: {
            id: null,
            ctime: 0,
            restauname: '',
            phone: '',
            address: '',
            licence: '',
            cover_url: '',
            cuisinelist: [],
            collect_num: null,
            description: '',
            sale_info:''
        },
        cuisinelist: []
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
                <Collapse defaultActiveKey={['cuiitem']} onChange={this.callback}>
                    <Panel header='菜品列表' key='cuiitem'>
                        <Row type="flex" gutter={16} justify="space-around" style={{ textAlign: 'center' }}>
                            <Col span={8}>菜品名</Col>
                            <Col span={8}>单价</Col>
                            <Col span={8}>时间</Col>
                        </Row>
                        {this.state.cuisinelist.length === 0?null:this.state.restauInfo.cuisinelist.map((item, i) => {
                            return <Row key={i} type="flex" gutter={16} justify="space-around" style={{ textAlign: 'center' }}>
                                <Col span={8}>{item.c_name}</Col>
                                <Col span={8}>{item.price}</Col>
                                <Col span={8}>{checkService.timestampToDate(item.ctime)}</Col>
                            </Row>
                        })}
                    </Panel>
                    <Panel header='餐厅信息' key='restauinfo'>
                        <div className='content'>
                            <p>餐厅名称：{this.state.restauInfo.restauname}</p>
                            <p>营业执照编码：{this.state.restauInfo.licence}</p>
                            <p>电话：{this.state.restauInfo.phone}</p>
                            <p>地址：{this.state.restauInfo.address}</p>
                            <p>描述：{this.state.restauInfo.description}</p>
                            <p>促销信息：{this.state.restauInfo.sale_info}</p>
                            <p>收藏量：{this.state.restauInfo.collect_num}</p>
                            <p>创建时间：{checkService.timestampToDate(this.state.restauInfo.ctime)}</p>
                        </div>
                    </Panel>
                </Collapse>

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

    async getRestauInfo() {
        const id = this.props.id
        // const token = localStorage.getItem('token')
        try {
            let result = await RestaurantService.AdminGetResInfo({
                restaurantID: id
            })
            console.log(result)
            // if (result.stat === 'ok') {
            // let cuilist = result.restaurant.cuisinelist.map((item, index) => {
            //     return item
            // })
            this.setState({
                restauInfo: result.restaurant,
                cuisinelist: result.restaurant.cuisinelist
            })
            // } else {
            //     throw result.stat
            // }
        } catch (error) {
            // console.log(error)
            message.error(error)
        }
    }

    componentWillMount() {
        this.getRestauInfo()
        // this.getOrderInfo()
        // const id = this.props.id
        // restauList.map((item, i) => {
        //     if (item.id === id) {
        //         this.setState({
        //             restauInfo: item
        //         })
        //     }
        // })
    }
}