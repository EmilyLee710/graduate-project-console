import * as React from 'react'
import { UserInfo } from '../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, InputNumber, Upload, Icon, message, Tag } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'


import * as UserService from '../../services/UserManageApi'
import CheckService from '../../services/Checked'
import './style.less'

import store from '../../Store'
import mount from 'mount-react'
import UserInfoView from '../../components/UserInfoView'

import userList from './UserList'

const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search
const confirm = Modal.confirm;

interface State {
    selectedRowKeys: number[],
    userList: UserInfo[],
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
            <Layout className='user-management-style'>
                <Header className='header'>
                    {/* <div>
                        <Button type='primary'
                            onClick={() => this.props.history.push(`${this.props.match.url}/addadmin`)}>添加管理员</Button>
                    </div> */}
                    <div>
                        {/* <Search
                            placeholder="请搜索用户名称"

                            // onChange={(event) => this.setState({ searchContent: event.target.value.trim() })}
                            // onSearch={this.filter.bind(this)}
                            enterButton
                        /> */}
                    </div>
                </Header>
                <Content>
                    <Table
                        // rowSelection={rowSelection}
                        bordered
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

    columns: ColumnProps<UserInfo>[] = [{
        title: '用户ID',
        align: 'center',
        dataIndex: 'id'

    }, {
        title: '用户昵称',
        align: 'center',
        dataIndex: 'username'
    },{
        title: '性别',
        align: 'center',
        render:(text,record) => (
            <p>{CheckService.checkSex(record.sex)}</p>
        )
    }, {
        title: '电话',
        align: 'center',
        dataIndex: 'phone'
    }, {
        title: '地址',
        align: 'center',
        dataIndex: 'address'
    },{
        title: '时间',
        align: 'center',
        render:(text,record) => (
            <Col>{CheckService.formatTime(record.ctime)}</Col>
        )
    }, {
        title: '操作',
        key: 'operation',
        align: 'center',
        render: (text, record) => (
            <Row type="flex" gutter={16} justify="center">
                {/* <Col><a onClick={()=>this.view(record.id)}>查看</a></Col> */}
                <Col><a onClick={()=>this.delres(record.id)}>删除</a></Col>
            </Row>
        )
    }]

    onSelectChange = (selectedRowKeys: number[]) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    view(record: number) {
        let unmount = mount(
          <UserInfoView id={record} />
        )
      }

    async delUser(id:number){
        try {
            const result = await UserService.AdminDelUser({
              // token:token,
              userID: id
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

    delres(id:number){
        let that = this
        confirm({
            title:'确定删除该用户吗？',
            onOk(){
               that.delUser(id).then(()=>{
                   that.getUserlist()
               })
            },
            onCancel(){}
        })
    }

    async getUserlist(){
        let adminId = localStorage.getItem('adminId')
        try {
            const result = await UserService.AdminGetAllUser({
              // token:token,
              UserId:adminId
            })
            if(result.stat === '1'){
                this.setState({
                    userList: result.user
                  })
                // console.log(result.user)
            } else if(result.stat === '0'){
                Modal.error({
                    title: '提示',
                    content: '没有该管理员'
                })
            } else {
                throw result.stat
            }
            
          } catch (error) {
            Modal.error({
              title: '提示',
              content: error
            })
          }

    }

    componentWillMount(){
        // let alluser = userList.map((item,i) =>{
        //     return item
        // })

        // this.setState({
        //     userList:alluser
        // })
        this.getUserlist()
    }

    componentDidMount() {
        store.dispatch({
            type: 'SET_MENU',
            menu: 'usermanagement'
        })
        store.dispatch({
            type: 'SET_TITLE',
            title: '用户管理'
        })

        // this.getData()
    }
}