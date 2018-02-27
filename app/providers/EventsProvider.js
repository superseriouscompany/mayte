import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {graph}            from '../actions/request'

const eventsKey = 'events'

class EventsProvider extends Component {
  componentWillReceiveProps(props) {
    if( props.isActive && !this.props.isActive ) {
      this.props.fetch()
    }

    if( props.dirty && !this.props.dirty ) {
      this.props.fetch()
    }
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {
    isActive:        !!state.user.active && !!state.user.id,
    dirty:           state.matches.dirty,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: function() {
      return dispatch(graph(eventsKey, `{
        events {
          id
          title
        }
      }`))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsProvider)
