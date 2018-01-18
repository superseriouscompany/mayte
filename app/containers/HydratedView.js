'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'

class HydratedView extends Component {
  render() {
    const {props} = this

    return (
      props.hydrated ? props.children : null
    )
  }
}

function mapStateToProps(state) {
  return {
    hydrated: state.hydrated
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HydratedView)
