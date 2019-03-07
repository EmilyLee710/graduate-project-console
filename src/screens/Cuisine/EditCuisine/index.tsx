import * as React from 'react'

import { Button, Input, Modal, Layout, Select, InputNumber, Icon, message, Tag, Tooltip } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'
import { CuisineInfo } from '../../../interfaces/model'
// import * as SkuApi from '../../../services/SkuApi'
import * as CuisineService from '../../../services/CuisineApi'
// import { AdminListSkuType } from '../../../services/OperationApi'
import cuisineList from '../CuisineList'
import store from '../../../Store'
import UploadImage from '../../../components/UploadImageForsku'
import Cuisine from '..';

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
  origin_price: string
}


export default class extends React.Component<RouteComponentProps<any>, State> {

  state: State = {
    status: '',
    cuisine: {
      id: null,
      ctime: 0,
      c_name: '',
      tag: '',
      price: null,
      origin_price: null,
      cover_url: '',
      detail_url: ''
    },
    cuisineName: '',
    price: '',
    origin_price: '',
    tag: '',
    defaultCoverImgs: [],
    defaultDetailImgs: [],
    disabled: false,
    warningAlert: false
  }




  render() {

    /**
     * 设置 cuisine
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
              onChange={(event) => { this.setValue('c_name', event.target.value.trim()) }}
              disabled={this.state.disabled} />
          </div>
          <div className='flex padding-top'>
            <div className='width-title'>封面图:</div>
            <div style={{ width: "100%" }}>
              {/*使用上传组件，传入*/}  {/*存疑*/}
              <UploadImage
                propsImgs={this.state.defaultCoverImgs}
                maxImage={1}
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
                value={this.state.price}
                onChange={(event) => { this.setValue('price', event.target.value.trim()) }}
                disabled={this.state.disabled} />
            </div>
            <div className='flex margin-right'>
              <div className='width-title'>
                <label>原价:</label>
                {/* // js转换成字符串有三种，如果直接用tostring万一为空就会报错 */}
                {this.state.warningAlert ? <p className='warning'>*输入无效字符</p> : ''}
              </div>
              <Input
                style={{ width: 150 }}
                addonAfter='元'
                value={this.state.origin_price}
                onChange={(event) => { this.setValue('origin_price', event.target.value.trim()) }}
                disabled={this.state.disabled} />
            </div>
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
              value={cuisine.tag}
              onChange={(event) => { this.setValue('tag', event.target.value.trim()) }} />
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
    // console.log('detail',value)
    this.setState({
      defaultDetailImgs: value
    })
  }

  /**
   * 改变商品轮播图上传图片的绑定函数
   */
  uploadChange_addCovors(value: any[]) {
    // console.log('Covors===>', value[0].response)
    this.setState({
      defaultCoverImgs: value
    })
    // console.log('covers:', value)
    // this.state.commodity.images = value
    // this.setState({
    //   commodity: this.state.commodity
    // })
  }

  setValue(key: string, value: any) {
    switch (key) {
      //   case 'c_name':
      //     this.state.cuisine[key] = value
      //     break
      case 'price':
        // this.state.cuisine[key] = parseInt(value) * 100
        this.setState({
          price: value
        })
        break
      case 'origin_price':
        this.setState({
          origin_price: value
        })
        break
      //   case 'tag':
      //     this.setState({
      //       tag: value
      //   })
      //   break
      default:
        this.state.cuisine[key] = value
        break
    }
    this.setState({
      cuisine: this.state.cuisine
    })
  }

  verifyDataForm() {
    // console.log('verifyDataForm')
    if (this.state.cuisine.c_name === '' ||
      this.state.cuisine.tag === '' ||
      this.state.price === null ||
      this.state.origin_price === null) {
      Modal.error({
        title: '提示',
        content: "请完善商品信息"
      })
    }
    // else if (this.state.price !== null && !(/^([0]|[0-9])+(\.[0-9]{1,2})?$/.test(this.state.price))) {
    //   Modal.error({
    //     title: '提示',
    //     content: '请检查输入价格是否有效！(价格最多保留两位小数)'
    //   })
    // } 
    else {
      return true
    }
  }

  save() {

    // console.log(`save`)
    // console.log(this.state.defaultDetailImgs,this.state.defaultCoverImgs)
    console.log('tag',this.state.cuisine.tag)
    if (this.state.defaultDetailImgs.length >0 && this.state.defaultCoverImgs.length>0) {
      var images: string[] = [];
      this.state.defaultDetailImgs.forEach((item, i) => {
        // console.log(`defaultCoverImgs${i}`,item)
        // if (item.status == 'done')
        images.push(item.response)
      })
      this.state.cuisine.detail_url = images[0];
      // console.log('deimg',images[0])
      let img = this.state.defaultCoverImgs[0];
      // if (img.status == 'done')
      this.state.cuisine.cover_url = img.response;
      // console.log('coimg',img.response)
      if (!this.verifyDataForm()) {
        return;
      }
      if (this.state.status === 'edit') {
        /**
         * 修改商品信息,调用修改商品的接口
         */

        this.setCuisine(this.state.cuisine).then(() => {
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
        this.addCuisine().then(() => {
          this.props.history.goBack()
          // console.log('afterAdd', this.state.commodity)
        })
      }
    } else {
      message.error('请上传图片')
      return
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
          origin_price: null,
          cover_url: '',
          detail_url: ''
        },
        cuisineName: '',
        tag: '',
        price: null,
        origin_price: ''
      })
    }
  }

  /**
   * 编辑商品信息的函数
   */

  async setCuisine(preCuisine: CuisineInfo) {
    try {
      let price = parseFloat(this.state.price) * 100
      let origin_price = parseFloat(this.state.origin_price) * 100
      if (this.state.cuisine.cover_url === '' || this.state.cuisine.detail_url === '') {
        message.error('请上传图片')
        return
      } else {
        console.log('cover', this.state.cuisine.cover_url)
        console.log('detail', this.state.cuisine.detail_url)
        let cover = `/imgs/${this.state.defaultCoverImgs[0].response}`
        let detail = `/imgs/${this.state.defaultDetailImgs[0].response}`
        const result = await CuisineService.RestauSetCuiInfo({
          // token: token,
          CuisineId: this.state.cuisine.id,
          c_name: preCuisine.c_name,
          cover_url: cover,
          price: price,
          origin_price: origin_price,
          detail_url: detail,
          tag: preCuisine.tag
        })
        if (result.stat === '1') {
          message.success('保存成功')
        } else {
          throw result.stat
        }
      }

    } catch (error) {
      message.error('保存失败')
      // console.log(error)
    }
  }

  /**
   * 增加菜品信息的函数
   */
  async addCuisine() {
    try {
      const restaurantid = parseInt(localStorage.getItem('restauId'))
      let price = parseFloat(this.state.price) * 100
      let origin_price = parseFloat(this.state.origin_price) * 100
      console.log('cover', this.state.cuisine.cover_url)
      console.log('detail', this.state.cuisine.detail_url)
      if (this.state.cuisine.cover_url === '' || this.state.cuisine.detail_url === '') {
        message.error('请上传图片')
        return
      } else {
        let cover = `/imgs/${this.state.defaultCoverImgs[0].response}`
        let detail = `/imgs/${this.state.defaultDetailImgs[0].response}`
        const result = await CuisineService.RestauAddCuisine({
          // token: token,
          restau_id: restaurantid,
          c_name: this.state.cuisine.c_name,
          cover_url: cover,
          detail_url: detail,
          price: price,
          origin_price: origin_price,
          tag: this.state.cuisine.tag
        })
        console.log('addstat',result.stat)
        if (result.stat === '1') {
          console.log(result.CuisineId)
          message.success('添加成功')
          // this.props.history.goBack()
        } else {
          message.error('添加失败')
          throw result.stat //手动抛出异常
        }
      }
    }
    catch (error) {
      message.error('catch', error)
      // console.log(error)
    }
  }

  /**
   * 获取商品信息的函数
   */
  async getCuisine(cuiId: number) {
    try {
      const result = await CuisineService.RestauGetCuiInfo({
        // token: token,
        CuisineId: cuiId
      })
      // if (result.stat === 'ok') {
      let info = {
        id: result.cuisine.id,
        ctime: result.cuisine.ctime,
        c_name: result.cuisine.c_name,
        tag: result.cuisine.tag,
        price: result.cuisine.price,
        origin_price: result.cuisine.origin_price,
        cover_url: result.cuisine.cover_url,
        detail_url: result.cuisine.detail_url
      }
      let coverImgs = [{
        uid: 0,
        name: 'coverImgs',
        size: 0,
        type: 'image',
        status: 'done',
        url: result.cuisine.cover_url
      }]
      let detailImgs = [{
        uid: 0,
        name: 'coverImgs',
        size: 0,
        type: 'image',
        status: 'done',
        url: result.cuisine.detail_url
      }]
      let price = (result.cuisine.price / 100).toString()
      let origin_price = (result.cuisine.origin_price / 100).toString()
      this.setState({
        defaultCoverImgs: coverImgs,
        defaultDetailImgs: detailImgs,
        // commodity: result.item,
        cuisine: info,
        price: price,
        origin_price: origin_price
      })
      // console.log('AsnycaddCoverImgs', this.state.addCoverImgs)
      // console.log('AsnyaddDetailImgs', this.state.addDetailImgs)
      // } else {
      //   throw result.stat
      // }
    } catch (error) {
      Modal.error({
        title: '提示',
        content: error
      })
      // console.log(error)
    }
  }

  // async listSkuType() {
  //   try {
  //     const result = await AdminListSkuType()
  //     if (result.stat === 'ok') {
  //       // this.setState({
  //       //   options: result.items
  //       // })
  //     } else {
  //       throw result.stat
  //     }
  //   } catch (error) {
  //     Modal.error({
  //       title: '提示',
  //       content: error
  //     })
  //   }
  // }

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
      this.getCuisine(id)
      // cuisineList.map((item, i) => {
      //   console.log(item)
      //   if (item.id === id) {
      //     this.setState({
      //       cuisine: item
      //     })
      //   }
      // })
      // if (status === 'view') {
      //   this.setState({
      //     disabled: true
      //   })
      // }
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