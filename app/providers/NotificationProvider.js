import React, {Component} from 'react'
import {connect}          from 'react-redux'
import request            from '../actions/request'
import log                from '../services/log'
import firebase           from '../services/firebase'
import {Linking}          from 'react-native'

class NotificationProvider extends Component {
  constructor(props) {
    super(props)
    this.handleNotification = this.handleNotification.bind(this)
  }

  componentDidMount() {
    firebase.messaging().getInitialNotification().then((notif) => {
      this.handleNotification(notif)
    }).catch((err) => {
      log(err)
    })

    this.unsubscribe = firebase.messaging().onMessage(this.handleNotification)
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated && !this.props.isAuthenticated) {
      firebase.messaging().getToken().then((token) => {
        this.props.saveToken(token)
      })

      firebase.messaging().onTokenRefresh((token) => {
        this.props.saveToken(token)
      })
    }
  }

  handleNotification(notif) {
    if( notif && notif.marketingUrl ) {
      Linking.openURL(notif.marketingUrl)
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
        log(err)
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationProvider)
