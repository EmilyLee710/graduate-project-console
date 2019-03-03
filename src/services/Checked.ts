export default new class {
  /**
   * 检查订单交易状态
   */
  checkOrderStatus(type:number){
    if(type === 0){
      return '待接单'
    } else if(type === 1){
      return '制作中'
    } else if(type === 2){
      return '已完成'
    } 
  }

  /**
   * 检查售后状态
   */
  checkAfterSellStatus(type:number){
    if(type === 0){
      return '无售后'
    } else if(type === 1){
      return '售后中'
    } else if(type === 2){
      return '售后失败'
    } else if(type === 3){
      return '售后完成'
    }
  }

  checkLoginStat(value:string){
    if(value === '1'){
        return '登陆成功'
    } else if(value === '0'){
        return '密码错误'
    } else if(value === '-1'){
        return '账户不存在'
    }
}
  

  formatTime(num: number) {
    let date = new Date(num)
    let year = `${date.getFullYear()}`
    let mouth = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`
    let hour = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`
    let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

    return `${year}-${mouth}-${day}   ${hour}:${minute}`
  }

  checkSex(type:number){
    if(type === 0){
      return '男'
    } else if(type === 1){
      return '女'
    } else if(type === 2){
      return '保密'
    }
  }

  timestampToDate(timestamp:number) {
    var date = new Date(timestamp),
    Y = date.getFullYear(),
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
    D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()),
    hour = (date.getHours() <10 ? '0' + (date.getHours()) :date.getHours()),
    minute = (date.getMinutes() <10 ? '0' + (date.getMinutes()) :date.getMinutes()),
    second = (date.getSeconds() <10 ? '0' + (date.getSeconds()) :date.getSeconds())
    // alert(Y+M+D);
    return (`${Y}-${M}-${D}  ${hour}:${minute}:${second}`)
  }

  checkError(type:string){
    if(type==='AccessForbidden'){
      return '没有权限访问'
    }else if(type==='AdminTokenNotFound'){
      return '管理员令牌没有找到'
    }else if(type==='AuctionLastPriceUserIsNotMatch'){
      return '拍品最后出价的金额不匹配'
    }else if(type==='AuctionMarketAlreadyExpires'){
      return '专场早已经存在'
    }else if(type==='AuctionMarketAlreadyStart'){
      return '专场已经开始'
    }else if(type==='AuctionMarketNotStart'){
      return '专场没有开始'
    }else if(type==='AuctionStatusNotMatch'){
      return '专场的状态不匹配'
    }else if(type==='BalanceDepositNotEnough'){
      return '保证金余额不够'
    }else if(type==='DepositOrderStatusNotMatch'){
      return '保证金订单状态不匹配'
    }else if(type==='ICheckRightObjectNotFound'){
      return '权限的对象没有找到'
    }else if(type==='MarketAddAuctionNeedNotReferStatus'){
      return '专场添加的拍品需要未关联的'
    }else if(type==='MarketStartAndExpiresTimeErr'){
      return '专场设置开始或过期时间错误'
    }else if(type==='NewPhoneUserAlreadyExisted'){
      return '新的手机号已经存在'
    }else if(type==='RightNotFound'){
      return '权限没有找到'
    }else if(type==='SkuInvertoryEnough'){
      return '商品库存不够'
    }else if(type==='SkuNeedPutStorage'){
      return '商品需要下架'
    }else if(type==='VirtualUserAlreadyExisted'){
      return '虚拟用户早已经存在'
    }else if(type==='WithdrawDepositOrderStatusIsNotMatch'){
      return '提现订单状态不匹配'
    }else {
      return '网络错误'
    }
  }
}();

// import checked from './Checked'
// checked.checkAuctionStatus(1)