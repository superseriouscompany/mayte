'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import VelvetRopeView       from '../components/VelvetRopeView'

class VelvetRope extends Component {
  render() {
    return (
      <VelvetRopeView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(VelvetRope)
