'use strict';

import React      from 'react';
import {connect}  from 'react-redux';

class NotificationsProvider extends React.Component {
  constructor(props) {
    super(props)
    this.requestPushPermissions = this.requestPushPermissions.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this.requestPushPermissions()
    }
  }

  requestPushPermissions() {
    alert('can we push bloobs?')
  }

  render() { return null }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: !!state.session.accessToken
  }
}

export default connect(mapStateToProps)(NotificationsProvider)
