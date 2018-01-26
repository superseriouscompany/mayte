'use strict'

import React, {Component}               from 'react'
import { connect }                      from 'react-redux'
import LoginView                        from '../components/LoginView'
import api, { baseUrl, oauthInstagram } from '../services/api'
import request                          from '../actions/request'
import log                              from '../services/log'
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
    this.timeout && clearTimeout(this.timeout)
  }

  componentWillReceiveProps(props) {
    if( props.loadingDelay != this.props.loadingDelay ) {
      if( props.loadingDelay ) {
        this.timeout = setTimeout(() => {
          this.setState({loading: true})
        }, 1000)
      } else {
        this.timeout && clearTimeout(this.timeout)
      }
    }
  }

  handle(event) {
    if( !event.url ||
        (!event.url.match(/unicorn:\/\/ig/) && !event.url.match(/unicorn:\/\/li/)) ) {
      return console.warn('Unknown event url', event && event.url)
    }

    const matches = event.url.match(/at=([^&]+)/)
    if( !matches ) {
      return console.warn('No access token provided', event && event.url)
    }

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
    }).catch(log)
  }

  render() { return (
    <LoginView {...this.props}
               loading={this.state.loading}
               linkedinLogin={this.linkedinLogin}
               instagramLogin={this.instagramLogin} />
  )}
}

function mapStateToProps(state) {
  const apiCall = state.api['GET /users/me'] || {}

  return {
    loadingDelay: apiCall.loading
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
        log(err)
        alert(err.message || JSON.stringify(err))
      })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
