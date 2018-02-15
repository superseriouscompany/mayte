'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import EventInviteView       from '../components/EventInviteView'

class EventInvite extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <EventInviteView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventInvite)
