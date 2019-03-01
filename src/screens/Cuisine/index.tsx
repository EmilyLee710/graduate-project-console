import * as React from 'react'
//antd
import { Table, Button, Row, Col, Form, Input, Modal, Pagination, Rate, message, Layout } from 'antd'
import { ColumnProps } from 'antd/lib/table'
//route
import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'
//redux+store

import * as SkuApi from '../../services/SkuApi'

import './style.less'
import { CuisineInfo } from '../../interfaces/model'
import cuisines from './CuisineList'
import store from '../../Store'
import { Unsubscribe } from 'redux'

interface State {
  selectedRowKeys: number[]
  cuisineList: CuisineInfo[]
  total: number
  title: string
  pageIndex: number
  pageSize: number
  deleted: boolean
  isSearch: boolean
  searchContent: string
}

const confirm = Modal.confirm;
const { Header, Footer, Sider, Content } = Layout;
const Search = Input.Search;
var token = localStorage.getItem('token')
export default class extends React.Component<RouteComponentProps<any>, State> {


  state: State =
    {
      selectedRowKeys: [],
      cuisineList: [],
      total: 0,
      title: null,
      pageIndex: 1,
      pageSize: 15,
      deleted: false,
      isSearch: false,
      searchContent: ''
    }

  render() {
    const { deleted, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    var resetButton = (<Button className="btn-left" onClick={this.reset.bind(this)} >显示全部</Button>)

    return (
      <Layout className='cuisine-style'>
        <Header >
          <div className='header'>
            <div>
              <Button
                type="primary"
                onClick={() => this.onEditCommodity('add', "new")}>添加菜品</Button>
              <Button
                type="primary"
                className="btn-left"
                onClick={this.del.bind(this, selectedRowKeys)}
                disabled={!hasSelected}
              >删除</Button>
            </div>
            <div className="searchArea">
              <Search
                placeholder="请搜索菜品名称"
                value={this.state.searchContent}
                onChange={(event) => this.setState({ searchContent: event.target.value.trim() })}
                onSearch={this.filter.bind(this)}
                enterButton
              />
              {this.state.isSearch ? resetButton : ''}
            </div>
          </div>
        </Header>
        <Content>
          <Table
            rowSelection={rowSelection}
            columns={this.columns}
            rowKey={(record) => { return record.id.toString() }}  //设置uniquekey
            dataSource={this.state.cuisineList}
            pagination={{
              showTotal: total => <span>共{total}条</span>
            }}
          />
        </Content>
      </Layout>
    )
  }


  columns: ColumnProps<CuisineInfo>[] = [{
    title: '菜品名称',
    dataIndex: 'name',
    align: 'center',
  }, {
    title: '标签',
    align: 'center',
    dataIndex:'tag'
  }, {
    title: '价格',
    align: 'center',
    render: (text, record) => (
      <Col>{record.price}</Col>
    )
  },  {
    title: '发布时间',
    align: 'center',
    render: (text, record) => (
      <Col >{this.formatTime(record.ctime)}</Col>
    )
  }, {
    title: '操作',
    key: 'id',
    align: 'center',
    render: (text, record) => (
      <Row type="flex" gutter={16} justify="center">
        <Col ><a className='action-btn linkline' onClick={this.onEditCommodity.bind(this, 'view', record.id)}>查看</a></Col>
        <Col ><a className='action-btn linkline' onClick={this.onEditCommodity.bind(this, 'edit', record.id)}>编辑</a></Col>
        <Col ><a className='action-btn linkline' onClick={this.del.bind(this, [record.id] as number[])}>删除</a></Col>
      </Row>
    )
  }]

  onSelectChange = (selectedRowKeys: number[]) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  /**
   * 根据筛选的表单条件重新请求服务端数据列表
   */
  filter(value: any) {
    this.searchData(value).then(() => {
      this.setState({
        isSearch: true
      })
    })
  }

  /**
   * 重置搜索表单
   */
  reset() {
    this.getData().then(() => {
      this.setState({
        isSearch: false,
        searchContent:''
      })
      // console.log("search=======>",this.refs.mySearch)
      // this.refs.mySearch.input.input.value = '' //将搜索框置空
    })
  }

  /**
   *删除商品控制函数 
   */
  del(selectedRowKeys: number[]) {
    let that = this
    // console.log('skuIdsWeChoose:', selectedRowKeys)
    // console.log('commoditiesIds:', that.state.commodities.map((com) => { return com.id }))
    confirm({
      title: '确定要删除这些商品？',
      onOk() {
        that.deleteCommodity(selectedRowKeys).then(() => {
          that.getData()
        })
      },
      onCancel() { },
    });
  }

  /**时间格式化 */
  formatTime(num: number) {
    let date = new Date(num)
    let year = `${date.getFullYear()}`
    let mouth = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
    let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

    return `${year}-${mouth}-${day}   ${hour}:${minute}`
  }


  /**
   * 路由->到编辑页面（添加商品，查看、编辑商品信息，）
   */
  onEditCommodity(status: string, id: any) {
    /**
     * status实际上是Home Index中配置的id
    */
     console.log(id)
    this.props.history.push(`${this.props.match.url}/set/${status}/${id}`)
  }


  /**
     * 拉取全部商品数据
     */
  async getData() {
    try {
      const result = await SkuApi.AdminSearchSkuInfo({
        // token:token,
        keyword: '',
        pageIndex: 0,
        pageSize: 0,
        sort: 'ctime',
        order: 'desc'
      })
      if (result.stat === 'ok') {
        // this.setState({
        //   commodities: result.items
        // })
        // console.log(result.items)
      } else {
        // console.log(result.stat)
        throw result.stat
      }
    } catch (error) {
      Modal.error({
        title: '提示',
        content: error
      })
    }
  }

  /**
   * 搜索商品
   */
  async searchData(keyword: string) {
    try {
      const result = await SkuApi.AdminSearchSkuInfo({
        // token:token,
        keyword: keyword
      })
      if (result.stat === 'ok') {
        //若为空，会自动显示暂无数据
        this.setState({
          // commodities: result.items,
          isSearch: true
        })
        // console.log(result.items)
      } else {
        // console.log("stat", result.stat)
        throw result.stat
      }
    } catch (error) {
      Modal.error({
        title: '提示',
        content: error
      })
    }
  }
  /**
   * 删除商品
   */
  async deleteCommodity(skuId: number[]) {
    try {
      const result = await SkuApi.AdminDeleteSku({
        // token:token,
        skuIds: skuId
      })
      if (result.stat === 'ok') {
        // console.log("stat", result.stat)
      } else {
        throw result.stat
      }
    } catch (error) {
      Modal.error({
        title: '提示错误',
        content: error
      })
    }
  }

  componentWillMount(){
    let cuisinelistall = cuisines.map((item,i)=>{
      return item
    })
    // console.log(orderlistall)
    this.setState({
      cuisineList:cuisinelistall
    })
  }

  componentDidMount() {
    store.dispatch({
      type: 'SET_MENU',
      menu: 'commodity'
    })
    store.dispatch({
      type: 'SET_TITLE',
      title: '菜品设置'
    })
     
    // this.getData()
  }
}