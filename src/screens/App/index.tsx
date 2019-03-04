import * as React from 'react'
import { Route, HashRouter, Switch, Redirect } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import LoginScreen from '../Login'
import HomeScreen from '../Home'

var identity = localStorage.getItem('identity')

export default class extends React.Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <HashRouter>
          <Switch>
            <Redirect from="/" exact to="/login" />
            {identity === '1'?<Redirect from="/home" exact to="/home/usermanagement" />
          : <Redirect from="/home" exact to="/home/cuisine" />}
            <Route path="/login" component={LoginScreen} />
            <Route path="/home" component={HomeScreen} />
          </Switch>
        </HashRouter>
      </LocaleProvider>
    )
  }
}
