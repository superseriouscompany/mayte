import {get, rsvp, checkIn, forceEnd} from '../services/events'
import moment             from 'moment'
import React, {Component} from 'react'
import {connect}          from 'react-redux'
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

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
