'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import log                from '../services/log'
import { NativeModules }  from 'react-native'
const { InAppUtils } = NativeModules

class IAPProvider extends Component {
  componentWillReceiveProps(props) {

  }

  componentDidMount() {
    const products = [
      'com.unicorn.dating.membership',
    ]
    InAppUtils.canMakePayments((enabled) => {
      if(!enabled) {
        log(new Error('Purchasing disabled.'))
      }

      InAppUtils.loadProducts(products, (err, products) => {
        if( err ) { log(err) }
        this.props.dispatchProducts(products)
      })
    })
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchProducts: (products) => {
      dispatch({type: 'products:set', products})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IAPProvider)
