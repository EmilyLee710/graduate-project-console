import * as React from 'react'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'


const confirm = Modal.confirm;

interface State {
  previewVisible: boolean
  previewImage: string
  showImgs: any[]
}

interface Props {
  propsImgs: any[]
  action: string
  disabled?: boolean
  position?: number
  maxImage: number,
  updateStateProp: (value: any[]) => {}
}

export default class extends React.Component<Props, State>{

  state: State = {
    previewVisible: false,
    previewImage: '',
    showImgs: [],    //展示的图片列表
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file: any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }



  upLoadCoverImages = (uploader: any) => {
    // this.setState({
    //   showImgs: uploader.fileList
    // })
    // console.log('uploader', uploader)
    // console.log('uploaderfileList', uploader.fileList)
    // if (uploader.fileList) {
    //   let images: string[] = []
    //   uploader.fileList.map((item: any) => {
    //     if (item.status === 'done') {
    //       if (item.response)
    //         images.push(item.response.url)//上传照片
    //       // else
    //       //   images.push(item.url)//删除照片
    //     }
    //   })
    //   console.log('images', images)
    // }
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx---")
    this.props.updateStateProp(uploader.fileList)
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx===")
  }

  render() {
    const { previewVisible, previewImage } = this.state

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>)

    return (
      <div className="clearfix">
        <Upload
          accept='image/*'
          action="/upload/form"  //图片上传接口
          listType="picture-card"
          fileList={this.state.showImgs}
          onPreview={this.handlePreview}
          onChange={this.upLoadCoverImages}    //文件状态改变的回调（3种）
          disabled={this.props.disabled}
          //onRemove={this.removeCoverImages}
        >
          {this.state.showImgs.length >= this.props.maxImage || this.props.disabled ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
  componentWillReceiveProps(prevPropos: Props) {
    // console.log("prevPropos.propsImgs", prevPropos.propsImgs)
    // console.log("showImgs:", this.state.showImgs)
    // if (this.props.propsImgs[0] === null || this.props.propsImgs[0] === undefined)
    //   this.setState({
    //     showImgs: []
    //   })
    // else {
    //   this.setState({
    //     showImgs: this.props.propsImgs
    //   })
    // }
    this.setState({
      showImgs: prevPropos.propsImgs
    })
    // console.log("showImgsAfter:", this.state.showImgs)
  }
  // componentDidMount() {

  //   // setTimeout(
  //   //   ()=>{
  //   //     console.log(this.props)
  //   //     if(this.props.propsImgs[0]===null||this.props.propsImgs[0]===undefined)
  //   //     this.setState({
  //   //       showImgs:[]
  //   //     })
  //   //     else{
  //   //       this.setState({
  //   //         showImgs:this.props.propsImgs
  //   //       })

  //   //     }
  //   //   },500
  //   // )
  //   if (this.props.propsImgs[0] === null || this.props.propsImgs[0] === undefined)
  //     this.setState({
  //       showImgs: []
  //     })
  //   else {
  //     this.setState({
  //       showImgs: this.props.propsImgs
  //     })
  //   }
  // }
}

