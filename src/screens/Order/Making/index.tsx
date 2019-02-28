import * as React from 'react'
import * as model from '../../../interfaces/Model'

import { Layout, Button, Table, Input, message, Row,Col, Modal } from 'antd';
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import store from '../../../Store'
import mount from 'mount-react'

import './style.less'
import orders from '../OrderList'
import ViewModal from '../../../components/MakingOrderInfoView'
import checkService from '../../../services/Checked'
import * as OrderService from '../../../services/OrderApi'

interface State {
  orderList: model.OrderInfo[]
  isSearch: boolean
  searchContent: string
  pageSize: number
  pageIndex: number
  total: number
}

const { Header, Footer, Sider, Content } = Layout
const Search = Input.Search;
const confirm = Modal.confirm
const token = localStorage.getItem('token')
var leave: Function
export default class extends React.Component<RouteComponentProps<any>, State> {
  state: State = {
    orderList: [],
    isSearch: false,
    searchContent: '',
    pageSize: 10,
    pageIndex: 1,
    total: 0
  }

  colums: ColumnProps<model.OrderInfo>[] = [{
    title: '菜品列表',
    render: (record) => (
      <div>{record.cuisinelist[0].name}</div>
    ),
    key: 'cuisinelist',
    align: 'center',
    width: '14.28%'
  }, {
    title: '订单编号',
    dataIndex: 'orderId',
    key: 'orderId',
    align: 'center',
    width: '14.28%'
  }, {
    title: '订单时间',
    render: (text, record) => (
      <p>{checkService.timestampToDate(record.ctime)}</p>
    ),
    key: 'ctime',
    align: 'center',
    width: '14.28%'
  }, {
    title: '订单金额',
    dataIndex: 'pay_price',
    render: (text, record) => (
      <p>{text}</p>
    ),
    key: 'pay_price',
    align: 'center',
    width: '14.28%'
  }, {
    title: '买家',
    dataIndex:'buyer',
    key: 'buyer',
    align: 'center',
    width: '14.28%'
  }, {
    title: '交易状态',
    dataIndex: 'status',
    render: (text, record) => (
      <div>{checkService.checkOrderStatus(text)}</div>
    ),
    key: 'status',
    align: 'center',
    width: '14.28%'
  }, {
    title: '操作',
    render: (record) => (
      <Row type="flex" gutter={16} justify="center">
        <Col><a className='action-btn linkline' onClick={() => this.view(record.id)}>查看</a></Col>
        <Col><a className='action-btn linkline' onClick={() => this.finishorder()}>订单已完成</a></Col>
      </Row>
    ),
    key: 'operation',
    align: 'center',
    width: '14.28%'
  }
  ]

  render() {
    // let selectedRowKeys = this.state.selectedRowKeys
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };
    const { searchContent } = this.state
    return (<div>
      {/* <p>待付款</p> */}
      <Layout>
        <Header>
          <Search
            className='search'
            placeholder="请输入编号"
            value={this.state.searchContent}
            onChange={(event) => this.setState({ searchContent: event.target.value.trim() })}
            onSearch={this.filter.bind(this)}
            enterButton
            // value={searchContent}
            style={{ width: '20%', marginLeft: '-35px' }}
          />
          {this.state.isSearch ? <Button className="btn-left" onClick={this.reset.bind(this)} >显示全部</Button> : ''}
        </Header>
        <Content>
          <Table bordered className='order-list'
            rowKey='id'
            dataSource={this.state.orderList}
            columns={this.colums}
            pagination={{
              showTotal: total => <span>共{total}条</span>,
              total: this.state.total
            }} />
        </Content>
      </Layout>
    </div>)
  }

  /**
   * 获取勾选的条目
   */
  // onSelectChange = (selectedRowKeys:number[]) => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   this.setState({ selectedRowKeys:selectedRowKeys});
  // }
  /**
   * 显示弹窗
   */
  view(record: number) {
    let unmount = mount(
      <ViewModal id={record} />
    )
  }
  
  finishorder(){
    confirm({
      title:'订单是否已完成？',
      onOk(){},
      onCancel(){}
    })
  }
  /**
   * 搜索列表
   */
  filter(value: string) {
    // console.log('filter', value)
    this.searchPayOrder(value)
  }

  /**
   * 重置搜索表单
   */
  reset() {
    this.getPayOrder().then(() => {
      this.setState({
        isSearch: false,
        searchContent: ''
      })
    })
  }
  /**
   * 获取订单数据
   */

  async getPayOrder() {
    // console.log(localStorage.getItem('token'))
    let closeLoading = message.loading('数据加载中', 0)
    leave = closeLoading
    try {
      let result = await OrderService.AdminSearchOrder({
        // token: token,
        type: 'NoPay'
      })
      closeLoading()
      // console.log(token)
      if (result.stat === 'ok') {
        // console.log(result.items)
        message.success('数据加载成功')
        // this.setState({
        //   orderList: result.items,
        //   total: result.total
        // })
      } else {
        throw result.stat
      }
    } catch (error) {
      // console.log(error)
      message.error(error)
    }
  }
  /**
   * 搜索订单列表
   */
  async searchPayOrder(value: string) {
    // console.log('searchPayOrder', value)
    try {
      let result = await OrderService.AdminSearchOrder({
        // token: token,
        type: 'NoPay',
        keyword: value
      })
      if (result.stat === 'ok') {
        // message.success('数据加载成功')
        // console.log('search', result.items)
        this.setState({
          // orderList: result.items,
          // total: result.total,
          isSearch: true
        })
      } else {
        throw result.stat
      }
    } catch (error) {
      // console.log(error)
      message.error(error)
    }
  }
  /**
   * 获取初始数据
   */
  componentWillMount() {
    let orderlistall = orders.map((item,i)=>{
      return item
    })
    // console.log(orderlistall)
    this.setState({
      orderList:orderlistall
    })
    // this.getPayOrder()
  }

  componentDidMount() {
    store.dispatch({
      type: 'SET_TAG',
      tag: 'making',
    })
  }
}