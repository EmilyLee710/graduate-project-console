import * as React from 'react'
import { ConfigInfo, SkuTypeInfo, HomeImagesInfo } from '../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message, Tag, Tooltip } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'

import store from '../../Store'
import Operation from 'antd/lib/transfer/operation';
import * as OperationApi from '../../services/OperationApi'
// import EditableTagGroup from '../../components/EditTagGroup'
import { HomeImagecommit, GetHomeImage } from '../../interfaces/Model'
import UploadImage from '../../components/UploadImage'

const confirm = Modal.confirm;
const { Header, Footer, Sider, Content } = Layout;
var token = localStorage.getItem('token')
var homeImgInfoOrigin: HomeImagesInfo[] = []
var isSubmit: boolean = true

interface ImageItem {
  uid: number,
  name: string,
  size: number,
  type: string,
  status: string,
  url: string,
  thumbUrl: string
}

interface State {
  previewVisible: boolean
  previewImage: string
  inputVisible: boolean
  ConfigInfo: ConfigInfo
  SkuTypeNames: string[]
  SkuTypeOrigin: SkuTypeInfo[]
  deleteTagIds: number[]
  inputValue: string
  addCoverImgs: ImageItem[]   //上传的文件列表
  defaultImgs: any[]
  imgUrl: string[]
  positoins: number[]
  disabled: boolean
  posCount: number
  origin: HomeImagesInfo[]
  defaultLen: number
}

export default class extends React.Component<RouteComponentProps<any>, State> {
  input: any
  state: State = {
    previewVisible: false,
    previewImage: '',
    inputVisible: false,
    ConfigInfo: {
      id: 0,
      home_images: [],
      freight_config: 0,
      after_sale_address: ''
    },
    SkuTypeNames: [],
    SkuTypeOrigin: [],
    deleteTagIds: [],
    inputValue: '',
    addCoverImgs: [],
    defaultImgs: [
      {
        uid: -1,
        name: 'ff',
        size: 0,
        type: 'image',
        status: 'done',
        url: ''
      }, {
        uid: -1,
        name: 'ff',
        size: 0,
        type: 'image',
        status: 'done',
        url: ''
      }, {
        uid: -1,
        name: 'ff',
        size: 0,
        type: 'image',
        status: 'done',
        url: ''
      }
    ],
    imgUrl: [],
    positoins: [],
    disabled: false,
    posCount: 0,
    origin: [],
    defaultLen: 0
  };

  render() {
    const { previewVisible, previewImage, ConfigInfo, addCoverImgs } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );


    var tmpImgs = Array(this.state.posCount).fill('1')
    var updateShow = () => {
      let tmp = tmpImgs.map((val, index) => {
        // console.log('index',index)
        return <div key={index + "ddd"} className='uploadGroup'>
          <UploadImage
            position={index}
            propsImgs={[this.state.defaultImgs[index]]}
            maxImage={1}
            updateStateProp={this.updateImgs.bind(this)}
            action={"/upload/form"}
          />
          <div style={{ textAlign: "center" }}>位置:第{index + 1}张</div>
        </div>
      })
      return tmp
    }

    return (
      <Layout className='operation-style'>
        <Content>
          <div className='padding-top'>
            <div className='width-title'>首页轮播图:</div>
            <div className='switchImgs'>
              {updateShow()}
              {/* <div className='buttonGroup'>
                <Button onClick={() => {
                  this.state.addCoverImgs.push({
                    uid: -1,
                    name: 'ff',
                    size: 0,
                    type: 'image',
                    status: 'done',
                    url: '',
                    thumbUrl:''
                  })
                  this.setState({
                    posCount: this.state.posCount + 1,
                    addCoverImgs: this.state.addCoverImgs
                  })
                }}>+</Button>
                <Button onClick={() => {
                  if (this.state.posCount > 1) {
                    this.state.addCoverImgs.pop()       //至少有一张
                    this.setState({
                      posCount: this.state.posCount - 1,
                      addCoverImgs: this.state.addCoverImgs
                    })
                  }
                }}>-</Button>
              </div> */}
            </div>
          </div>
          {/* <div className='padding-top'>
            <div className='width-title'>商品分类:</div>
            <div className='flex padding-top'>
              <EditableTagGroup
                tags={this.state.SkuTypeNames}
                newTagName={"新增分类"}
                updateStateProp={this.updateSkuTags.bind(this)} />

            </div>
          </div> */}
          {/* <div className='flex padding-top'>
            <div className='width-title'>统一运费:</div>
            <InputNumber
              style={{ width: 150 }}
              min={1} max={10000000}
              value={ConfigInfo.freight_config}
              onChange={(value) => { this.setValue('freight_config', value) }}
              disabled={this.state.disabled} />
            
          </div> */}
          {/* <div className='flex padding-top'>
            <div>售后退货信息:</div>
            <Input
              placeholder='请输入地址、电话、联系人'
              style={{ width: 500, marginLeft: 10 }}
              value={ConfigInfo.after_sale_address}
              onChange={(e: any) => { this.setValue('after_sale_address', e.target.value.trim()) }} />
          </div> */}
          <div className='flex padding-top'>
            <Button type='primary' onClick={this.handleSubmit.bind(this)}>保存</Button>
          </div>
        </Content>
      </Layout>
    )
  }

  /**
   * 将数据保存到state
   */
  setValue(key: string, value: any) {
    // console.log(`key:${key}`, `value:${typeof value}${value}`)

    this.state.ConfigInfo[key] = value
    // console.log('prev', this.state.ConfigInfo)
    this.setState({
      ConfigInfo: this.state.ConfigInfo,
    })

  }
  /**
   * 关闭图片预览
   */
  handleCancel = () => this.setState({ previewVisible: false })
  /**
   * 预览图片
   */
  handlePreview = (file: any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  updateImgs(value: string[], position: number) {
    console.log('value', value, 'position', position)
    if (value.length === 0) value.push('')
    if (value.length > 0) {
      this.state.addCoverImgs[position] = {
        uid: -1,
        name: 'ff',
        size: 0,
        type: 'image',
        status: 'done',
        url: value[0],
        thumbUrl: value[0]
      }
      // this.state.defaultImgs[position] = {
      //   uid: -1,
      //   name: 'ff',
      //   size: 0,
      //   type: 'image',
      //   status: 'done',
      //   url: value[0],
      //   thumbUrl: value[0]
      // }
      this.setState({
        addCoverImgs: this.state.addCoverImgs,
        // defaultImgs:this.state.defaultImgs
      })
    } else{
      this.state.addCoverImgs[position] = {
        uid: -1,
        name: 'ff',
        size: 0,
        type: 'image',
        status: 'done',
        url: '',
        thumbUrl: ''
      }
      // this.state.defaultImgs[position] = {
      //   uid: -1,
      //   name: 'ff',
      //   size: 0,
      //   type: 'image',
      //   status: 'done',
      //   url: '',
      //   thumbUrl: ''
      // }
      this.setState({
        addCoverImgs: this.state.addCoverImgs,
        // defaultImgs:this.state.defaultImgs
      })
    }


    // console.log('cover:', this.state.addCoverImgs)
    // console.log('img',imgs)

  }



  /**
   * 新增分类的函数
   */

  updateSkuTags(value: string[]) {

    this.setState({
      SkuTypeNames: value
    })
  }



  verifyDataForm() {
    // console.log('verifyDataForm')
    if (this.state.ConfigInfo.after_sale_address === '') {
      Modal.error({
        title: '提示',
        content: "请完善设置信息"
      })
    } else {
      return true
    }
  }


  handleSubmit() {
    /**
     * 将数据保存至接口
     */
    // if (!this.verifyDataForm()) {
    //   return;
    // }
    if (this.state.addCoverImgs.length > 0) {
      let covers: HomeImagecommit[] = []
      this.state.addCoverImgs.map((item, index) => {
        covers.push({
          url: `${item.url}`,
          index: index
        })
      })
      console.log('covers', covers)
      this.addHomeImage(covers)
    } else {
      message.error('请上传图片')
    }


    /**
     * 设置原始的orgin 使之与现在位置一一映射，
     * 若该position不存在origin则用填充
     */
    // let maxLen = this.state.addCoverImgs.length > this.state.defaultLen ? this.state.addCoverImgs.length : this.state.defaultLen

    // var original = new Array
    // for (let i = 0; i < maxLen; i++) {
    //   original.push({
    //     id: -1,
    //     url: ''
    //   })
    // }

    // console.log('orginalBefore', original)
    // console.log('origin',this.state.origin)
    // this.state.origin.forEach((item, index) => {
    //   // console.log(`第${index}次`,item)
    //   original[item.postion - 1].id = item.id
    //   original[item.postion - 1].url = item.image_url
    // })
    // console.log('origin', this.state.origin)
    // console.log('orginal', original)
    // console.log('addCoverImgs', this.state.addCoverImgs)
    /**
     * 对应的改变规则（此时original与addcoverimgs存在一一对应的关系）
     */

    // original.map((val, index) => {
    //   let tmp
    //   if (index < this.state.addCoverImgs.length)
    //     tmp = this.state.addCoverImgs[index]
    //   else tmp = {
    //     uid: -1,
    //     name: 'ff',
    //     size: 0,
    //     type: 'image',
    //     status: 'done',
    //     url: ''
    //   }

    //   if (val.id !== -1) {
    //     //对应位置position 原来有图片
    //     if (tmp.url !== val.url && tmp.url !== '') this.setHomeImage(val.id, tmp.url)
    //     // else if (tmp.url === '') this.deleteHomeImage(val.id)
    //   }
    //   else {
    //     if (tmp.url !== '') this.addHomeImage(tmp.url, index + 1)
    //   }
    // })

    // original.map((val, index) => {
    // let tmp
    // if (index < this.state.addCoverImgs.length)
    //   tmp = this.state.addCoverImgs[index]
    // else tmp = {
    //     uid: 1,
    //     name: 'ff',
    //     size: 0,
    //     type: 'image',
    //     status: 'done',
    //     url: ''
    // }
    //   if (val.id!==0) {
    //     //对应位置position 原来有图片
    //     if (tmp.length > 0) {
    //       /**
    //        * 如果tmp存在，url非空且不相等，说明改了，调用改变接口
    //        * url为空，则说明删了，调用删除接口
    //        */
    //       if (tmp.url !== '' && tmp.url != val.image_url) this.setHomeImage(val.id, tmp.url)
    //       else if (tmp.url === '') this.deleteHomeImage(val.id)
    //     }
    //     /**
    //      * tmp不存在，则说明这个图被清空过，而且没有传过新图片
    //      * （进行了增增减减uploader的骚操作，导致对应位置的coverimg被设为null）
    //      * 因为new Uploader 对应coverImg会设为null 但只要进行过上传操作，coverimg均会存在 只是url是否为空的区别
    //      */
    //     else this.deleteHomeImage(val.id)
    //   } else {
    //     /**
    //      * 当原来对应position位置无图片
    //      * 如果url不为空，则就可以增加
    //      */
    //     if (tmp.length > 0 && tmp.url.length > 0) {
    //       this.addHomeImage(tmp.url, index + 1)
    //     }
    //   }
    // })
    /**
     * 存储删除的tagIds,调用接口删除
     */
    /**
     * 存储要增加的tag，调用接口增加
     */

    // console.log('addNewTags', addNewTags, 'deleteIds', deleteIds)
    /**
     * 调用增加和删除的接口
     */

    /**
     * 修改运费
     */
    // this.setGlobalFreight(this.state.ConfigInfo.freight_config * 100)
    /**
     * 修改全局售后地址
     */
    // this.setGlobalAfterSalesAddress(this.state.ConfigInfo.after_sale_address)

    // if (isSubmit) {
    //   message.success('保存成功')
    // } else {
    //   message.error('保存失败')
    // }
  }

  /**
   * 添加首页轮播图
   */
  async addHomeImage(images: HomeImagecommit[]) {
    try {
      const result = await OperationApi.AdminAddHomeImgs({
        // token: token,
        images: images
      })
      if (result.stat !== '1') {
        isSubmit = false
        throw result.stat
      } else {
        message.success('上传成功')
      }
    } catch (error) {
      Modal.error({
        title: '提示',
        content: error
      })
    }
  }

  /**
   * 获取首页轮播图
   */
  async getAllHomeImages() {
    try {
      const result = await OperationApi.GetHomeSwipers()
      // if (result.stat === 'ok') {
      // console.log('getimages', result.items)
      console.log('result', result.swiper)
      if (result.swiper.length <= 0) {
        this.setState({
          addCoverImgs: [{
            uid: -1,
            name: 'ff',
            size: 0,
            type: 'image',
            status: 'done',
            url: '',
            thumbUrl: ''
          }
          ],
          defaultImgs: [{
            uid: -1,
            name: 'ff',
            size: 0,
            type: 'image',
            status: 'done',
            url: '',
            thumbUrl: ''
          }
          ],
          origin: []
        })
      } else {
        //位置与图片相对应
        let maxPos = result.swiper.length
        // console.log('pos',maxPos)
        let imgs = new Array
        for (let i = 0; i < 3; i++) {
          imgs.push({
            uid: -1,
            name: 'ff',
            size: 0,
            type: 'image',
            status: 'done',
            url: '',
            thumbUrl: ''
          })
        }

        result.swiper.map((item, index) => {
          imgs[item.index].url = item.url
          imgs[item.index].thumbUrl = item.url
        })
        console.log('imgs', imgs)
        this.setState({
          posCount: maxPos,
          // origin: result.items,
          addCoverImgs: imgs,
          defaultImgs: imgs,
          // defaultLen: maxPos
        })
      }
      // console.log('origin', this.state.origin)
      // console.log('defaultImgs',this.state.defaultImgs)

      // else {
      //   throw result.stat
      // }
    } catch (error) {
      Modal.error({
        title: '提示',
        content: error
      })
    }
  }
  /**
   * 删除首页轮播图的图片
   */
  // async deleteHomeImage(homeImageId: number) {
  //   try {
  //     const result = await OperationApi.AdminDeleteHomeImage({
  //       // token: token,
  //       homeImageId: homeImageId
  //     })
  //     if (result.stat !== 'ok') {
  //       isSubmit = false
  //       throw result.stat
  //     }
  //   } catch (error) {
  //     Modal.error({
  //       title: '提示',
  //       content: error
  //     })
  //   }
  // }


  // /**
  //  * 获取运费与售后地址信息
  //  */
  // async getFreightAndAfterSalesAddressConfig() {
  //   try {
  //     const result = await OperationApi.AdminGetFreightAndAfterSalesAddressConfig()
  //     if (result.stat === 'ok') {
  //       // console.log(typeof result.config.freight_config, result.config.freight_config)
  //       let configs = result.config
  //       let freight = result.config.freight_config / 100
  //       configs.freight_config = freight
  //       // console.log(configs)
  //       this.setState({
  //         ConfigInfo: configs
  //       })
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

  /**
   * 添加商品分类
   */
  // async addSkuType(name: string) {
  //   try {
  //     const result = await OperationApi.AdminAddSkuType({
  //       // token: token,
  //       name: name
  //     })
  //     if (result.stat !== 'ok') {
  //       isSubmit = false
  //       throw result.stat
  //     }
  //   } catch (error) {
  //     Modal.error({
  //       title: '提示',
  //       content: error
  //     })
  //   }
  // }

  /**
   * 删除商品分类对象
   */
  // async deletedSkuType(skuTypeIds: number[]) {
  //   try {
  //     const result = await OperationApi.AdminDeletedSkuType({
  //       // token: token,
  //       skuTypeIds: skuTypeIds
  //     })
  //     if (result.stat !== 'ok') {
  //       isSubmit = false
  //       throw result.stat
  //     }
  //   } catch (error) {
  //     Modal.error({
  //       title: '提示',
  //       content: error
  //     })
  //   }
  // }

  /**
   * 枚举商品类型
   */
  // async listSkuType() {
  //   try {
  //     const result = await OperationApi.AdminListSkuType()
  //     if (result.stat === 'ok') {
  //       let names = result.items.map((val) => { return val.name })
  //       this.setState({
  //         SkuTypeNames: names,
  //         SkuTypeOrigin: result.items
  //       })
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

  /**
   * 设置全局的售后地址
   */
  // async setGlobalAfterSalesAddress(afterSale_address: string) {
  //   try {
  //     const result = await OperationApi.AdminSetGlobalAfterSalesAddress({
  //       // token: token,
  //       afterSale_address: afterSale_address
  //     })
  //     if (result.stat !== 'ok') {
  //       isSubmit = false
  //       throw result.stat
  //     }
  //   } catch (error) {
  //     Modal.error({
  //       title: '提示',
  //       content: error
  //     })
  //   }
  // }

  /**
   * 设置全局的运费
   */
  // async setGlobalFreight(freight: number) {
  //   try {
  //     const result = await OperationApi.AdminSetGlobalFreight({
  //       // token: token,
  //       freight: freight
  //     })
  //     if (result.stat !== 'ok') {
  //       isSubmit = false
  //       throw result.stat
  //     }
  //   } catch (error) {
  //     Modal.error({
  //       title: '提示',
  //       content: error
  //     })
  //   }
  // }

  /**
   * 修改首页轮播图的图片
   */
  // async setHomeImage(homeImageId: number, image_url: string) {
  //   try {
  //     const result = await OperationApi.AdminSetHomeImage({
  //       // token: token,
  //       homeImageId: homeImageId,
  //       image_url: image_url
  //     })
  //     if (result.stat !== 'ok') {
  //       isSubmit = false
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
    /**
     * 获取接口数据
     */
    this.getAllHomeImages().then(() => {
      console.log('defaultImgs', this.state.defaultImgs)
    })
    // this.getFreightAndAfterSalesAddressConfig()
    // this.listSkuType()
  }

  componentDidMount() {
    store.dispatch({
      type: 'SET_MENU',
      menu: 'operation'
    })
    store.dispatch({
      type: 'SET_TITLE',
      title: '运营管理'
    })
  }
}