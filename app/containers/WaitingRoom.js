'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import WaitingRoomView    from '../components/WaitingRoomView'
import request            from '../actions/request'
import logout             from '../actions/logout'
import branch             from 'react-native-branch'
import {clear}            from '../reducers'
import firebase           from '../services/firebase'

class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.pollSelf          = this.pollSelf.bind(this)
    this.requestNotifPerms = this.requestNotifPerms.bind(this)
  }

  requestNotifPerms() {
    firebase.messaging().requestPermissions()
    this.props.markPerms()
  }

  render() {
    return (
      <WaitingRoomView {...this.props}
        requestNotifPerms={this.requestNotifPerms}/>
    )
  }

  componentDidMount() {
    this.pollSelf()
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout)
    this.unmounted = true
  }

  pollSelf() {
    if( this.unmounted ) { return false }
    this.props.loadSelf().then(() => {
      this.timeout = setTimeout(this.pollSelf, 2000)
    })
  }
}

function mapStateToProps(state) {
  return {
    hasRequestedPerms: !!state.permissions.notifications,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadSelf: () => {
      return dispatch(request({
        url: '/users/me'
      })).then((user) => {
        dispatch({type: 'user:set', user})
      })
    },

    markPerms: () => {
      return dispatch({type: 'permissions:ask', permission: 'notifications'})
    },

    deleteAccount: () => {
      return dispatch(request({
        method: 'DELETE',
        url:    '/users/me'
      })).then(() => {
        dispatch(logout())
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)
