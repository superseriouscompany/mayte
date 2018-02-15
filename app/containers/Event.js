'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import EventInvite        from './EventInvite'
import EventGuests        from './EventInvite'
import EventConfirmation  from './EventInvite'
import {
  View
} from 'react-native'

class Event extends Component {
  render() {
    const {event, user} = this.props

    if (!event) {
      console.error(`No event with with id ${this.props.navigation.state.params.eventId} found in store`)
      return null
    }

    if (!event.invites.find(i => i.id == user.id)) {
      console.error(`User not invited`)
      return this.props.navigation.navigate('Membership')
    }

    const rsvp = this.props.event.rsvps.find(r => r.user.id === user.id)
    const checkIn = this.props.event.checkIns.find(c => c.user.id === user.id)
    // FEEDBACK ??

    return(
      rsvp ?
      checkIn ?
      <EventGuests {...this.props} /> :
      <EventConfirmation {...this.props} /> :
      <EventInvite {...this.props} rsvp={rsvp} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const event = state.events.find(e => e.id === ownProps.navigation.state.params.eventId)
  return {
    user: state.user,
    event: event
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
