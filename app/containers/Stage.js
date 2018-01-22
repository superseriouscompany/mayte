'use strict'

import React, {PureComponent} from 'react'
import {connect}              from 'react-redux'
import Login                  from './Login'
import Recs                   from './Recs'
import RecsPreview            from './RecsPreview'
import Settings               from './Settings'
import MatchBridge            from './MatchBridge'
import Navigation             from './Navigation'
import Scratch                from './Scratch'
import VipCodeInvite          from './VipCodeInvite'
import GenderSelector         from './GenderSelector'
import Paywall                from './Paywall'
import VelvetRope             from './VelvetRope'
import VipCodeEntry           from './VipCodeEntry'
import Quiz                   from './Quiz'
import WaitingRoom            from './WaitingRoom'
import Dead                   from './Dead'
import Icon                   from 'react-native-vector-icons/Ionicons'
import {em}                   from '../constants/dimensions'
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native'

const useScratch = false

class Stage extends PureComponent {
  constructor(props) {
    super(props)
    this.showScene = this.showScene.bind(this)
  }

  render() {
    const {props} = this

    return !props.isHydrated ?
      null
    : useScratch ?
      <Scratch />
    :
      <View style={[style.container]}>
        { this.showScene(props.sceneName) }
      </View>
  }

  showScene(sceneName) {
    const {props} = this
    
    if( sceneName == 'VipCodeInvite' ) {
      return <VipCodeInvite />
    }
    if( sceneName == 'Dead' ) {
      return <Dead />
    }

    return (
      !props.authenticated ? <Login />
    : !props.hasApplied    ? <Quiz />
    : !props.isApproved    ? <WaitingRoom />
    : !props.gender        ? <GenderSelector />
    : !props.isActive      ? <Paywall gender={props.gender} />
    :
      <Navigation initialSceneName="VelvetRope">
        <Settings sceneName="Settings"
          tabLabel="Settings"
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-person' : 'ios-person-outline'}
                  style={{color: tintColor, backgroundColor: 'transparent'}}
                  size={em(1.625)} />
          )} />
        <VelvetRope sceneName="VelvetRope"
          tabLabel="Membership"
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-key' : 'ios-key-outline'}
                  style={{color: tintColor, backgroundColor: 'transparent'}}
                  size={em(1.625)} />
          )} />

        { props.isAdmin ?
          <Recs sceneName="Recs"
            tabLabel="Suggestions"
            tabIcon={({tintColor, focused}) => (
              <Icon name={focused ? 'ios-heart' : 'ios-heart-outline'}
                    style={{color: tintColor, backgroundColor: 'transparent'}}
                    size={em(1.625)} />
            )} />
        :
          <RecsPreview sceneName="Recs"
            tabLabel="Suggestions"
            tabIcon={({tintColor, focused}) => (
              <Icon name={focused ? 'ios-heart' : 'ios-heart-outline'}
                    size={em(1.625)}
                    style={{color: tintColor}} />
            )} />
        }
      </Navigation>
    )
  }
}

function mapStateToProps(state) {
  // TODO: this hack is here bc changing the scene
  // makes this re-render, and re-rendering resets to the `initialSceneName`
  // of Navigation.
  var sceneName = state.scene && state.scene.name
  switch(sceneName) {
    case 'VipCodeEntry': case 'VipCodeInvite': case 'Dead':
      break;
    default:
      sceneName = 'Hack'
  }

  return {
    authenticated: !!state.user.accessToken,
    isActive:      !!state.user.active,
    isHydrated:      !!state.hydrated,
    isAdmin:       !!state.user.isAdmin,
    hasApplied:    !!state.user.appliedAt,
    isApproved:    !!state.user.approvedAt,
    gender:        state.user.gender,
    sceneName:     sceneName,
    vipCode:       state.vip.code,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
