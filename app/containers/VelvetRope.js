'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Wallet             from 'react-native-wallet'
import VelvetRopeView     from '../components/VelvetRopeView'
import {baseUrl}          from '../services/api'

class VelvetRope extends Component {
  constructor(props) {
    super(props)
    this.state         = {}
  }

  render() {
    return (
      <VelvetRopeView {...this.props}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    isAdmin:     !!state.user.isAdmin,
    isGold:      state.user.tier == 'gold',
  }
}

function mapDispatchToProps(dispatch) {
  return {
    visitVipCodeInvite: () => {
      dispatch({type: 'scene:change', scene: 'VipCodeInvite'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VelvetRope)
