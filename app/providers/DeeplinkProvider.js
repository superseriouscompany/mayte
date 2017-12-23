'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import branch             from 'react-native-branch'

class DeeplinkProvider extends Component {
  componentWillReceiveProps(props) {

  }

  componentDidMount() {
    this.unsubscribe = branch.subscribe(({err, params}) => {
      if( err ) {
        alert(err.message || JSON.stringify(err))
        console.error(err)
      }

      if( params['~feature'] != 'promo-redemption' ) {
        return console.warn('Unknown deeplink', params)
      }

      const inviterId = params.inviterId
      const promoCode = params.promoCode

      this.processCode(promoCode)
    })
  }

  processCode(promoCode) {
    
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeeplinkProvider)
