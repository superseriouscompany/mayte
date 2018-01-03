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
    this.addPass       = this.addPass.bind(this)
  }

  addPass() {
    Wallet.canAddPasses((ok) => {
      if( !ok ) {
        console.error('Unable to add passes');
        return alert('Unable to add pass. Please enable Apple Wallet.')
      }

      this.setState({loading: true})

      Wallet.showAddPassController(`${baseUrl}/nope.pkpass`).then((ok) => {
        this.setState({loading: false})
        if( ok ) { alert('Pass added to Wallet.') }
      }).catch((err) => {
        this.setState({loading: false})
        console.warn(err)
      })
    })
  }

  render() {
    return (
      <VelvetRopeView {...this.props}
        addPass={this.addPass}
        loading={this.state.loading}
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
