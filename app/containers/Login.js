'use strict'

import React, {Component}               from 'react'
import { connect }                      from 'react-redux'
import LoginView                        from '../components/LoginView'
import api, { baseUrl, oauthInstagram } from '../services/api'
import {
  Linking,
} from 'react-native'

class Login extends Component {
  constructor(props) {
    super(props)
    this.handle = this.handle.bind(this)
    this.state = {}
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handle)
  }

  componentWillUnmount() {
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

    this.setState({loading: true})

    api('/users/me', {accessToken: matches[1]}).then((u) => {
      u.accessToken = matches[1]
      this.props.onLogin(u)
    }).catch(console.error)
  }

  instagramLogin() { return oauthInstagram() }

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
    <LoginView {...this.props}
               linkedinLogin={this.linkedinLogin}
               instagramLogin={this.instagramLogin}
               loading={this.state.loading} />
  )}
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: function(user) {
      dispatch({type: 'user:set', user: user})
      dispatch({type: 'scene:change', scene: 'Recs'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
