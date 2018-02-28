import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {graph}            from '../actions/request'
import {eventsKey}        from '../reducers/api'

class EventsProvider extends Component {
  componentWillReceiveProps(props) {
    if( props.isActive && !this.props.isActive ) {
      this.props.fetch()
    }
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {
    isActive: !!state.user.active && !!state.user.id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: function() {
      return dispatch(graph(eventsKey, `{
        events {
          id
          title
          description
          startTime
          venue {
            name
            geo {
              lat
              lng
            }
          }
        }
      }`))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsProvider)
