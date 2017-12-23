'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import PaywallView       from '../components/PaywallView'

class Paywall extends Component {
  render() {
    return (
      <PaywallView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paywall)
