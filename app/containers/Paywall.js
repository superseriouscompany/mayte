'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import PaywallView        from '../components/PaywallView'
import { NativeModules }  from 'react-native'
import request            from '../actions/request'
import log                from '../services/log'
import stripe             from '../services/stripe'
const { InAppUtils } = NativeModules

class Paywall extends Component {
  constructor(props) {
    super(props)

    this.buy              = this.buy.bind(this)
    this.restorePurchases = this.restorePurchases.bind(this)
  }

  buy(id) {
    var q = {}

    stripe.paymentRequestWithCardForm().then((body) => {
      // example body
      // {"livemode":false,"created":1517445933,"card":{"funding":"unknown","cardId":"card_1BqWCnJHAfGPPsvG5kYxLRA6","country":"US","isApplePayCard":false,"expMonth":11,"brand":"Visa","last4":"1111","expYear":2022},"tokenId":"tok_1BqWCnJHAfGPPsvGVB9HoSp9"}
      q.stripeToken = body.tokenId
      return this.props.saveCreditCard(body)
    }).then(() => {
      const {stripeToken} = q
      return this.props.activate(stripeToken)
    }).catch((err) => {
      log(err)
      alert(`${err.message || JSON.stringify(err)}. Please try again or contact support@dateunicorn.com`)
    })
  }

  buyWithIAP(id) {
    InAppUtils.purchaseProduct(id, (err, response) => {
      if( err ) {
        log(err)
        return alert(err.message + ". Please try again or contact support@dateunicorn.com")
      }
      if( !response || !response.productIdentifier ) {
        return log(`Unknown purchase response: ${JSON.stringify(response)}`)
      }

      __DEV__ && console.warn(JSON.stringify(response))
      this.props.activateIAP(response.transactionReceipt).catch((err) => {
        alert(`${err.message || JSON.stringify(err)}. Please try again or contact support@dateunicorn.com`)
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
    saveCreditCard: (body) => {
      return dispatch(request({
        method: 'POST',
        url: '/creditCards',
        body,
      }))
    },

    activate: (stripeToken) => {
      return dispatch(request({
        method: 'POST',
        url: '/subscriptions',
        body: { stripeToken }
      })).then(() => {
        dispatch({type: 'user:set', user: { active: true }})
      })
    },

    activateIAP: (receipt) => {
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
