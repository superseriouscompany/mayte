'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Login              from './Login'
import Recs               from './Recs'
import Settings           from './Settings'
import Matches            from './Matches'
import Chat               from './Chat'

const useScratch = false

class Stage extends Component {
  render() {
    const {props} = this

    return !props.hydrated ?
      null
    : useScratch ?
      <Scratch />
    : !props.authenticated ?
      <Login />
    : props.scene == 'Settings' ?
      <Settings />
    : props.scene == 'Matches' ?
      <Matches />
    : props.scene == 'Chat' ?
      <Chat userId={props.params.userId}/>
    :
      <Recs />
  }
}

function mapStateToProps(state) {
  return {
    authenticated: !!state.session.accessToken,
    hydrated:      state.hydrated,
    scene:         state.scene.name,
    params:        state.scene,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
