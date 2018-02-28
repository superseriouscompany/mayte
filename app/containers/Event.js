import moment             from 'moment'
import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {eventsKey}        from '../reducers/api'
import EventView          from '../components/EventView'
import {
  View,
  Alert,
} from 'react-native'


class Event extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <EventView {...this.props} />
    )
  }
}

function mapStateToProps(state, props) {
  const apiCall = state.api[eventsKey] || {}
  const events = apiCall.body && apiCall.body.events || []
  const event = events.find(e => e.id == props.id)

  return {
    event,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
