'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import WaitingRoomView    from '../components/WaitingRoomView'
import request            from '../actions/request'
import branch             from 'react-native-branch'
import {clear}            from '../reducers'

class WaitingRoom extends Component {
  constructor(props) {
    super(props)
    this.pollSelf = this.pollSelf.bind(this)
  }

  render() {
    return (
      <WaitingRoomView {...this.props} />
    )
  }

  componentDidMount() {
    this.pollSelf()
  }

  pollSelf() {
    this.props.loadSelf().then(() => {
      this.timeout = setTimeout(this.pollSelf, 2000)
    })
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout)
  }
}

function mapStateToProps(state) {
  return {

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

    deleteAccount: () => {
      return dispatch(request({
        method: 'DELETE',
        url:    '/users/me'
      })).then(() => {
        // TODO: put this in an action
        branch.logout()
        dispatch({type: 'user:destroy'})
        dispatch({type: 'vip:destroy'})
        dispatch({type: 'quiz:destroy'})
        clear()
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)
