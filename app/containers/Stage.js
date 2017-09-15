'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import StageView          from '../components/StageView'
import Login              from './Login'
import Gamepad            from './Gamepad'

class Stage extends Component {
  render() {
    const {props} = this

    return (
      <StageView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
