'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import WaitingRoomView    from '../components/WaitingRoomView'

class WaitingRoom extends Component {
  render() {
    return (
      <WaitingRoomView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(WaitingRoom)
