'use strict'

import {get} from '../services/poop'
import React, {Component} from 'react'
import moment             from 'moment'
import {connect}          from 'react-redux'
import request            from '../actions/request'
import api, {baseUrl}     from '../services/api'
import {
  Alert,
} from 'react-native'

class EventsProvider extends Component {
  componentWillReceiveProps(props) {
    if (props.accessToken && !this.props.accessToken) {props.fetchEvents(props.accessToken)}
    if (props.invite && !this.props.invite) {Alert.alert('RECEIVED INVITE!')}
  }

  componentDidMount() {
    if (this.props.accessToken) {
      this.props.fetchEvents(this.props.accessToken)
    }

    if (this.props.invite) this.inviteAlert(this.props.invite)
  }

  inviteAlert(i) {
    console.log(i)
    Alert.alert(
      "U R FUKIN INVOITED",
      `${i.title}\n${moment(i.startTime).format('MMM Do')} @ ${i.venue.name}`,
      [
        {text: 'Ignore'},
        {text: 'More Info', onPress: () => this.props.viewInvite(i.id)}
      ]
    )
  }

  render() {
    return null
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.user.accessToken,
    invite: state.events.filter(e => !!e.invites.find(u => u.id == state.user.id))[0]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    viewInvite: (id) => {
      dispatch({type: 'scene:change', scene: `membership:event`, data: {id: id}})
    },
    fetchEvents: (accessToken) => {
      return get().then(events => {
        dispatch({type: 'events:set', events})
      })
      // return api(`graph`, {
      //   method: 'POST',
      //   accessToken: accessToken,
      //   body: {
      //     query: `
      //     {
      //       events{
      //         id,
      //         title,
      //         venue{
      //           name,
      //           geo{lat,lng}
      //         },
      //         invites{
      //           id
      //         },
      //         rsvps{
      //           user{
      //             id
      //           },
      //           status
      //         },
      //         checkIns{
      //           user{id},
      //           time
      //         }
      //       }
      //     }
      //     `
      //   }
      // }).then(r => {
      //   const {events} = r.data
      //   dispatch({type: 'events:set', events})
      // })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsProvider)
