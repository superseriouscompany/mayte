import React, {Component} from 'react'
import {connect}          from 'react-redux'
import RNFirebase         from 'react-native-firebase'
import api                from '../services/api'

const firebase = RNFirebase.initializeApp({
  debug: __DEV__,
})

class NotificationProvider extends Component {
  constructor(props) {
    super(props)
    this.saveToken = this.saveToken.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated && !this.props.isAuthenticated) {
      firebase.messaging().requestPermissions()
    }

    if (nextProps.accessToken && !this.props.accessToken) {
      firebase.messaging().getToken().then((token) => {
        this.saveToken(token)
      })

      firebase.messaging().onTokenRefresh((token) => {
        this.saveToken(token)
      })
    }
  }

  saveToken(token) {
    api('/users/me', {
      method: 'PATCH',
      accessToken: this.props.accessToken,
      body: {
        firebaseToken: token
      }
    })
    .catch((err) => {
      alert(err.message || err)
      console.error(err)
    })
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.id,
    accessToken: state.user.accessToken,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationProvider)

