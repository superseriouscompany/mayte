'use strict'

import {get, rsvp, checkIn} from '../services/poop'
import React, {Component} from 'react'
import {connect}          from 'react-redux'
import EventInvite        from './EventInvite'
import EventGuests        from './EventGuests'
import EventConfirmation  from './EventConfirmation'
import {
  View,
  Alert,
} from 'react-native'

class Event extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {event, user, willAttend, checkedIn} = this.props

    if (!event) {
      console.error(`No event with with id ${this.props.navigation.state.params.eventId} found in store`)
      return null
    }

    if (!event.invites.find(i => i.id == user.id)) {
      console.error(`User not invited`)
      return this.props.navigation.navigate('Membership')
    }

    // FEEDBACK ??
    return(
      willAttend ?
      checkedIn ?
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
    willAttend: event.rsvp.yes.find(u => u.id === state.user.id),
    checkedIn: event.checkIns.find(u => u.id === state.user.id),
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    rsvp: (eid, u, s) => {
      return rsvp(eid, u, s).then(() => get()).then(events => {
        if (!s) ownProps.navigation.navigate('Membership')
        return Promise.resolve(dispatch({type:'events:set', events}))
      })
    },
    checkIn: (eid, u) => {
      return checkIn(eid, u).then(error => {
        if (error) {
          Alert.alert('Cannot Check-In', error, {text: 'OK'})
        }
        return get()
      }).then(events => {
        return Promise.resolve(dispatch({type:'events:set', events}))
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
