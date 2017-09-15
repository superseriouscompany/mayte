'use strict'

import React, {Component} from 'react'
import Stage            from './Stage'
import store              from '../reducers'
import {Provider}         from 'react-redux'
import {View}             from 'react-native'

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
          <Stage />
        </View>
      </Provider>
    )
  }
}
