'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Matches            from './Matches'
import Match              from './Match'

class MatchBridge extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentId: null
    }
  }

  render() {
    const {props} = this

    return props.scene == 'Match' ? <Match userId={props.theirId} myId={props.myId} /> : <Matches />
  }
}

function mapStateToProps(state) {
  return {
    scene:   state.scene.name,
    myId:    state.user.id,
    theirId: state.scene.params && state.scene.params.userId,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchBridge)
