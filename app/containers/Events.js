import React, {Component} from 'react'
import {connect}          from 'react-redux'
import EventsView         from '../components/EventsView'
import {eventsKey}        from '../reducers/api'

class Events extends Component {
  render() {
    return (
      <EventsView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  const apiCall = state.api[eventsKey] || {}

  return {
    loading: apiCall.loading,
    events:  apiCall.body && apiCall.body.events
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
