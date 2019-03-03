import * as React from 'react'

import { Button, Input, Modal, Layout, Select, InputNumber, Icon, message, Tag, Tooltip } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'
import { CuisineInfo } from '../../../interfaces/model'
import * as SkuApi from '../../../services/SkuApi'
import { AdminListSkuType } from '../../../services/OperationApi'
import cuisineList from '../CuisineList'
import store from '../../../Store'
import UploadImage from '../../../components/UploadImageForsku'

const confirm = Modal.confirm;
const { Header, Footer, Sider, Content } = Layout;
const { Option, OptGroup } = Select;
var token = localStorage.getItem('token')

interface State {
  status: string
  cuisine: CuisineInfo
  cuisineName: string
  defaultCoverImgs: any[]
  defaultDetailImgs: any[]
  disabled: boolean
  warningAlert: boolean
  tag: string
  price: string
}


export default class extends React.Component<RouteComponentProps<any>, State> {

  state: State = {
    status: '',
    cuisine: {
      id: 0,
      ctime: 0,
      c_name: '',
      tag: '',
      price: 0,
      coverUrl: '',
      detailUrls: []
    },
    cuisineName: '',
    price: '',
    tag: '',
    defaultCoverImgs: [],
    defaultDetailImgs: [],
    disabled: false,
    warningAlert: false
  }




  render() {

    /**
     * 设置 commodity
     */
    const { cuisine } = this.state
    /**
     * 设置类别的选项
     */
    // const optionItems = this.state.options.map((optItem, index) => {
    //   return <Option value={optItem.name} key={index}>{optItem.name}</Option>
    // })

    // var tags = this.state.commodity.src_skuType.map((tag) => {
    //   return tag.name
    // })

    return (
      <Layout className='edit-commodity-style'>
        <Header>
          <Button type="primary" onClick={() => this.props.history.goBack()}>返回</Button>
        </Header>
        <Content>
          <div className='flex padding-top'>
            <label className='width-title'>菜品名称:</label>
            <Input
              style={{ width: 200 }}
              value={cuisine.c_name}
              onChange={(event) => { this.setValue('name', event.target.value.trim()) }}
              disabled={this.state.disabled} />
          </div>
          <div className='flex padding-top'>
            <div className='width-title'>封面图:</div>
            <div style={{ width: "100%" }}>
              {/*使用上传组件，传入*/}  {/*存疑*/}
              <UploadImage
                propsImgs={this.state.defaultCoverImgs}
                maxImage={3}
                updateStateProp={this.uploadChange_addCovors.bind(this)}
                action={"/upload/form"}
                disabled={this.state.disabled} />
            </div>
          </div>
          <div className='flex padding-top'>
            <div className='flex margin-right'>
              <div className='width-title'>
                <label>价格:</label>      {/*js转换成字符串有三种，如果直接用tostring万一为空就会报错*/}
                {this.state.warningAlert ? <p className='warning'>*输入无效字符</p> : ''}
              </div>
              <Input
                style={{ width: 150 }}
                addonAfter='元'
                value={cuisine.price}
                onChange={(event) => { this.setValue('price', event.target.value.trim()) }}
                disabled={this.state.disabled} />
            </div>
            {/* <div className='flex margin-right'>
              <div className='width-title'>
                <label>原价:</label>      
                // js转换成字符串有三种，如果直接用tostring万一为空就会报错
                {this.state.warningAlert ? <p className='warning'>*输入无效字符</p> : ''}
              </div>
              <Input
                style={{ width: 150 }}
                addonAfter='元'
                value={this.state.original_price}
                onChange={(event) => { this.setValue('original_price', event.target.value.trim()) }}
                disabled={this.state.disabled} />
            </div>  */}
            {/* <div className='flex'>
              <label className='width-title'>库存数:</label>
              <InputNumber
                style={{ width: 150 }}
                min={0}
                value={commodity.total_stock}
                onChange={(value) => { this.setValue('total_stock', value) }}
                disabled={this.state.disabled} />
            </div> */}
          </div>
          <div className=' flex padding-top'>
            <label className='width-title'>
              <span>标签:</span>
            </label>
            <Input
              style={{ width: 150 }}
              value={cuisine.tag} />
            {/* <Select
              showArrow={true}
              mode="multiple"
              value={tags}
              style={{ width: 431 }}
              onSelect={(value) => {
                this.setValue('src_skuType', value)
              }
              }
              onDeselect={(val) => {
                this.setValue('src_skuType_Remove', val)
              }
              }
              disabled={this.state.disabled} >
              {optionItems}
            </Select> */}
          </div>
          <div className='flex padding-top'>
            <div className='width-title'>菜品详情:</div>
            <div style={{ width: "100%" }}>
              <UploadImage
                propsImgs={this.state.defaultDetailImgs}
                maxImage={1}
                updateStateProp={this.uploadChange_addDetail.bind(this)}
                action={"/upload/form"}
                disabled={this.state.disabled} />
            </div>
          </div>
        </Content>
        <Footer hidden={this.state.status === 'view'}>
          <div className='footer'>
            <Button className='margin-right' type="primary" onClick={this.save.bind(this)}>保存</Button>
            <Button type="primary" onClick={this.cancel.bind(this)}>{this.state.cuisine.id !== null ? '取消' : '置空'}</Button>
          </div>
        </Footer>
      </Layout>

    )
  }

  /**
   * 改变商品详情上传图片的绑定函数
   */
  uploadChange_addDetail(value: any[]) {
    // this.state.commodity.details = value[0].
    this.setState({
      defaultDetailImgs: value
    })
  }

  /**
   * 改变商品轮播图上传图片的绑定函数
   */
  uploadChange_addCovors(value: any[]) {
    // console.log('Covors======================>', value)
    this.setState({
      defaultCoverImgs: value
    })
    // console.log('covers:', value)
    // this.state.commodity.images = value
    // this.setState({
    //   commodity: this.state.commodity
    // })
  }

  /**
   * 改变商品属性的函数
   */

  // updateAttributes(value:string[]){
  //   this.state.commodity.attri=value
  //   this.setState({
  //     commodity:this.state.commodity
  //   })
  // }

  setValue(key: string, value: any) {
    switch (key) {
      case 'name':
        this.state.cuisine[key] = value
        break
      case 'price':
        this.setState({
          price: value
        })
        break
      case 'total_stock':
        this.state.cuisine[key] = value
        break
      // case 'src_skuType':
      //   // console.log(value)
      //   if (value)
      //     this.state.options.forEach((opt) => {
      //       if (opt.name === value) this.state.commodity[key].push(opt)
      //     })

      //   // console.log('add', this.state.commodity["src_skuType"])
      //   break
      // case 'src_skuType_Remove':
      //   let orgin = this.state.commodity["src_skuType"]
      //   for (let i = 0, len = orgin.length; i < len; i++) {
      //     if (orgin[i].name === value) {
      //       this.state.commodity["src_skuType"].splice(i, 1)
      //       break
      //     }
      //   }
      //   break
    }

    this.setState({
      cuisine: this.state.cuisine
    })
  }

  verifyDataForm() {
    // console.log('verifyDataForm')
    if (this.state.cuisine.c_name === '' ||
      this.state.price === '' ||
      this.state.tag === null) {
      Modal.error({
        title: '提示',
        content: "请完善商品信息"
      })
    } else if (this.state.price !== null && !(/^([0]|[0-9])+(\.[0-9]{1,2})?$/.test(this.state.price))) {
      Modal.error({
        title: '提示',
        content: '请检查输入价格是否有效！(价格最多保留两位小数)'
      })
    } else {
      return true
    }
  }

  save() {

    // console.log(`save`)

    var images: string[] = [];
    this.state.defaultDetailImgs.forEach((x, i) => {
      // console.log(`defaultCoverImgs${i}`,x)
      if (x.status == 'done')
        images.push(x.response ? x.response.url : x.url)
    })
    this.state.cuisine.detailUrls = images;

    let x = this.state.defaultCoverImgs[0];
    if (x.status == 'done')
      this.state.cuisine.coverUrl = x.response ? x.response.url : x.url;

    if (!this.verifyDataForm()) {
      return;
    }
    if (this.state.status === 'edit') {
      /**
       * 修改商品信息,调用修改商品的接口
       */

      this.setCommodity(this.state.cuisine).then(() => {
        // let skuTypeIds = this.state.cuisine.src_skuType.map((val) => {
        //   return val.id
        // })
        // console.log("skuTypeIds", skuTypeIds)
        // console.log("this.state.commodity", this.state.commodity)
        this.props.history.goBack()
      })

      // console.log(`modify`)
    } else {
      /**
       * 增加一个商品，调用增加商品的接口
       */
      this.setState({
        cuisine: this.state.cuisine
      })
      this.addCommodity(this.state.cuisine).then(() => {
        this.props.history.goBack()
        // console.log('afterAdd', this.state.commodity)
      })
    }
  }

  cancel() {
    /**
     * flag=true则是返回商品信息页
     */
    if (this.state.status === 'edit') {
      this.props.history.goBack() //返回商品信息页
    } else {
      //置空
      this.setState({
        cuisine: {
          id: null,
          ctime: 0,
          c_name: '',
          tag: '',
          price: null,
          coverUrl: '',
          detailUrls: []
        },
        cuisineName:'',
        tag:'',
        price:''
      })
    }
  }

  /**
   * 编辑商品信息的函数
   */

  async setCommodity(preCommodity: CuisineInfo) {
    try {
      // let skuTypeIds = preCommodity.src_skuType.map((val) => {
      //   return val.id
      // })
      // console.log('skuTypeIds', skuTypeIds)
      let price = parseFloat(this.state.price) * 100
      // let original_price = parseFloat(this.state.original_price) * 100
      // console.log('original_price', original_price)
      // console.log('price', price)
      const result = await SkuApi.AdminSetSku({
        // token: token,
        skuId: preCommodity.id,
        name: preCommodity.c_name,
        images: [],
        details: '',
        total_stock: 0,
        price: price,
        original_price: 0,
        skuTypeIds: []
      })
      if (result.stat === 'ok') {
        message.success('保存成功')
      } else {
        throw result.stat
      }
    } catch (error) {
      message.error('保存失败')
      // console.log(error)
    }
  }

  /**
   * 增加商品信息的函数
   */
  async addCommodity(preCommodity: CuisineInfo) {
    try {
      // let skuTypeIds = preCommodity.src_skuType.map((val) => {
      //   return val.id
      // })
      let price = parseFloat(this.state.price) * 100
      // let original_price = parseFloat(this.state.original_price) * 100
      // console.log('original_price', original_price)
      // console.log('price', price)
      // console.log('skuTypeIds', skuTypeIds)
      const result = await SkuApi.AdminAddSku({
        // token: token,
        name: preCommodity.c_name,
        images: [],
        details: '',
        total_stock: 0,
        price: price,
        original_price: 0,
        skuTypeIds: []
      })
      if (result.stat === 'ok') {
        // console.log(result.skuId)
        message.success('添加成功')
        // Modal.success({
        //   title: '提示',
        //   content: "添加成功"
        // })
      } else {
        message.error('添加失败')
        throw result.stat //手动抛出异常
      }
    } catch (error) {
      message.error('添加失败')
      // console.log(error)
    }
  }

  /**
   * 获取商品信息的函数
   */
  async getCommodity(skuId: number) {
    try {
      const result = await SkuApi.AdminGetSkuInfoSku({
        // token: token,
        skuId: skuId
      })
      if (result.stat === 'ok') {
        let coverImgs = result.item.images.map((element, index) => {
          return {
            uid: index,
            name: 'coverImgs',
            size: 0,
            type: 'image',
            status: 'done',
            url: element
          }
        })
        let detailImgs = [{
          uid: 0,
          name: 'coverImgs',
          size: 0,
          type: 'image',
          status: 'done',
          url: result.item.details
        }]
        let price = (result.item.price / 100).toString()
        let original_price = (result.item.original_price / 100).toString()
        this.setState({
          defaultCoverImgs: coverImgs,
          defaultDetailImgs: detailImgs,
          // commodity: result.item,
          price: price,
          // original_price: original_price
        })
        // console.log('AsnycaddCoverImgs', this.state.addCoverImgs)
        // console.log('AsnyaddDetailImgs', this.state.addDetailImgs)
      } else {
        throw result.stat
      }
    } catch (error) {
      Modal.error({
        title: '提示',
        content: error
      })
      // console.log(error)
    }
  }

  async listSkuType() {
    try {
      const result = await AdminListSkuType()
      if (result.stat === 'ok') {
        // this.setState({
        //   options: result.items
        // })
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
  
  componentWillMount() {

    // console.log(this.props)
    const status = this.props.match.params.status
    const id = this.props.match.params.id
    // console.log(id)
    // this.setState({
    //   status: status
    // })
    
    if (status !== 'add') {
      //请求商品数据
      // this.getCommodity(id)
      cuisineList.map((item, i) => {
        console.log(item)
        if (item.id === id) {
          this.setState({
            cuisine: item
          })
        }
      })
      if (status === 'view') {
        this.setState({
          disabled: true
        })
      }
    }
    // /**
    //  * 请求选项
    //  */
    // this.listSkuType()

    // this.setState({
    //   status: status
    // })
  }
}