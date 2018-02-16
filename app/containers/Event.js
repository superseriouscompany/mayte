'use strict'

import {get, rsvp} from '../services/poop'
import React, {Component} from 'react'
import {connect}          from 'react-redux'
import EventInvite        from './EventInvite'
import EventGuests        from './EventGuests'
import EventConfirmation  from './EventConfirmation'
import {
  View
} from 'react-native'

class Event extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {event, user, willAttend} = this.props

    if (!event) {
      console.error(`No event with with id ${this.props.navigation.state.params.eventId} found in store`)
      return null
    }

    if (!event.invites.find(i => i.id == user.id)) {
      console.error(`User not invited`)
      return this.props.navigation.navigate('Membership')
    }

    const checkIn = this.props.event.checkIns.find(c => c.user.id === user.id)
    // FEEDBACK ??
    return(
      willAttend ?
      checkIn ?
      <EventGuests {...this.props} /> :
      <EventConfirmation {...this.props} /> :
      <EventInvite {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const event = state.events.find(e => e.id === ownProps.navigation.state.params.eventId)
  return {
    user: state.user,
    event: event,
    willAttend: event.rsvp.yes.find(u => u.id === state.user.id)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    rsvp: (eid, u, s) => {
      return rsvp(eid, u, s).then(() => get()).then(events => {
        if (!s) ownProps.navigation.navigate('Membership')
        return Promise.resolve(dispatch({type:'events:set', events}))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
