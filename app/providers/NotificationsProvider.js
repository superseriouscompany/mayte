'use strict';

import React      from 'react'
import {connect}  from 'react-redux'
import RNFirebase from 'react-native-firebase'
import api        from '../services/api'

const firebase = RNFirebase.initializeApp({
  debug: true,
})

class NotificationsProvider extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      firebase.messaging().requestPermissions()
      firebase.messaging().getToken().then((token) => {
        let options = {
          method: 'PATCH',
          accessToken: this.props.accessToken,
          body: {
            firebaseToken: token,
          }
        }

        api('/users/me', options).catch(err => console.error(err))
      })
    }
  }

  render() { return null }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: !!state.session.accessToken,
    accessToken: state.session.accessToken,
  }
}

export default connect(mapStateToProps)(NotificationsProvider)
