'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VipCodeStatusView       from '../components/VipCodeStatusView'

class VipCodeStatus extends Component {
  render() {
    return (
      <VipCodeStatusView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(VipCodeStatus)
