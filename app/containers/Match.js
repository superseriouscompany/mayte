'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Header             from '../containers/Header'
import Chat               from '../containers/Chat'
import MatchView          from '../components/MatchView'
import api                from '../services/api'
import { GiftedChat }     from 'react-native-gifted-chat'
import { View }             from 'react-native'

class Match extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {props, state} = this

    return (
      <View style={{flex: 1}}>
        <Header view={props.view} />
        <MatchView {...state} {...props}
                   setHeight={(h) => this.setState({viewHeight: h})}
                   showInfo={() => this.setState({infoOpen: true})}
                   hideInfo={() => this.setState({infoOpen: false})} />
        <Chat user={props.user}/>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.scene.user,
    view: state.scene.view,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Match)
