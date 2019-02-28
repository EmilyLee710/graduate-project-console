import * as React from 'react'
import * as model from '../../../interfaces/Model'

import { Layout, Button, Table, Input, Select, Row, Col, Modal, message } from 'antd';
import { ColumnProps } from 'antd/lib/table'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import store from '../../../Store'
import mount from 'mount-react'

import orders from '../OrderList'

import AfterSellOrderRefund from '../../../components/AfterSellOrderRefund'
import AfterSellOrderInfoView from '../../../components/AfterSellOrderInfoView'
import checkService from '../../../services/Checked'
import * as OrderService from '../../../services/OrderApi'

interface State {
  selectedRowKeys: number[]
  orderList: model.OrderAndBuyerAddressInfo[]
  hasSelected: boolean
  isSearch: boolean
  searchContent: string
  pageSize: number
  pageIndex: number
  total: number
}

const { Header, Footer, Sider, Content } = Layout
const Search = Input.Search;
const Option = Select.Option;
var leave: Function
var token = localStorage.getItem('token')
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

  colums: ColumnProps<model.OrderAndBuyerAddressInfo>[] = [{
    title: '商品',
    render: (record) => (
      <div>{record.skuItmes[0].sku.name}</div>
    ),
    key:'skuItems',
    align: 'center',
    width: '11.11%'
  }, {
    title: '订单编号',
    dataIndex: 'serial_number',
    key:'serial_number',
    align: 'center',
    width: '11.11%'
  }, {
    title: '下单时间',
    dataIndex: 'ctime',
    key:'ctime',
    render: (text, record) => (
      <p>{checkService.timestampToDate(text)}</p>
    ),
    align: 'center',
    width: '11.11%'
  }, {
    title: '订单金额',
    dataIndex: 'pay_price',
    render:(text,record) => (
      <p>{text/100}</p>
    ),
    key:'pay_price',
    align: 'center',
    width: '10.11%'
  }, {
    title: '退款金额',
    dataIndex: 'refund_price',
    render:(text,record) => (
      <p>{text/100}</p>
    ),
    key:'refund_price',
    align: 'center',
    width: '10.11%'
  }, {
    title: '买家',
    render: (record) => (
      <div>{record.address.consignee}</div>
    ),
    key:'buyer',
    align: 'center',
    width: '11.11%'
  }, {
    title: '交易状态',
    dataIndex: 'order_status',
    render: (text, record) => (
      <div>{checkService.checkOrderStatus(text)}</div>
    ),
    key:'order_status',
    align: 'center',
    width: '11.11%'
  },{
    title: '售后状态',
    dataIndex: 'afterSale_status',
    render: (text, record) => (
      <div>{checkService.checkAfterSellStatus(text)}</div>
    ),
    key:'afterSale_status',
    align: 'center',
    width: '11.11%'
  }, {
    title: '操作',
    render: (record) =>
      (this.operation(record))
    //   <div>
    //     <a className='action-btn linkline' onClick={()=> console.log('view')}>查看</a>
    //     <a className='action-btn linkline' onClick={()=> console.log('agree')}>退款</a>
    //     <a style={{visibility:'hidden'}} className='action-btn linkline' onClick={()=> console.log('refuse')}>拒绝</a>
    //  </div> 
    ,
    key:'operation',
    align: 'center',
    width: '13.11%'
  }
  ]

  render() {
    let selectedRowKeys = this.state.selectedRowKeys
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };

    return (<div>
      {/* <p>售后</p> */}
      <Layout>
        <Header>
          <Row style={{ marginLeft: '-35px' }} gutter={16}>
            <Col span={3}>
              <Select
                showSearch
                style={{ width: '100%',marginLeft:'-6px' }}
                defaultValue='all'
                optionFilterProp="children"
                onChange={this.handleChange.bind(this)}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="all">全部</Option>
                <Option value="afterselling">售后中</Option>
                <Option value="finished">售后完成</Option>
                <Option value="fail">售后失败</Option>
              </Select>
            </Col>
            <Col span={5}>
              <Search
                className='search'
                placeholder="请输入编号"
                value={this.state.searchContent}
                onChange={(event) =>this.setState({searchContent:event.target.value.trim()})}
                onSearch={this.filter.bind(this)}
                enterButton
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={3}>
              {this.state.isSearch ? <Button  onClick={this.reset.bind(this)} >显示全部</Button> : ''}
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
          </Row>
        </Header>
        <Content>
          <Table bordered className='order-list'
             rowKey={(record) => {return record.id.toString()}}
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
   * 获得焦点时回调
   */
  handleFocus() {
    // console.log('focus');
  }
  /**
   * 失去焦点的时回调
   */
  handleBlur() {
    // console.log('blur');
  }
  /**
   * 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数
   */
  handleChange(value: string) {
    // console.log(`selected ${value}`);
    this.getAfterSaleOrder(value)
  }

  /**
   * 搜索列表
   */
  filter(value: string) {
    this.searchAfterSaleOrder(value)
  }

  /**
   * 重置搜索表单
   */
  reset() {
    this.getAfterSaleOrder('all').then(() => {
      this.setState({
        isSearch: false,
        searchContent:''
      })
    })
  }

  /**
   * 获取勾选的条目
   */
  // onSelectChange = (selectedRowKeys:number[]) => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   this.setState({ selectedRowKeys:selectedRowKeys});
  //   if(selectedRowKeys.length > 0){
  //     this.setState({
  //       hasSelected:true
  //     })
  //   }else{
  //     this.setState({
  //       hasSelected:false
  //     })
  //   }
  // }

  /**
   *  根据不同售后状态显示不同操作
   */
  operation(record: model.OrderAndBuyerAddressInfo) {
    if (record.afterSale_status === 1) {
      return (
        <Row type="flex" gutter={16} justify="center">
          <Col><a className='action-btn linkline' onClick={() => this.view(record.id)}>查看</a></Col>
          <Col><a className='action-btn linkline' onClick={() => this.refund(record.id)}>退款</a></Col>
          <Col><a className='action-btn linkline' onClick={() => this.refuse(record.id)}>拒绝</a></Col>
        </Row>
      )
    } else if (record.afterSale_status === 3) {
      return (
        <Row type="flex" gutter={16} justify="center">
          <Col><a className='action-btn linkline' onClick={() => this.view(record.id)}>查看</a></Col>
          <Col><a className='action-btn linkline' style={{ visibility: 'hidden' }} onClick={() => this.refund(record.id)}>退款</a></Col>
          <Col><a className='action-btn linkline' style={{ visibility: 'hidden' }} onClick={() => this.refuse(record.id)}>拒绝</a></Col>
        </Row>
      )
    } else if (record.afterSale_status === 2) {
      return (
        <Row type="flex" gutter={16} justify="center">
          <Col><a className='action-btn linkline' onClick={() => this.view(record.id)}>查看</a></Col>
          <Col><a className='action-btn linkline' style={{ visibility: 'hidden' }} onClick={() => this.refund(record.id)}>退款</a></Col>
          <Col><a className='action-btn linkline' style={{ visibility: 'hidden' }} onClick={() => this.refuse(record.id)}>拒绝</a></Col>
        </Row>
      )
    } else {
      return (<div></div>)
    }
  }

  /**
   * 查看售后订单
   */
  view(record: number) {
    let unmount = mount(
      <AfterSellOrderInfoView id={record} />
    )
  }

  /**
   * 显示退款弹窗
   */
  refund(record: number) {
    let unmount = mount(
      <AfterSellOrderRefund id={record} update={()=> this.getAfterSaleOrder('all')}/>
    )
  }

  /**
   * 拒绝售后弹窗
   */
  refuse(record: number) {
    Modal.confirm({
      title: '提示',
      content: '确定要拒绝售后吗？',
      onOk: async () => {
        let result = await OrderService.AdminSetAfterSaleFail({
          // token: token,
          orderId: record
        })
        if (result.stat === 'ok') {
          message.success('已拒绝该订单售后')
          this.getAfterSaleOrder('all')
        } else {
          message.error(result.stat)
        }
      }
    })
  }

  async getAfterSaleOrder(keyword: string) {
    let closeLoading = message.loading('数据加载中', 0)
    leave = closeLoading
    try {
      let result = await OrderService.AdminSearchOrder({
        // token: token,
        type: 'AfterSale'
      })
      closeLoading()
      if (result.stat === 'ok') {
        message.success('数据加载成功')
        let orderlist = result.items
        // console.log('beforefilter',result.items)
        if (keyword === 'afterselling') {
          orderlist = orderlist.filter(x => x.afterSale_status === 1)
        } else if (keyword === 'finished') {
          orderlist = orderlist.filter(x => x.afterSale_status === 3)
        } else if (keyword === 'fail') {
          orderlist = orderlist.filter(x => x.afterSale_status === 2)
        } else if (keyword === 'all') {
          orderlist = orderlist
        }
        // console.log('afterfilter',orderlist)
        this.setState({
          orderList: orderlist,
          total: result.total
        })
      } else {
        throw result.stat
      }
    } catch (error) {
      // console.log(error)
      message.error(error)
    }
  }

  async searchAfterSaleOrder(value: string) {
    try {
      let result = await OrderService.AdminSearchOrder({
        // token: token,
        type: 'AfterSale',
        keyword: value
      })
      if (result.stat === 'ok') {
        // message.success('数据加载成功')
        // console.log('search', result.items)
        this.setState({
          orderList: result.items,
          total: result.total,
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
    // this.getAfterSaleOrder('all')
    // let orderlistall = orders.map((item,i)=>{
    //   return item
    // })
    // console.log(orderlistall)
    // this.setState({
    //   orderList:orderlistall
    // })
  }

  componentDidMount() {
    store.dispatch({
      type: 'SET_TAG',
      tag: 'aftersell',
    })
  }
}