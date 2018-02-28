'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import EventInviteView    from '../components/EventInviteView'
import {graph, rsvpKey}   from '../actions/request'

class EventInvite extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <EventInviteView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    rsvp: function(eventId, willAttend) {
      return dispatch(graph(rsvpKey, `
        mutation rsvp($eventId: ID!, $willAttend: Boolean) {
          ok:rsvp(eventId: $eventId, willAttend: $willAttend)
        }
      `, { eventId, willAttend}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventInvite)
