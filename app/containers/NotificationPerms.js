'use strict'

import React, {Component}    from 'react'
import {connect}             from 'react-redux'
import NotificationPermsView from '../components/NotificationPermsView'

class NotificationPerms extends Component {
  render() {
    return (
      <NotificationPermsView {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPerms)
