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
    this.state = {
      dirty: false
    }
    this.rsvp = this.rsvp.bind(this)
  }

  rsvp() {
    this.setState({dirty: true})
    this.props.confirm().then(() => {
      this.setState({dirty: false})
    })
  }

  render() {
    const {event, user, rsvp} = this.props

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
    console.log("hola", event, this.props)
    return(
      rsvp && rsvp.status ?
      checkIn ?
      <EventGuests {...this.props} /> :
      <EventConfirmation {...this.props} /> :
      <EventInvite {...this.props} rsvp={this.rsvp} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log('mapping from store')
  const event = state.events.find(e => e.id === ownProps.navigation.state.params.eventId)
  return {
    user: state.user,
    event: event,
    rsvp: event.rsvps.find(r => r.user.id === state.user.id)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    confirm: (eid, u, s) => {
      return rsvp(eid, u, s).then(() => get()).then(events => {
        dispatch({type:'events:set', events})
      })
    },
    decline: () => {
      ownProps.navigation.navigate('Membership')
    }
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    confirm: () => dispatchProps.confirm(stateProps.event.id, stateProps.user, true),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Event)
