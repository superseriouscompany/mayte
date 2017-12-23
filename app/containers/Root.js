'use strict'

import React, { Component }   from 'react'
import Stage                  from './Stage'
import store                  from '../reducers'
import { Provider }           from 'react-redux'
import { SafeAreaView, View } from 'react-native'
import NotificationProvider   from '../providers/NotificationProvider'
import MatchesProvider        from '../providers/MatchesProvider'
import DeeplinkProvider       from '../providers/DeeplinkProvider'

export default class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.login = this.login.bind(this)
  }

  login(user) {
    this.setState({
      user: user
    })
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <NotificationProvider />
          <MatchesProvider />
          <DeeplinkProvider />
          <Stage />
        </View>
      </Provider>
    )
  }
}
