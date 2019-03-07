import * as React from 'react'
import * as model from '../../interfaces/Model'

import { Layout, Button, Table, Input, Select, Row, Col, Modal, Collapse, message } from 'antd';
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import adminList from '../../screens/AdminManagement/AdminList'
import * as CuisineService from '../../services/CuisineApi'
// import * as OrderService from '../../services/OrderApi'
import checkService from '../../services/Checked'

import './style.less'

interface Props {
    id: number
}

interface State {
    visible: boolean
    cuisineInfo: model.CuisineDetailInfo
}

export default class extends React.Component<Props, State>{
    state: State = {
        visible: true,
        cuisineInfo: {
            id: null,
            c_name: '',
            price: null,
            cover_url: '',
            detail_url: '',
            origin_price: null,
            sell_num: null,
            collect_num: null,
            ctime: null,
            tag: ''
        }
    }

    render() {
        const Panel = Collapse.Panel;
        return (
            <Modal
                title='菜品信息'
                maskClosable={false}
                visible={this.state.visible}
                onOk={this.close.bind(this)}
                onCancel={this.close.bind(this)}
                destroyOnClose={true}
            >

                <div className='content'>
                    <p>菜品名称：{this.state.cuisineInfo.c_name}</p>
                    <p>现价：{this.state.cuisineInfo.price}</p>
                    <p>原价：{this.state.cuisineInfo.origin_price}</p>
                    <p>创建时间：{checkService.timestampToDate(this.state.cuisineInfo.ctime)}</p>
                    <p>标签：{this.state.cuisineInfo.tag}</p>
                    <p>收藏数量：{this.state.cuisineInfo.collect_num}</p>
                    <p>销量：{this.state.cuisineInfo.sell_num}</p>
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

    async getCuisineInfo() {
        const id = this.props.id
        // const token = localStorage.getItem('token')
        console.log('cuisineid',id)
        try {
            let result = await CuisineService.RestauGetCuiInfo({
                // token: token,
                CuisineId: id
            })
            console.log('result',result)
            // if (result.stat === 'ok') {
            //     // console.log(result.item)
            //     // this.setState({
            //     //     orderInfo: result.item
            //     // })
            // } else {
            //     throw result.stat
            // }
            // this.setState({
            //     cuisineInfo:result.cuisine
            // })

        } catch (error) {
            message.error(error)
            // console.log(error)
        }
    }

    componentWillMount() {
       this.getCuisineInfo()
        // const id = this.props.id
        // adminList.map((item, i) => {
        //     if (item.id === id) {
        //         this.setState({
        //             adminInfo: item
        //         })
        //     }
        // })
    }
}