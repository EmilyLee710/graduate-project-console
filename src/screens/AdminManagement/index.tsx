import * as React from 'react'
import { AdminInfo } from '../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, InputNumber, Upload, Icon, message, Tag } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'

import store from '../../Store'
import mount from 'mount-react'
import AdminInfoView from '../../components/AdminInfoView'

import adminList from './AdminList'

const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search
const confirm = Modal.confirm;

interface State {
    selectedRowKeys: number[],
    userList: AdminInfo[],
    total: number
    title: string
    pageIndex: number
    pageSize: number
    deleted: boolean
    isSearch: boolean
    searchContent: string
}

export default class UserManagement extends React.Component<RouteComponentProps<any>, State>{

    state: State = {
        selectedRowKeys: [],
        userList: [],
        total: 0,
        title: null,
        pageIndex: 1,
        pageSize: 15,
        deleted: false,
        isSearch: false,
        searchContent: ''
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <Layout className='admin-management-style'>
                <Header className='header'>
                    <div>
                        <Button type='primary'
                            onClick={() => this.props.history.push(`${this.props.match.url}/addadmin`)}>添加管理员</Button>
                    </div>
                    <div>
                        <Search
                            placeholder="请搜索管理员名称"

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
                        dataSource={this.state.userList}
                        pagination={{
                            showTotal: total => <span>共{total}条</span>
                        }}
                    />
                </Content>
            </Layout>
        )
    }

    columns: ColumnProps<AdminInfo>[] = [{
        title: '用户ID',
        align: 'center',
        dataIndex: 'id'

    }, {
        title: '用户昵称',
        align: 'center',
        dataIndex: 'name'
    }, {
        title: '用户密码',
        align: 'center',
        dataIndex: 'passwd'
    },  {
        title: '电话',
        align: 'center',
        dataIndex: 'phone'
    }, {
        title: '操作',
        key: 'id',
        align: 'center',
        render: (text, record) => (
            <Row type="flex" gutter={16} justify="center">
                <Col><a onClick={()=>this.view(record.id)}>查看</a></Col>
                <Col><a onClick={()=>this.delres()}>删除</a></Col>
            </Row>
        )
    }]

    onSelectChange = (selectedRowKeys: number[]) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    view(record: number) {
        let unmount = mount(
          <AdminInfoView id={record} />
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
        let alluser = adminList.map((item,i) =>{
            return item
        })

        this.setState({
            userList:alluser
        })
    }

    componentDidMount() {
        store.dispatch({
            type: 'SET_MENU',
            menu: 'adminmanagement'
        })
        store.dispatch({
            type: 'SET_TITLE',
            title: '管理员管理'
        })

        // this.getData()
    }
}