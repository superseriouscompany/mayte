'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import MatchHeader        from '../containers/MatchHeader'
import Chat               from '../containers/Chat'
import MatchView          from '../components/MatchView'
import { View }             from 'react-native'

class Match extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {props, state} = this

    return (
      <View style={{flex: 1}}>
        <MatchHeader match={props.user} />
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
