import branch  from 'react-native-branch'
import {clear} from '../reducers'

export default function logout() {
  return function(dispatch, getState) {
    branch.logout()
    dispatch({type: 'user:destroy'})
    dispatch({type: 'api:destroy'})
    dispatch({type: 'vip:destroy'})
    dispatch({type: 'quiz:destroy'})
    clear()
    return Promise.resolve()
  }
}
