import * as React from 'react'
import {RestauInfo } from '../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message, Tag } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'

import mount from 'mount-react'

import store from '../../Store'
import UploadImage from '../../components/UploadImage'
import RestauInfoView from '../../components/RestauInfoView'
import restauList from './RestauList'

var token = localStorage.getItem('token')

const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search
const confirm = Modal.confirm;

interface State {
    selectedRowKeys: number[],
    restauList: RestauInfo[],
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
                        rowSelection={rowSelection}
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

    columns: ColumnProps<RestauInfo>[] = [{
        title: '餐厅ID',
        align: 'center',
        dataIndex: 'id',
        width:'12.5%'

    }, {
        title: '餐厅名称',
        align: 'center',
        dataIndex: 'name',
        width:'12.5%'
    }, {
        title: '餐厅密码',
        align: 'center',
        dataIndex: 'passwd',
        width:'12.5%'
    }, {
        title: '电话',
        align: 'center',
        dataIndex: 'phone',
        width:'12.5%'
    }, {
        title: '地址',
        align: 'center',
        dataIndex: 'address',
        width:'25%'
    }, {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (text, record) => (
            <Row type="flex" gutter={16} justify="center">
                <Col><a onClick={()=>this.view(record.id)}>查看</a></Col>
                <Col><a onClick={()=>this.delres()}>删除</a></Col>
            </Row>
        ),
        width:'25%'
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

    delres(){
        confirm({
            title:'确定删除该用户吗？',
            onOk(){},
            onCancel(){}
        })
    }

    componentWillMount(){
        let allrestau = restauList.map((item,i)=>{
            return item
        })
        this.setState({
            restauList:allrestau
        })
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