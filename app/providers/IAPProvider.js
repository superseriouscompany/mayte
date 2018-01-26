'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import log                from '../services/log'
import { NativeModules }  from 'react-native'
const { InAppUtils } = NativeModules

class IAPProvider extends Component {
  constructor(props) {
    super(props)
    this.fetchProducts = this.fetchProducts.bind(this)
    this.state = {}
  }

  componentDidMount() {
    if( this.props.products.length ) { return }

    InAppUtils.canMakePayments((enabled) => {
      if(!enabled) {
        log(new Error('Purchasing disabled.'))
      }

      this.fetchProducts()
    })
  }

  fetchProducts() {
    const products = [
      'com.unicorn.dating.membership',
    ]

    InAppUtils.loadProducts(products, (err, products) => {
      if( err ) {
        this.timeout = setTimeout(this.fetchProducts, 5000)
        if( !this.state.logged ) {
          this.setState({logged: true})
          log(err)
        }
        console.warn(err.message, JSON.stringify(err))
      }
      this.props.dispatchProducts(products)
    })
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout)
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {
    products: state.products,
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
