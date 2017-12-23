'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VipCodeEntryView       from '../components/VipCodeEntryView'

class VipCodeEntry extends Component {
  render() {
    return (
      <VipCodeEntryView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(VipCodeEntry)
