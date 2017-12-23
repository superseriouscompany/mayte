'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Wallet             from 'react-native-wallet'
import VelvetRopeView     from '../components/VelvetRopeView'
import {baseUrl}          from '../services/api'
import branch             from 'react-native-branch'

class VelvetRope extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  addPass() {
    Wallet.canAddPasses((ok) => {
      if( !ok ) { return console.error('Unable to add passes') }

      Wallet.showAddPassController(`${baseUrl}/nope.pkpass`).then((ok) => {
        console.log('added pass', ok)
      }).catch((err) => {
        console.warn(err)
      })
    })
  }

  loadStart() {
    this.setState({loading: true})
  }

  loadEnd() {
    this.setState({loading: false})
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

  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: function() {
      branch.logout()
      dispatch({type: 'user:destroy'})
      dispatch({type: 'vip:destroy'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VelvetRope)
