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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    visitPromoMaker: () => {
      dispatch({type: 'scene:change', scene: 'PromoMaker'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VelvetRope)
