'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VipCodeEntryView   from '../components/VipCodeEntryView'
import request            from '../actions/request'

class VipCodeEntry extends Component {
  constructor(props) {
    super(props)
    this.state      = {}
    this.setVipCode = this.setVipCode.bind(this)
    this.redeem     = this.redeem.bind(this)
  }

  componentDidMount() {
    this.setVipCode(this.props.vipCode)
  }

  setVipCode(vipCode) {
    this.setState({vipCode})
  }

  redeem() {
    if( !this.state.vipCode ) { return false }

    this.setState({loading: true, error: null})

    this.props.redeem(this.state.vipCode).then((body) => {
      if( body.unlockCount ) {
        this.props.dispatchCode({
          code: this.state.vipCode,
          unlockCount: body.unlockCount
        })
      } else if( body === true ) { // 204 means the door is unlocked
        return this.props.hydrateUser()
      }
    }).catch((err) => {
      this.setState({error: err.message, loading: false})
    })
  }

  render() {
    return (
      <VipCodeEntryView {...this.props}
        setVipCode={this.setVipCode}
        redeem={this.redeem}
        vipCode={this.state.vipCode}
        error={this.state.error}
        loading={this.state.loading} />
    )
  }
}

function mapStateToProps(state) {
  return {
    vipCode:     state.vip.pendingCode,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    redeem: (code) => {
      return dispatch(request({
        url:    `/vipCodes/${code}`,
        method: 'PUT',
      }))
    },

    visitPaywall: () => {
      dispatch({type: 'vip:destroy'})
      dispatch({type: 'scene:change', scene: 'Paywall'})
    },

    dispatchCode: (vip) => {
      dispatch({type: 'vip:set', vip})
    },

    hydrateUser: () => {
      return dispatch(request({
        url: `/users/me`
      })).then((user) => {
        dispatch({type: 'user:set', user})
        dispatch({type: 'scene:change', scene: 'Home'})
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VipCodeEntry)
