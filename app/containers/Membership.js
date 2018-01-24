'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import MembershipView     from '../components/MembershipView'
import Wallet             from 'react-native-wallet'
import {baseUrl}          from '../services/api'
import log                from '../services/log'

class Membership extends Component {
  constructor(props) {
    super(props)
    this.addPass = this.addPass.bind(this)
    this.state = {}
  }

  addPass() {
    Wallet.canAddPasses((ok) => {
      if( !ok ) {
        log('Unable to add passes');
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
      <MembershipView {...this.props}
        addPass={this.addPass}
        loading={this.state.loading} />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navigate: (scene) => {
      return dispatch({type: 'scene:change', scene: scene})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Membership)
