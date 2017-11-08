'use strict'

import React, {Component} from 'react'
import Stage              from './Stage'
import store              from '../reducers'
import {Provider}         from 'react-redux'
import {SafeAreaView}     from 'react-native'

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
        <SafeAreaView style={{flex: 1}}>
          <Stage />
        </SafeAreaView>
      </Provider>
    )
  }
}
