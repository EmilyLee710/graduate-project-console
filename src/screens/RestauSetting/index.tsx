import * as React from 'react'
import { ConfigInfo, SkuTypeInfo, HomeImagesInfo } from '../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message, Tag, Tooltip } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'

import store from '../../Store'
import UploadImage from '../../components/UploadImageForsku'

const { Header, Footer, Sider, Content } = Layout;
var token = localStorage.getItem('token')

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
    defaultCoverImgs: any[]
    restauAddress: string
    restauPhone: string
    restauName: string
    imgUrl: string
    addCoverImgs: ImageItem   //上传的文件列表
    defaultImgs: any
}

export default class extends React.Component<RouteComponentProps<any>, State>{
    state: State = {
        previewVisible: false,
        previewImage: '',
        inputVisible: false,
        defaultCoverImgs: [],
        restauAddress: '',
        restauPhone: '',
        restauName: '',
        imgUrl: '',
        addCoverImgs: {
            uid: -1,
            name: '',
            size: 0,
            type: 'image',
            status: 'done',
            url: '',
            thumbUrl: ''
        },   //上传的文件列表
        defaultImgs: {
            uid: -1,
            name: '',
            size: 0,
            type: 'image',
            status: 'done',
            url: '',
            thumbUrl: ''
        }
    }

    render() {
        return (
            <Layout className='restausettings-style'>
                <Content>
                    <div className='cover_image padding-top'>
                        <div className='width-title'>餐厅封面图:</div>
                        <div style={{ width: "100%" ,marginRight:'10px'}}>
                            {/*使用上传组件，传入*/}  {/*存疑*/}
                            <UploadImage
                                propsImgs={this.state.defaultCoverImgs}
                                maxImage={3}
                                updateStateProp={this.uploadChange_addCovors.bind(this)}
                                action={"/upload/form"}
                            />
                        </div>
                    </div>   
                    <div className='flex padding-top'>
                        <div className='width-title'>餐厅电话:</div>
                        <Input
                            style={{ width: 150 }}
                            // min={1} max={10000000}
                            // value={ConfigInfo.freight_config}
                            // onChange={(value) => { this.setValue('freight_config', value) }}
                            // disabled={this.state.disabled} 
                            />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.transferFee.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <div className='width-title'>餐厅描述:</div>
                        <Input
                            style={{ width: 500 }}
                            // min={1} max={10000000}
                            // value={ConfigInfo.freight_config}
                            // onChange={(value) => { this.setValue('freight_config', value) }}
                            // disabled={this.state.disabled} 
                            />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.transferFee.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <div className='width-title'>促销活动:</div>
                        <Input
                            style={{ width: 500 }}
                            // min={1} max={10000000}
                            // value={ConfigInfo.freight_config}
                            // onChange={(value) => { this.setValue('freight_config', value) }}
                            // disabled={this.state.disabled} 
                            />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.transferFee.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <div>餐厅地址:</div>
                        <Input
                            placeholder='请输入地址、电话、联系人'
                            style={{ width: 500, marginLeft: 10 }}
                            // value={ConfigInfo.after_sale_address}
                            // onChange={(e: any) => { this.setValue('after_sale_address', e.target.value.trim()) }} 
                            />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.aftersellAddress.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <Button type='primary' >保存</Button>
                    </div>
                </Content>
            </Layout>
        )
    }

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

    componentDidMount() {
        store.dispatch({
            type: 'SET_MENU',
            menu: 'operation'
        })
        store.dispatch({
            type: 'SET_TITLE',
            title: '餐厅设置'
        })
    }
}