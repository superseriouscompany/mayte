'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import EventFeedbackView       from '../components/EventFeedbackView'

class EventFeedback extends Component {
  render() {
    return (
      <EventFeedbackView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EventFeedback)
