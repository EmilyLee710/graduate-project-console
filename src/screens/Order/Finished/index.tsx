import * as React from 'react'
import * as model from '../../../interfaces/Model'

import { Layout, Button, Table, Input, Row, Col, Modal, message } from 'antd';
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import store from '../../../Store'
import mount from 'mount-react'

import orders from '../OrderList'

import FinishedOrderInfoView from '../../../components/FinishedOrderIfoView'
import checkService from '../../../services/Checked'
import * as OrderService from '../../../services/OrderApi'

interface State {
  selectedRowKeys: number[]
  orderList: model.OrderListItem[]
  hasSelected: boolean
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
    selectedRowKeys: [],
    orderList: [],
    hasSelected: false,
    isSearch: false,
    searchContent: '',
    pageSize: 10,
    pageIndex: 1,
    total: 0
  }

  colums: ColumnProps<model.OrderListItem>[] = [{
    title: '菜品清单',
    render: (record) => (
      // <div>{record.cuisinelist[0].name}</div>
      record.cuisine_id.map((item: any, index: any) => {
        return (
          <p key={index}>{item.name} 数量：{item.num}</p>
        )
      })
    ),
    key: 'cuisinelist',
    align: 'center',
    width: '30%'
  },
  {
    title: '订单编号',
    dataIndex: 'id',
    key: 'orderId',
    align: 'center',
    width: '10%'
  },
  {
    title: '订单时间',
    render: (text, record) => (
      <p>{checkService.timestampToDate(record.ctime)}</p>
    ),
    key: 'ctime',
    align: 'center',
    width: '10%'
  },
  {
    title: '订单金额',
    dataIndex: 'tot_price',
    render: (text, record) => (
      <p>{text / 100}</p>
    ),
    key: 'tot_price',
    align: 'center',
    width: '10%'
  },
  {
    title: '交易状态',
    dataIndex: 'order_status',
    render: (text, record) => (
      <div>{checkService.checkOrderStatus(text)}</div>
    ),
    key: 'status',
    align: 'center',
    width: '10%'
  }, {
    title: '操作',
    render: (record) => (
      <Row type="flex" gutter={16} justify="center">
        <Col><a className='action-btn linkline' onClick={() => this.view(record.id)}>查看</a></Col>
        <Col><a className='action-btn linkline' onClick={() => this.del()}>删除</a></Col>
      </Row>
    ),
    key: 'operation',
    align: 'center',
    width: '30%'
  }]

  render() {
    let selectedRowKeys = this.state.selectedRowKeys
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (<div>
      {/* <p>已完成</p> */}
      <Layout>
        <Header>
          <Row style={{ marginLeft: '-35px' }}>
            <Col span={5}>
              {/* <Search
                className='search'
                placeholder="请输入编号"
                value={this.state.searchContent}
                onChange={(event) => this.setState({ searchContent: event.target.value.trim() })}
                onSearch={this.filter.bind(this)}
                enterButton
                style={{ width: '100%', marginLeft: '' }}
              /> */}
            </Col>
            <Col span={3}>
              {this.state.isSearch ? <Button style={{ marginLeft: '10px' }} onClick={this.reset.bind(this)} >显示全部</Button> : ''}
            </Col>
            <Col span={5}></Col>
            <Col span={5}>
              {/* <Button 
                type="primary"
                onClick={()=>{console.log('click')}}
                disabled={!this.state.hasSelected}
                >
                  批量操作
              </Button> */}
            </Col>
            <Col span={3}></Col>
            <Col span={3}></Col>
          </Row>
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
   * 搜索列表
   */
  filter(value: string) {
    // this.searchCompleteOrder(value)
  }

  /**
   * 重置搜索表单
   */
  reset() {
    // this.getCompleteOrder().then(() => {
    //   this.setState({
    //     isSearch: false,
    //     searchContent: ''
    //   })
    // })
  }

  /**
   * 获取勾选的条目
   */
  onSelectChange = (selectedRowKeys: number[]) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys: selectedRowKeys });
    if (selectedRowKeys.length > 0) {
      this.setState({
        hasSelected: true
      })
    } else {
      this.setState({
        hasSelected: false
      })
    }
  }

  /**
   * 显示查看弹窗 
   */
  view(record: number) {
    let unmount = mount(
      <FinishedOrderInfoView id={record} />
    )
  }

  del() {
    confirm({
      title: '是否删除订单？',
      onOk() { },
      onCancel() { }
    })
  }

  /**
   * 显示删除弹窗
   */
  // del(){
  //     Modal.confirm({
  //       title: '提示',
  //       content: `确定删除该订单吗？`,
  //       // onOk: async () => {
  //       //   // 执行删除操作
  //       //   let result = await bookService.delBook(record.id)
  //       //   if (result.stat === 'ok') {
  //       //     message.success('图书删除成功')
  //       //     this.listBook()
  //       //   } else {
  //       //     Modal.error({
  //       //       title: '提示',
  //       //       content: result.message
  //       //     })
  //       //   }
  //       // }
  //     })

  // }

  async getCompleteOrder() {
    let closeLoading = message.loading('数据加载中', 0)
    leave = closeLoading
    try {
      let result = await OrderService.RestauGetAllOrder({
        restau_id:parseInt(localStorage.getItem('restauId')),
        type: 2
      })
      closeLoading()
      // if (result.stat === 'ok') {
        // console.log(result.items)
        message.success('数据加载成功')
        this.setState({
          orderList: result.order,
        })
      // } else {
      //   throw result.stat
      // }
    } catch (error) {
      // console.log(error)
      message.error(error)
    }
  }

  // async searchCompleteOrder(value: string) {
  //   try {
  //     let result = await OrderService.AdminSearchOrder({
  //       // token: token,
  //       type: 'Complete',
  //       keyword: value
  //     })
  //     if (result.stat === 'ok') {
  //       // message.success('数据加载成功')
  //       // console.log('search', result.items)
  //       this.setState({
  //         // orderList: result.items,
  //         // total: result.total,
  //         isSearch: true
  //       })
  //     } else {
  //       throw result.stat
  //     }
  //   } catch (error) {
  //     // console.log(error)
  //     message.error(error)
  //   }
  // }

  /**
   * 获取初始数据
   */
  componentWillMount() {
    this.getCompleteOrder()
    // let orderlistall = orders.map((item, i) => {
    //   return item
    // })
    // // console.log(orderlistall)
    // this.setState({
    //   orderList: orderlistall
    // })
  }

  componentDidMount() {
    store.dispatch({
      type: 'SET_TAG',
      tag: 'finished',
    })
  }
}