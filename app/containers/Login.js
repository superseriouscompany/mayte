'use strict'

import React, {Component} from 'react'
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default class Login extends Component {
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
    if( !event.url || !event.url.match(/mayte:\/\/ig/) ) {
      return console.warn('Unknown event url', event && event.url)
    }

    console.warn(event.url)

    const matches = event.url.match(/at=([^&]+)/)
    if( !matches ) {
      return console.warn('No access token provided', event && event.url)
    }

    this.props.onLogin({
      accessToken: matches[1]
    })
  }

  login() {
    const redirectUrl = 'https://superserious.ngrok.io/webhooks/instagram'
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

  render() { return (
    <View style={style.container}>
      <TouchableOpacity onPress={this.login}>
        <Text style={style.button}>Login with Instagram</Text>
      </TouchableOpacity>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    color: 'blue',
  },
})
