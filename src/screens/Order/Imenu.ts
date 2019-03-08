// import AfterSellComponent from './AfterSell'
import FinishedComponent from './Finished'
import RefuseComponent from './Refuse'
import MakingComponent from './Making'
import WaitingReceiveComponent from './WaitingReceive'

interface IRouter {
    name: string
    tag: string
    component?: any
}

const routes :IRouter[] = [
    {
        name:'待接单',
        tag:'waitingreceive',
        component:WaitingReceiveComponent
    },{
        name:'制作中',
        tag:'making',
        component:MakingComponent
    },{
        name:'已完成',
        tag:'finished',
        component:FinishedComponent
    },{
        name:'已拒绝',
        tag:'refuse',
        component:RefuseComponent
    }
]

export default routes;