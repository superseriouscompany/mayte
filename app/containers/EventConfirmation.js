'use strict'

import React, {Component}    from 'react'
import {connect}             from 'react-redux'
import EventConfirmationView from '../components/EventConfirmationView'

class EventConfirmation extends Component {
  render() {
    return (
      <EventConfirmationView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EventConfirmation)
