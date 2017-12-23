'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VipCodeEntryView       from '../components/VipCodeEntryView'

class VipCodeEntry extends Component {
  constructor(props) {
    super(props)
    this.state      = {}
    this.setVipCode = this.setVipCode.bind(this)
    this.redeem     = this.redeem.bind(this)
  }

  setVipCode(vipCode) {
    this.setState({vipCode})
  }

  redeem() {
    alert(this.state.vipCode)
  }

  render() {
    return (
      <VipCodeEntryView {...this.props}
        setVipCode={this.setVipCode}
        vipCode={this.state.vipCode}
        redeem={this.redeem} />
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
