import { createStore, AnyAction, combineReducers } from 'redux'

interface StoreType {
  readonly menu: string ,title:string,tag:string
}

let menu = (state: string = '', action: AnyAction): string => {
  switch (action.type) {
    case 'SET_MENU':
      return action.menu
    default:
      return state
  }
}

let tag = (state: string = 'ok', action: AnyAction): string => {
  switch (action.type) {
    case 'SET_TAG':
      return action.tag
    default:
      return state
  }
}

let title = (state: string = '', action: AnyAction): string => {
  switch (action.type) {
    case 'SET_TITLE':
      return action.title
    default:
      return state
  }
}

let reducer = combineReducers<StoreType>({
  menu,
  title,
  tag
})

export default createStore<StoreType>(reducer)