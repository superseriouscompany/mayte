'use strict'

import React, { Component } from 'react'
import Stage                from './Stage'
import store                from '../reducers'
import { Provider }         from 'react-redux'
import HydratedView         from './HydratedView'
import NotificationProvider from '../providers/NotificationProvider'
import MatchesProvider      from '../providers/MatchesProvider'
import DeeplinkProvider     from '../providers/DeeplinkProvider'
import KillswitchProvider   from '../providers/KillswitchProvider'
import IAPProvider          from '../providers/IAPProvider'
import log                  from '../services/log'
import {
  StatusBar,
  View
} from 'react-native'

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
        <HydratedView style={{flex: 1}}>
          <StatusBar hidden />
          <NotificationProvider />
          <MatchesProvider />
          <DeeplinkProvider />
          <KillswitchProvider />
          <Stage />
        </HydratedView>
      </Provider>
    )
  }
}
