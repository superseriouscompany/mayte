'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Wallet             from 'react-native-wallet'
import VelvetRopeView     from '../components/VelvetRopeView'
import api, {baseUrl}     from '../services/api'
import branch             from 'react-native-branch'

class VelvetRope extends Component {
  constructor(props) {
    super(props)
    this.state         = {}
    this.deleteAccount = this.deleteAccount.bind(this)
  }

  deleteAccount() {
    api('/users/me', {
      method: 'DELETE',
      accessToken: this.props.accessToken,
    }).then(() => {
      this.props.logout()
    }).catch((err) => {
      alert(err.message || JSON.stringify(err))
    })
  }

  render() {
    return (
      <VelvetRopeView {...this.props}
        deleteAccount={this.deleteAccount}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.user.accessToken,
    isAdmin:     !!state.user.isAdmin,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      branch.logout()
      dispatch({type: 'user:destroy'})
      dispatch({type: 'vip:destroy'})
    },

    visitPromoMaker: () => {
      dispatch({type: 'scene:change', scene: 'PromoMaker'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VelvetRope)
