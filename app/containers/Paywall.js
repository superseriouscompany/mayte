'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import PaywallView        from '../components/PaywallView'
import { NativeModules }  from 'react-native'
import request            from '../actions/request'
import log                from '../services/log'
const { InAppUtils } = NativeModules

class Paywall extends Component {
  constructor(props) {
    super(props)

    this.buy              = this.buy.bind(this)
    this.restorePurchases = this.restorePurchases.bind(this)
  }

  buy(id) {
    InAppUtils.purchaseProduct(id, (err, response) => {
      if( err ) {
        log(err)
        return alert(err.message + ". Please try again or contact support@dateunicorn.com")
      }
      if( !response || !response.productIdentifier ) {
        return log(`Unknown purchase response: ${JSON.stringify(response)}`)
      }

      __DEV__ && console.warn(JSON.stringify(response))
      this.props.activate(response.transactionReceipt).catch((err) => {
        alert((err.message || JSON.stringify(err)) + "\n\nPlease try again or contact support@dateunicorn.com")
      })
    })
  }

  restorePurchases() {
    InAppUtils.restorePurchases((err, response)=> {
      if( err ) {
        // this happens when the user cancels sign in
        if( err == 'restore_failed' ) { return }
        log(err)
        return alert(`${err.message || JSON.stringify(err)}. Please try again or contact support@dateunicorn.com`)
      }
      if( !response.length ) {
       const err = new Error('No purchases found');
       err.name = 'NotFound'
       return alert(err.message)
      }

      if( response.length > 1 ) {
       log(`Unknown purchase restore response: ${JSON.stringify(response)}`)
      }

      const productIds = response.map((p) => {
       return p.productIdentifier
      })

      __DEV__ && console.warn(JSON.stringify(response))
      this.props.activate(response[0].transactionReceipt).catch((err) => {
        alert((err.message || JSON.stringify(err)) + "\n\nPlease try again or contact support@dateunicorn.com")
      })
    })
  }

  render() {
    return (
      <PaywallView {...this.props}
        buy={this.buy}
        restorePurchases={this.restorePurchases} />
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    activate: (receipt) => {
      return dispatch(request({
        method: 'POST',
        url: '/payments',
        body: { receipt }
      })).then(() => {
        dispatch({type: 'user:set', user: { active: true }})
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paywall)
