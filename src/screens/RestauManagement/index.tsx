import * as React from 'react'
import {RestauListItem } from '../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message, Tag } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'

import mount from 'mount-react'

import store from '../../Store'
import UploadImage from '../../components/UploadImage'
import RestauInfoView from '../../components/RestauInfoView'
// import restauList from './RestauList'

import CheckService from '../../services/Checked'
import * as RestaurantService from '../../services/RestauManageApi'

var token = localStorage.getItem('token')

const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search
const confirm = Modal.confirm;

interface State {
    selectedRowKeys: number[],
    restauList: RestauListItem[],
    total: number
    title: string
    pageIndex: number
    pageSize: number
    deleted: boolean
    isSearch: boolean
    searchContent: string
}

export default class extends React.Component<RouteComponentProps<any>, State>{
    state : State={
        selectedRowKeys: [],
        restauList: [],
        total: 0,
        title: null,
        pageIndex: 1,
        pageSize: 15,
        deleted: false,
        isSearch: false,
        searchContent: ''
    }

    render(){
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return( 
            <Layout className='restau-management-style'>
                <Header className='header'>
                    <div>
                        <Button type='primary'
                            onClick={() => this.props.history.push(`${this.props.match.url}/addrestaurant`)}>添加餐厅</Button>
                    </div>
                    <div>
                        <Search
                            placeholder="请搜索餐厅名称"

                            // onChange={(event) => this.setState({ searchContent: event.target.value.trim() })}
                            // onSearch={this.filter.bind(this)}
                            enterButton
                        />
                    </div>
                </Header>
                <Content>
                    <Table
                        // rowSelection={rowSelection}
                        bordered
                        columns={this.columns}
                        rowKey={(record) => { return record.id.toString() }}  //设置uniquekey
                        dataSource={this.state.restauList}
                        pagination={{
                            showTotal: total => <span>共{total}条</span>
                        }}
                    />
                </Content>
            </Layout>
        )
    }

    columns: ColumnProps<RestauListItem>[] = [{
        title: '餐厅ID',
        align: 'center',
        dataIndex: 'id',
        width:'10%'

    }, {
        title: '餐厅名称',
        align: 'center',
        dataIndex: 'restaurantname',
        width:'20%'
    },{
        title: '地址',
        align: 'center',
        dataIndex: 'address',
        width:'25%'
    }, {
        title: '发布时间',
        align: 'center',
        render:(text,record) => (
            <Col>{CheckService.formatTime(record.ctime)}</Col>
        ),
        width:'25%'
    },{
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (text, record) => (
            <Row type="flex" gutter={16} justify="center">
                <Col><a onClick={()=>this.view(record.id)}>查看</a></Col>
                <Col><a onClick={()=>this.delres(record.id)}>删除</a></Col>
            </Row>
        ),
        width:'20%'
    }]

    onSelectChange = (selectedRowKeys: number[]) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    view(record:number){
        let unmount = mount(
            <RestauInfoView id={record} />
          )
    }

    delres(record:number){
        let that = this
        confirm({
            title:'确定删除该餐厅吗？',
            onOk(){
                that.delRestau(record).then(()=>{
                    that.getRestauList()
                }) 
            },
            onCancel(){}
        })
    }

    async getRestauList(){
        try {
            let result = await RestaurantService.AdminGetAllRestau()
            // console.log('result',result.restaurant)
            // let restaulist = result.restaurant.map((item,index)=>{
            //     return item
            // })
            // console.log('map',restaulist)
            this.setState({
                restauList:result.restaurant
            })
          } catch (error) {
            Modal.error({
              title: '提示错误',
              content: JSON.stringify(error)
            })
          } 
    }

    async delRestau(id:number){
        try {
            const result = await RestaurantService.AdminDelRestau({
              // token:token,
              restaurantID: id
            })
            if (result.stat === '1') {
              // console.log("stat", result.stat)
              message.success('删除成功')
            } else {
              throw result.stat
            }
          } catch (error) {
            Modal.error({
              title: '提示错误',
              content: '删除失败'
            })
          }
    }

    componentWillMount(){
        // let allrestau = restauList.map((item,i)=>{
        //     return item
        // })
        // this.setState({
        //     restauList:allrestau
        // })
        // console.log('mount restau')
        this.getRestauList()
    }

    componentDidMount() {
        store.dispatch({
          type: 'SET_MENU',
          menu: 'restaumanagement'
        })
        store.dispatch({
          type: 'SET_TITLE',
          title: '餐厅管理'
        })
    
        // this.getData()
      }
}