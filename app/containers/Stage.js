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
import Events                 from './Events'
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

    return useScratch ?
      <Scratch />
    :
      <View style={[style.container]}>
        { this.showScene() }
      </View>
  }

  showScene() {
    const {props}     = this
    const {sceneName} = props

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
    : sceneName == 'event' ?
      <Event />
    :
      <Events />
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: !!state.user.accessToken,
    hasApplied:    !!state.user.appliedAt,
    isApproved:    !!state.user.approvedAt,
    isActive:      !!state.user.active,
    hasGender:     !!(state.user.preferences || {}).gender,
    sceneName:     state.scene && state.scene.name,
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
