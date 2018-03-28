'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import PaywallView        from '../components/PaywallView'
import request            from '../actions/request'
import log                from '../services/log'
import stripe             from '../services/stripe'

class Paywall extends Component {
  constructor(props) {
    super(props)

    this.buy = this.buy.bind(this)
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
      alert(`${err.message || JSON.stringify(err)}. Please try again or contact support@joinunicorn.com`)
    })
  }

  render() {
    return (
      <PaywallView {...this.props}
        buy={this.buy} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paywall)
