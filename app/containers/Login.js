'use strict'

import React, {Component}               from 'react'
import { connect }                      from 'react-redux'
import LoginView                        from '../components/LoginView'
import api, { baseUrl, oauthInstagram } from '../services/api'
import request                          from '../actions/request'
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

    this.props.hydrate(matches[1])
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
               />
  )}
}

function mapStateToProps(state) {
  return {
    loading: (state.api['GET /users/me'] || {}).loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hydrate: function(accessToken) {
      dispatch(request({
        url: '/users/me',
        accessToken
      })).then((user) => {
        user.accessToken = accessToken
        dispatch({type: 'user:set', user})
        dispatch({type: 'scene:change', scene: 'Recs'})
      }).catch((err) => {
        // TODO: display error/retry in component instead of catching here
        console.error(err)
        alert(err.message || JSON.stringify(err))
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
