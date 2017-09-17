'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import SettingsView       from '../components/SettingsView'

class Settings extends Component {
  render() {
    const {props} = this

    return (
      <SettingsView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
