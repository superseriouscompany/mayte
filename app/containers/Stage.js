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
import VelvetRope             from './VelvetRope'
import VipCodeEntry           from './VipCodeEntry'
import Quiz                   from './Quiz'
import WaitingRoom            from './WaitingRoom'
import Dead                   from './Dead'
import Icon                   from 'react-native-vector-icons/Ionicons'
import {em}                   from '../constants/dimensions'
import timing                 from '../constants/timing'
import {
  mayteWhite,
  mayteBlack,
} from '../constants/colors'
import {
  StyleSheet,
  Text,
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
    : !props.isActive      ? <Paywall />
    :
      <Navigation initialSceneName="VelvetRope">
        <Settings sceneName="Settings"
          tabLabel={renderTabFn({label: 'Settings', iconFocused: 'ios-person', iconUnfocused: 'ios-person-outline'})}/>
        <VelvetRope
          sceneName="VelvetRope"
          tabLabel={renderTabFn({label: 'Membership', iconFocused: 'ios-key', iconUnfocused: 'ios-key-outline'})}/>

        { props.isAdmin ?
          <Recs sceneName="Recs"
            tabLabel={renderTabFn({label: 'Suggestions', iconFocused: 'ios-heart', iconUnfocused: 'ios-heart-outline'})}/>
        :
        <RecsPreview sceneName="Recs"
          tabLabel={renderTabFn({label: 'Suggestions', iconFocused: 'ios-heart', iconUnfocused: 'ios-heart-outline'})}/>
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
    gender:        (state.user.preferences || {}).gender,
    sceneName:     sceneName,
    vipCode:       state.vip.code,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const renderTabFn = (props) => {
  let initRender = false
  let _focusOp = new Animated.Value(0)
  let _unfocusOp = new Animated.Value(0)
  return ({tintColor, focused}) => {
    if (!initRender) {
      initRender = true
      _focusOp = focused ? new Animated.Value(1) : new Animated.Value(0)
      _unfocusOp = focused ? new Animated.Value(0) : new Animated.Value(1)
    }

    if (initRender && focused) {
      Animated.parallel([
        Animated.timing(_focusOp, {toValue: 1, duration: timing.navFade, useNativeDriver: true}),
        Animated.timing(_unfocusOp, {toValue: 0, duration: timing.navFade, useNativeDriver: true}),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(_focusOp, {toValue: 0, duration: timing.navFade, useNativeDriver: true}),
        Animated.timing(_unfocusOp, {toValue: 1, duration: timing.navFade, useNativeDriver: true}),
      ]).start()
    }

    const isFocused = tintColor == 'gainsboro';
    return (
      <View style={style.navTabCont}>
        <Animated.View style={[style.navTabCont, {opacity: _focusOp}]}>
          <LinearGradient colors={['rgb(68,64,65)', mayteBlack()]} style={[style.navTabGradient]}></LinearGradient>
          <Icon name={props.iconFocused}
                style={[style.navTabIcon, {color: tintColor}]}
                size={em(1.625)} />
          <Text style={[style.navTabLabel, {color: mayteWhite()}]}>
            {props.label}
          </Text>
        </Animated.View>
        <Animated.View style={[style.navTabCont, {opacity: _unfocusOp}]}>
          <LinearGradient colors={[mayteWhite(), 'rgb(225,221,222)']} style={[style.navTabGradient]}></LinearGradient>
          <Icon name={props.iconUnfocused}
                style={[style.navTabIcon, {color: tintColor}]}
                size={em(1.625)} />
          <Text style={[style.navTabLabel, {color: mayteBlack()}]}>
            {props.label}
          </Text>
        </Animated.View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {flex: 1,},
  navTabCont: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',},
  navTabIcon: {backgroundColor: 'transparent', marginTop: em(0.4)},
  navTabGradient: {position: 'absolute', top: 0, left: 0, bottom: 0, right: 0},
  navTabLabel: {fontFamily: 'Gotham-Book', letterSpacing: em(0.1), fontSize: em(0.5), marginBottom: em(0.33), backgroundColor: 'transparent'},
})

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
