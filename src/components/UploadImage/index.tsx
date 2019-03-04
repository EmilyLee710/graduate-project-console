import * as React from 'react'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'


const confirm = Modal.confirm;

interface State {
    previewVisible: boolean
    previewImage: string
    showImgs: any[]
    defaultImgs:any[]
  }

  interface ImageItem {
    uid: number,
    name: string,
    size: number,
    type: string,
    status: string,
    url: string
  }
  
interface Props {
    propsImgs: any[]
    action:string
    disabled?:boolean
    position?:number
    maxImage:number,
    updateStateProp:(value:string[],position?:number)=>{}
}

export default class extends React.Component<Props,State>{

    state: State = {
        previewVisible: false,
        previewImage: '',
        showImgs: [],    //展示的图片列表
        defaultImgs:[]
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file: any) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      })
    }
  
    

      upLoadCoverImages = (uploader: any) => {
        this.setState({
          showImgs: uploader.fileList
        })
        // console.log('uploader',uploader)
        // console.log('uploaderfileList',uploader.fileList)
        if(uploader.fileList){
          let images: string[] = []
          uploader.fileList.map((item: any) => {
            if (item.status === 'done') {
              if (item.response)
                images.push(`/img/${item.response}`)//上传照片
              // else
              //   images.push(item.url)//删除照片
            }
          })
          console.log('response',uploader.fileList)
          this.props.updateStateProp(images,this.props.position)
        }   
      }

    render(){
        const { previewVisible, previewImage} = this.state

        // return <span>test</span>;

        const uploadButton = (
          <div>
            <Icon type="plus"/>
            <div className="ant-upload-text">上传图片</div>
          </div>)
    
        return (
            <div className="clearfix">
                <Upload
                  accept='image/*'
                  action="/upload/form"  //图片上传接口
                  listType="picture-card"
                  defaultFileList={this.props.propsImgs[0].url===''?[]:this.props.propsImgs}
                  onPreview={this.handlePreview}
                  onChange={this.upLoadCoverImages}    //文件状态改变的回调（3种）
                  disabled={this.props.disabled}
                  // onRemove={this.removeCoverImages}
                >
                  {this.state.showImgs.length>=this.props.propsImgs.length?null:uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
        )
    }

    // componentWillReceiveProps(prevPropos:Props){
    //   console.log("prevPropos.propsImgs",prevPropos.propsImgs)
    //   let tmp;
    //   if(this.props.propsImgs[0].url==='')tmp=[]
    //   else tmp=this.props.propsImgs
    //   this.setState({
    //     showImgs:prevPropos.propsImgs
    //   })
    //   console.log("showImgs:",this.state.showImgs)
    // }

    componentWillMount(){
      // console.log("===================", this.props.propsImgs)
      let tmp;
      if(this.props.propsImgs[0].url==='')tmp=[]
      else tmp=this.props.propsImgs
      this.setState({
        showImgs:tmp
      })
    }
}

