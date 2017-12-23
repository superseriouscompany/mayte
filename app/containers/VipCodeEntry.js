'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VipCodeEntryView   from '../components/VipCodeEntryView'
import api                from '../services/api'

class VipCodeEntry extends Component {
  constructor(props) {
    super(props)
    this.state      = {}
    this.setVipCode = this.setVipCode.bind(this)
    this.redeem     = this.redeem.bind(this)
  }

  setVipCode(vipCode) {
    this.setState({vipCode})
  }

  redeem() {
    if( !this.state.vipCode ) { return false }

    this.setState({loading: true, error: null})

    api(`/promos/${this.state.vipCode}`, {
      method:      'PUT',
      accessToken: this.props.accessToken,
    }).then((body) => {
      if( body.unlockCount ) {
        this.props.dispatchCode({
          code: this.state.vipCode,
          unlockCount: body.unlockCount
        })
      } else if( body === true ) { // 204 means the door is unlocked
        return api(`/users/me`, {
          accessToken: this.props.accessToken
        }).then(this.props.updateUser)
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
    accessToken: state.user.accessToken,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    visitPaywall: () => {
      dispatch({type: 'scene:change', scene: 'Paywall'})
    },

    dispatchCode: (vip) => {
      dispatch({type: 'vip:set', vip})
      dispatch({type: 'scene:change', scene: 'VipCodeStatus'})
    },

    updateUser: (user) => {
      dispatch({type: 'user:set', user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VipCodeEntry)
