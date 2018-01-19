'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import WaitingRoomView    from '../components/WaitingRoomView'
import request            from '../actions/request'
import branch             from 'react-native-branch'
import {clear}            from '../reducers'

class WaitingRoom extends Component {
  render() {
    return (
      <WaitingRoomView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAccount: () => {
      return dispatch(request({
        method: 'DELETE',
        url:    '/users/me'
      })).then(() => {
        // TODO: put this in an action
        branch.logout()
        dispatch({type: 'user:destroy'})
        dispatch({type: 'vip:destroy'})
        clear()
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)
