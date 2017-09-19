'use strict'

import React, {Component}    from 'react'
import Stage                 from './Stage'
import store                 from '../reducers'
import {Provider}            from 'react-redux'
import {View}                from 'react-native'
import NotificationsProvider from '../providers/NotificationsProvider'

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <Stage />
          <NotificationsProvider />
        </View>
      </Provider>
    )
  }
}
