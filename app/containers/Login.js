'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import LoginView          from '../components/LoginView'
import {baseUrl}          from '../services/api'
import {
  Linking,
} from 'react-native'

class Login extends Component {
  constructor(props) {
    super(props)
    this.login  = this.login.bind(this)
    this.handle = this.handle.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handle)
  }

  handle() {
    Linking.removeEventListener('url', this.handle)
  }

  handle(event) {
    if( !event.url ||
        (!event.url.match(/mayte:\/\/ig/) && !event.url.match(/mayte:\/\/li/)) ) {
      return console.warn('Unknown event url', event && event.url)
    }

    const matches = event.url.match(/at=([^&]+)/)
    if( !matches ) {
      return console.warn('No access token provided', event && event.url)
    }
    console.log("beetch heres where this happens")
    this.props.onLogin({
      accessToken: matches[1]
    })
  }

  login() {
    const redirectUrl = `${baseUrl}/webhooks/instagram`
    const clientId    = '1c6d8f10063b4ac7b9010194c380b6fb'

    const url = 'https://instagram.com/oauth/authorize/?client_id='+clientId+
        '&redirect_uri='+redirectUrl+
        '&response_type=code'+
        '&state=client.ios'
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(console.error)
  }

  linkedinLogin() {
    const redirectUrl = `${baseUrl}/webhooks/linkedin`
    const clientId    = '77jqckdp1kbvtl'
    const perms       = ['r_basicprofile', 'r_emailaddress']

    const url = 'https://www.linkedin.com/uas/oauth2/authorization?client_id='+clientId+
      '&response_type=code'+
      '&state=client.ios'+
      '&scope='+perms.join(' ').trim()+
      '&redirect_uri='+redirectUrl

    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(console.error)
  }

  render() { return (
    <LoginView linkedinLogin={this.linkedinLogin} login={this.login} {...this.props} />
  )}
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: function(session) {
      dispatch({type: 'session:create', session: session})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
