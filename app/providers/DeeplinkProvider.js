'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import branch             from 'react-native-branch'
import log                from '../services/log'

class DeeplinkProvider extends Component {
  componentWillReceiveProps(props) {

  }

  componentDidMount() {
    this.unsubscribe = branch.subscribe(({err, params}) => {
      if( err ) {
        alert(err.message || JSON.stringify(err))
        log(err)
      }

      // +clicked_branch_link === false may be safe to ignore across the board
      // but playing it safe here in case we have to debug edge cases
      if( params['+is_first_session'] === false && params['+clicked_branch_link'] === false ) {
        // this seems to be triggered on app open
        if( Object.keys(params).length == 2 ) { return }
        // this seems to be triggered when we follow unicorn:// for login
        if( params['+non_branch_link'] ) { return }
      }

      // this seems to be triggered when doing CMD+R in simulator
      if( !Object.keys(params).length ) { return }

      if( params['~feature'] != 'vip-code' ) {
        return console.warn('Unknown deeplink', params)
      }

      const inviterId = params.inviterId
      const vipCode = params.vipCode

      this.props.processCode(vipCode)
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    processCode: (vipCode) => {
      dispatch({type: 'vip:set', vip: {pendingCode: vipCode}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeeplinkProvider)
