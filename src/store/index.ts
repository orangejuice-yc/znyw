import { createBrowserHistory } from 'history'
import { legacy_createStore as createStore ,applyMiddleware,compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers/index'

export const history = createBrowserHistory()

const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
)

export default store
