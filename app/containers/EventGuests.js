'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import EventGuestsView       from '../components/EventGuestsView'

class EventGuests extends Component {
  render() {
    return (
      <EventGuestsView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EventGuests)
