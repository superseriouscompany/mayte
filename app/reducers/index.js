import {persistStore, autoRehydrate} from 'redux-persist'
import logger                        from 'redux-logger'
import thunk                         from 'redux-thunk'
import { AsyncStorage }              from 'react-native'
import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers,
} from 'redux'

import hydrated from './hydrated'
import matches  from './matches'
import scene    from './scene'
import user     from './user'
import vipCode  from './vipCode'

const middleware = [thunk]
if( __DEV__ ) {
  middleware.push(logger)
}

const reducers = combineReducers({
  hydrated,
  scene,
  user,
  matches,
  vipCode,
})

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
)

const persistence = persistStore(store, {storage: AsyncStorage, whitelist: [
  'user',
  'vipCode',
]})

export default store

export function clear() {
  persistence.purge()
}
