'use strict'

import React, {PureComponent} from 'react'
import {connect}          from 'react-redux'
import Login              from './Login'
import Recs               from './Recs'
import Settings           from './Settings'
import MatchBridge        from './MatchBridge'
import Navigation         from './Navigation'
import Icon               from 'react-native-vector-icons/Ionicons'
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native'

const useScratch = false

class Stage extends PureComponent {
  constructor(props) {
    super(props)
    this.showScene = this.showScene.bind(this)
  }

  render() {
    const {props} = this

    return !props.hydrated ?
      null
    : useScratch ?
      <Scratch />
    :
    <View style={[style.container]}>
      { this.showScene(props.scene) }
    </View>
  }

  showScene(scene) {
    const {props} = this

    if (!props.authenticated) {
      return <Login />
    }

    return (
      <Navigation initialSceneName="Recs">
        <Settings
          tabLabel="Profile"
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-person' : 'ios-person-outline'}
                  size={26}
                  style={{color: tintColor}} />
          )} />
        <Recs sceneName="Recs"
          tabLabel="Home"
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-heart' : 'ios-heart-outline'}
                  size={26}
                  style={{color: tintColor}} />
          )} />
        <MatchBridge
          tabLabel="Matches"
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
                  size={26}
                  style={{color: tintColor}} />
          )} />
      </Navigation>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: !!state.user.accessToken,
    hydrated:      !!state.hydrated,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
