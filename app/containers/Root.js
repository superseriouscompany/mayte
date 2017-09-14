'use strict'

import React, {Component} from 'react'
import Login              from './Login'
import Gamepad            from './Gamepad'
import Chat               from './Chat'

const stub = true

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
    return stub ?
      <Chat />
    : !this.state.user ?
      <Login onLogin={this.login}/>
    :
      <Gamepad user={this.state.user} />
  }
}
