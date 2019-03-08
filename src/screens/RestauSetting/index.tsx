import * as React from 'react'
import { ConfigInfo, SkuTypeInfo, HomeImagesInfo } from '../../interfaces/Model'

import { Table, Button, Row, Col, Form, Input, Modal, Layout, Select, InputNumber, Upload, Icon, message, Tag, Tooltip } from 'antd'

import { RouteComponentProps, Route, Redirect, Switch } from 'react-router'

import './style.less'

import store from '../../Store'
import UploadImage from '../../components/UploadImageForsku'
import * as RestauSettingService from '../../services/RestauSettingApi'

const { Header, Footer, Sider, Content } = Layout;
var token = localStorage.getItem('token')
// var isVisible:boolean = false

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
    restaurantId: number
    restauAddress: string
    restauPhone: string
    restauName: string,
    license: string
    passwd: string,
    description: string
    sale_info: string
    imgUrl: string
    addCoverImgs: ImageItem   //上传的文件列表
    defaultImgs: any
    isVisible: boolean
}

export default class extends React.Component<RouteComponentProps<any>, State>{
    state: State = {
        previewVisible: false,
        previewImage: '',
        inputVisible: false,
        defaultCoverImgs: [],
        restaurantId: null,
        restauAddress: '',
        restauPhone: '',
        restauName: '',
        license: '',
        passwd: '',
        description: '',
        sale_info: '',
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
        },
        isVisible: false
    }

    render() {
        return (
            <Layout className='restausettings-style'>
                <Content>
                    <div className='cover_image padding-top'>
                        <div className='width-title'>餐厅封面图:</div>
                        <div style={{ width: "100%", marginRight: '10px' }}>
                            {/*使用上传组件，传入*/}  {/*存疑*/}
                            <UploadImage
                                propsImgs={this.state.defaultCoverImgs}
                                maxImage={1}
                                updateStateProp={this.uploadChange_addCovors.bind(this)}
                                action={"/upload/form"}
                            />
                        </div>
                    </div>
                    <div className='flex padding-top'>
                        <div className='width-title'>餐厅名称:</div>
                        <Input
                            style={{ width: 150 }}
                            placeholder='请输入餐厅名称'
                            // min={1} max={10000000}
                            value={this.state.restauName}
                            onChange={(event) => {
                                this.setState({
                                    restauName: event.target.value.trim()
                                })
                            }}
                        // disabled={this.state.disabled} 
                        />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.transferFee.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <div className='width-title'>餐厅电话:</div>
                        <Input
                            style={{ width: 150 }}
                            placeholder='请输入餐厅电话'
                            // min={1} max={10000000}
                            value={this.state.restauPhone}
                            onChange={(value) => {
                                this.setState({
                                    restauPhone: value.target.value.trim()
                                })
                            }}
                        // disabled={this.state.disabled} 
                        />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.transferFee.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <div className='width-title'>餐厅密码:</div>
                        <Input
                            style={{ width: 150 }}
                            type={this.state.isVisible ? "" : "password"}
                            placeholder="请输入密码"
                            addonAfter={<Icon type='eye' onClick={() => this.setState({
                                isVisible: !this.state.isVisible
                            })}></Icon>}
                            value={this.state.passwd}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                this.setState({
                                    passwd: event.target.value.trim()
                                })
                            }}
                        />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.transferFee.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <div className='width-title'>营业执照编码:</div>
                        <Input
                            style={{ width: 150 }}
                            placeholder='请输入餐厅营业执照编码'
                            // min={1} max={10000000}
                            value={this.state.license}
                            onChange={(value) => {
                                this.setState({
                                    license: value.target.value.trim()
                                })
                            }}
                        // disabled={this.state.disabled} 
                        />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.transferFee.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <div className='width-title'>餐厅描述:</div>
                        <Input
                            placeholder='请输入餐厅描述'
                            style={{ width: 500 }}
                            // min={1} max={10000000}
                            value={this.state.description}
                            onChange={(value) => {
                                this.setState({
                                    description: value.target.value.trim()
                                })
                            }}
                        // disabled={this.state.disabled} 
                        />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.transferFee.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <div className='width-title'>促销活动:</div>
                        <Input
                            style={{ width: 500 }}
                            placeholder='请输入餐厅近期促销活动'
                            // min={1} max={10000000}
                            value={this.state.sale_info}
                            onChange={(value) => {
                                this.setState({
                                    sale_info: value.target.value.trim()
                                })
                            }}
                        // disabled={this.state.disabled} 
                        />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.transferFee.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <div>餐厅地址:</div>
                        <Input
                            placeholder='请输入餐厅地址'
                            style={{ width: 500, marginLeft: 10 }}
                            value={this.state.restauAddress}
                            onChange={(e: any) => {
                                this.setState({
                                    restauAddress: e.target.value.trim()
                                })
                            }}
                        />
                        {/* <Button style={{ marginLeft: 10 }} type='primary' onClick={this.aftersellAddress.bind(this)}>确定</Button> */}
                    </div>
                    <div className='flex padding-top'>
                        <Button type='primary' onClick={()=>this.save()}>保存</Button>
                    </div>
                </Content>
            </Layout>
        )
    }

    uploadChange_addCovors(value: any[]) {
        // console.log('Covors=====>', value)
        this.setState({
            defaultCoverImgs: value
        })
        // console.log('covers:', value)
        // this.state.commodity.images = value
        // this.setState({
        //   commodity: this.state.commodity
        // })
    }

    save(){
        console.log('default',this.state.defaultCoverImgs)
        if(this.state.defaultCoverImgs.length > 0){
            if(this.state.license === ''||this.state.passwd===''
            ||this.state.restauAddress === ''||this.state.restauName===''
            ||this.state.restauPhone === ''){
                message.error('请完善信息')
            } else if(this.state.defaultCoverImgs[0].response === ''){
                message.error('请上传餐厅封面图')
            } else{
                this.setRestauinfo()
            }
        } else{
            message.error('请上传餐厅封面图')
            return
        }
    }

    async setRestauinfo() {
        try {
            // if(this.state.defaultCoverImgs[0].url){
                const cover = `/imgs/${this.state.defaultCoverImgs[0].response}`
            // }else{
            //       
                console.log('cover',cover)

            let result = await RestauSettingService.RestauSetInfo({
                restaurantID: this.state.restaurantId,
                restaurantname: this.state.restauName,
                cover_url: cover,
                passwd: this.state.passwd,
                license: this.state.license,
                address: this.state.restauAddress,
                description: this.state.description,
                sale_info: this.state.sale_info,
                phone: this.state.restauPhone
            })
            if(result.stat === '1'){
                message.success('保存成功')
            } else if(result.stat === '0')
                message.error('保存失败')
        } catch (error) {
            Modal.confirm({
                title: '错误提示',
                content: error
            })
        }
        
        
    }

    async getRestauInfo(id:number){
       try{
           let result = await RestauSettingService.RestauGetMyInfo({
               restaurantId:id
           })
           if(result.restaurant.cover_url){
               let cover = {
                uid: -1,
                name: '',
                size: 0,
                type: 'image',
                status: 'done',
                url: result.restaurant.cover_url,
                thumbUrl: result.restaurant.cover_url 
               }
               this.state.defaultCoverImgs.push(cover)
               this.setState({
                defaultCoverImgs:this.state.defaultCoverImgs
               })
           }
           this.setState({
            restauAddress: result.restaurant.address,
            restauPhone: result.restaurant.phone,
            restauName: result.restaurant.restaurantname,
            license: result.restaurant.license,
            passwd: result.restaurant.passwd,
            description: result.restaurant.description,
            sale_info: result.restaurant.sale_info
           })
           console.log('cover',this.state.defaultCoverImgs)
       } catch(error){
           Modal.confirm({
               title:'提示',
               content:error
           })
       }
    }

    componentWillMount() {
        const restaurantid = parseInt(localStorage.getItem('restauId'))
        this.getRestauInfo(restaurantid)
        this.setState({
            restaurantId: restaurantid
        })
    }

    componentDidMount() {
        store.dispatch({
            type: 'SET_MENU',
            menu: 'restausetting'
        })
        store.dispatch({
            type: 'SET_TITLE',
            title: '餐厅设置'
        })
    }
}