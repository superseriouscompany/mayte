'use strict'

import React, {Component} from 'react'
import CalendarView       from '../components/CalendarView'
import request            from '../actions/request'
import {connect}          from 'react-redux'

class Calendar extends Component {
  componentDidMount() {
    this.props.fetchEvent("def")
    this.props.fetchEvents()
  }

  render() {
    return <CalendarView {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    featured: state.api['graph:event'] ? state.api['graph:event'].body.data.event : null,
    events: state.api['graph:events'] ? state.api['graph:events'].body.data.allEvents : [],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvent: (id) => {
      dispatch(request.graph('event', `
          {
            event(id: "${id}") {
              title,
              id,
              startTime,
              endTime,
              venue {
                name,
                geo {lat, lng}
              },
              invites {id},
              rsvps {user {id}, status}
            }
          }
        `
      ))
    },
    fetchEvents: () => {
      dispatch(request.graph('events', `
          {
            allEvents {
              id,
              title,
              startTime,
            }
          }
        `
      ))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
