import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Form, Icon, Input, Button, Modal, message, Checkbox,Select } from 'antd'
import './style.less'
import * as authService from '../../services/Auth'
import checked from '../../services/Checked'

const Option = Select.Option

interface State {
  phone: string
  pwd: string
  identity:string,
  checked: boolean
}
export default class extends React.Component<RouteComponentProps<any>> {
  form: any = null
  state: State = {
    phone: '',
    pwd: '',
    identity:'',
    checked: false
  }

  setIdentity(value:string){
     this.setState({
       identity:value
     })
  }

  render() {
    return (<div>
      <Form className="login-box">
        <Form.Item className="login-form-title">
          喵喵餐饮后台管理
         </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="user" />}
            placeholder="请输入账号"
            value={this.state.phone}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({
                phone: event.target.value.trim()
              })
            }}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            prefix={<Icon type="lock" />}
            placeholder="请输入密码"
            value={this.state.pwd}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({
                pwd: event.target.value.trim()
              })
            }}
          />
        </Form.Item>
        <Form.Item>
          <Select 
            placeholder='请选择身份' onChange={(value) => this.setIdentity(value.toString())}>
            <Option value="admin">管理员</Option>
            <Option value="restaurant">餐厅</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Checkbox checked={this.state.checked} onChange={this.onChange}>记住密码</Checkbox>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => this.Login()}>登录</Button>
        </Form.Item>
      </Form>
    </div>
    )
  }

  loading: boolean = false
  onChange = () => {
    this.setState({
      checked: !this.state.checked
    })
  }
  get disabled(): boolean {
    return (
      this.loading === true ||
      this.state.phone === '' ||
      this.state.pwd === ''
    )
  }

  Login(){
    if(this.state.identity === 'admin'){
      this.adminLogin()
    } else if(this.state.identity === 'restaurant'){
      this.restauLogin()
    } else{
      message.error('请选择身份')
    }
  }

  async restauLogin(){
    try {
      if (this.state.checked && document.cookie.indexOf('res_phone') === -1) {
        this.setCookie(this.state.phone, this.state.pwd, 365)
      } else if (!this.state.checked) {
        this.setCookie('', '', -1)
      }
      if (this.loading === true) {
        return
      }
      this.loading = true
      if (this.state.phone === '') {
        Modal.error({
          title: '提示',
          content: '请输入手机号'
        })
      } else if (this.state.pwd === '') {
        Modal.error({
          title: '提示',
          content: '请输入密码'
        })
      } else {
        let result = await authService.restauLogin(this.state.phone, this.state.pwd)
        message.info(result.stat)
        if (result.stat === '1') {
          localStorage.setItem('restauId', result.RestaurantID)
          // console.log(localStorage.getItem('token'))
          this.props.history.push('/home')
          message.success('登录成功')
        } else {
          throw result.stat
        }
      }

    } catch (error) {
      if (typeof error === 'string') {
        Modal.error({
          title: '提示',
          content: checked.checkError(error)
        })
      } else {
        Modal.error({
          title: '提示',
          content: JSON.stringify(error)
        })
      }
    }
    this.loading = false
  }

  async adminLogin() {
    try {
      if (this.state.checked && document.cookie.indexOf('admin_phone') === -1) {
        this.setCookie(this.state.phone, this.state.pwd, 365)
      } else if (!this.state.checked) {
        this.setCookie('', '', -1)
      }
      if (this.loading === true) {
        return
      }
      this.loading = true
      if (this.state.phone === '') {
        Modal.error({
          title: '提示',
          content: '请输入账号'
        })
      } else if (this.state.pwd === '') {
        Modal.error({
          title: '提示',
          content: '请输入密码'
        })
      } else {
        let result = await authService.adminLogin(this.state.phone, this.state.pwd)
        // message.info(result.stat)
        if (result.stat === '1') {
          localStorage.setItem('adminId', result.UserId)
          // console.log(localStorage.getItem('token'))
          this.props.history.push('/home')
          message.success('登录成功')
        } else {
          throw result.stat
        }
        // if (this.state.name === 'admin' && this.state.pwd === '123qwe') {
        //   if(this.state.identity === 'admin'){
        //     localStorage.setItem('identity', '1')
        //   } else if(this.state.identity === 'restaurant'){
        //     localStorage.setItem('identity', '2')
        //   }
        //   // console.log(this.state.identity)
          
        //   this.props.history.push('/home')
        //   message.success('登录成功')
        // } 
        // else if (this.state.name === 'restaurant' && this.state.pwd === '888888') {
        //   localStorage.setItem('identity', '2')
        //   this.props.history.push('/home')
        //   message.success('登录成功')
        // } 
        // else {
        //   message.error('登录失败')
        // }
      }

    } catch (error) {
      if (typeof error === 'string') {
        Modal.error({
          title: '提示',
          content: checked.checkError(error)
        })
      } else {
        Modal.error({
          title: '提示',
          content: JSON.stringify(error)
        })
      }
    }
    this.loading = false
  }
  setCookie = (name: string, pwd: string, exdays: number) => {
    var date = new Date()
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000))
    window.document.cookie = 'name' + '=' + name + ';path=/;expires=' + date.toUTCString()
    window.document.cookie = 'pwd' + '=' + pwd + ';path=/;expires=' + date.toUTCString()
  }
  getCookie = () => {
    if (document.cookie.indexOf('name') > -1) {
      this.setState({ checked: true })
      let arr = document.cookie.split("; ");
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split("=");
        if (arr2[0] == "name") {
          this.setState({ name: arr2[1] })
        } else if (arr2[0] == "pwd") {
          this.setState({ pwd: arr2[1] })
        }
      }
    }
  }
  componentDidMount() {
    this.getCookie()
  }
}