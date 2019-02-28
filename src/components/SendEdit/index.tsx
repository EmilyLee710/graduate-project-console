import * as React from 'react'
import * as model from '../../interfaces/Model'

import { Layout,Button,Input,Modal,Form,message} from 'antd';

import orderList from '../../screens/Order/OrderList'
import * as OrderService from '../../services/OrderApi'

import './style.less'

interface Props{
    id:number
    update:()=>{}
}

interface State{
    visible:boolean
    logisticsCode:string
    logisticsName:string
}

export default class extends React.Component<Props,State>{
    state:State={
        visible:true,
        logisticsCode:'',
        logisticsName:''
    }

    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 }
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 }
            }
          }

        return (
          <Modal
             title='发货'
             maskClosable={false}
             visible={this.state.visible}
             onOk={()=>{
                 this.shipped(this.state.logisticsCode,this.state.logisticsName)
                 this.props.update()
                }}
             okText='发货'
             onCancel={this.close.bind(this)}
             destroyOnClose={true}
            >
            <Form>
                 <Form.Item {...formItemLayout} label='选择物流'>
                     <Input onChange={(e:any)=>this.setState({logisticsName:e.target.value.trim()})}/>
                 </Form.Item>
                 <Form.Item {...formItemLayout} label='物流单号'>
                     <Input onChange={(e:any)=>this.setState({logisticsCode:e.target.value.trim()})}/>
                 </Form.Item>
            </Form>    
          </Modal>
        )
    }

    close(){
        this.setState({
            visible:false
        })
    }
    
    async shipped(logisticsCode:string,logisticsName:string){
        const id = this.props.id
        const token = localStorage.getItem('token')
        // console.log(logisticsCode)
        // console.log(logisticsName)
        try{
          let result = await OrderService.AdminShippingOrder({
            // token:token,
            orderId:id,
            logisticsCode:logisticsCode,
            logisticsName:logisticsName
          })
          if(result.stat === 'ok'){
            message.success('订单发货成功')
          }else {
            throw result.stat
          }
        } catch(error){
            message.error(error)
        //   console.log(error)
        }
        this.close()
      }

    componentWillMount(){
        // const id = this.props.id
        // orderList.map((item,i)=>{
        //     if(item.id === id){
        //         this.setState({
        //             orderInfo:item
        //         })
        //     }
        // })
    }
}