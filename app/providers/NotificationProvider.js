import React, {Component} from 'react'
import {connect}          from 'react-redux'
import RNFirebase         from 'react-native-firebase'
import request            from '../actions/request'

const firebase = RNFirebase.initializeApp({
  debug: __DEV__,
})

class NotificationProvider extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated && !this.props.isAuthenticated) {
      firebase.messaging().requestPermissions()

      firebase.messaging().getToken().then((token) => {
        this.props.saveToken(token)
      })

      firebase.messaging().onTokenRefresh((token) => {
        this.props.saveToken(token)
      })
    }
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.id,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveToken: function(firebaseToken) {
      return dispatch(request({
        url: '/users/me',
        method: 'PATCH',
        body: { firebaseToken }
      })).catch((err) => {
        // TODO: retry this silently until it goes through
        alert(err.message || err)
        console.error(err)
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationProvider)
