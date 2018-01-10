'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import PaywallView        from '../components/PaywallView'
import { NativeModules }  from 'react-native'
import log                from '../services/log'
const { InAppUtils } = NativeModules

class Paywall extends Component {
  constructor(props) {
    super(props)
  }

  buy(id) {
    InAppUtils.purchaseProduct(id, (err, response) => {
      if( err ) { return alert(err.message) }
      if( response && response.productIdentifier ) {
        return alert('Purchase Successful: '+response.transactionIdentifier)
      }
      console.warn('Unknown response', err, response)
    })
  }

  componentDidMount() {
    if( this.props.pendingCode ) {
      this.props.visitVipWall()
    }

    // TODO: load these from a provider so we don't have to wait for them to load
    const products = [
      'com.mayte.dev.monthly'
    ]

    InAppUtils.canMakePayments((enabled) => {
      if(!enabled) { return alert('Purchasing disabled') }

      InAppUtils.loadProducts(products, (err, products) => {
        if( err ) { log(err) }
        this.props.dispatchProducts(products)
      })
    })
  }

  render() {
    return (
      <PaywallView {...this.props} buy={this.buy}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    pendingCode: state.vip.pendingCode,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    visitVipWall: () => {
      dispatch({type: 'scene:change', scene: 'VipCodeEntry'})
    },

    dispatchProducts: (products) => {
      dispatch({type: 'products:set', products})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paywall)
