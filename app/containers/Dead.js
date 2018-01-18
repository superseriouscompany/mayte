'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import DeadView       from '../components/DeadView'

class Dead extends Component {
  render() {
    return (
      <DeadView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dead)
