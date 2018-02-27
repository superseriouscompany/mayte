'use strict'

import React, {PureComponent} from 'react'
import {connect}              from 'react-redux'
import LinearGradient         from 'react-native-linear-gradient'
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
import MembershipNavigation   from './MembershipNavigation'
import Event                  from './Event'
import VipCodeEntry           from './VipCodeEntry'
import Quiz                   from './Quiz'
import WaitingRoom            from './WaitingRoom'
import Dead                   from './Dead'
import {em}                   from '../constants/dimensions'
import timing                 from '../constants/timing'
import features               from '../constants/features'
import {
  StyleSheet,
  View,
  Alert,
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
    : !props.hasApplied && features.quiz     ? <Quiz />
    : !props.isApproved && features.approval ? <WaitingRoom />
    : !props.isActive      ? <Paywall />
    : !props.hasGender     ? <GenderSelector />
    :
      <Navigation initialSceneName="Membership">
        <Settings sceneName="Settings"
          label="Settings" iconFocused="ios-person" iconUnfocused="ios-person-outline" />
        <Event sceneName="Membership"
          label="Membership" iconFocused="ios-key" iconUnfocused="ios-key-outline" />

        { props.isAdmin ?
          <Recs sceneName="Recs"
            label="Suggestions" iconFocused="ios-heart" iconUnfocused="ios-heart-outline" />
        :
          <RecsPreview sceneName="Recs"
            label="Suggestions" iconFocused="ios-heart" iconUnfocused="ios-heart-outline"/>
        }
        { !props.isAdmin ? null :
          <MatchBridge sceneName="Matches"
            label="Matches" iconFocused="ios-chatbubbles" iconUnfocused="ios-chatbubbles-outline" />
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
    isHydrated:    !!state.hydrated,
    isAdmin:       !!state.user.isAdmin,
    hasApplied:    !!state.user.appliedAt,
    isApproved:    !!state.user.approvedAt,
    hasGender:     !!(state.user.preferences || {}).gender,
    sceneName:     sceneName,
    vipCode:       state.vip.code,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

const style = StyleSheet.create({
  container: {flex: 1},
})

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
