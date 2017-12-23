'use strict'

import React, {PureComponent} from 'react'
import {connect}              from 'react-redux'
import Login                  from './Login'
import Recs                   from './Recs'
import Settings               from './Settings'
import MatchBridge            from './MatchBridge'
import Navigation             from './Navigation'
import Scratch                from './Scratch'
import PromoMaker             from './PromoMaker'
import GenderSelector         from './GenderSelector'
import Paywall                from './Paywall'
import VelvetRope             from './VelvetRope'
import VipCodeEntry           from './VipCodeEntry'
import VipCodeStatus          from './VipCodeStatus'
import Icon                   from 'react-native-vector-icons/Ionicons'
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

    return !props.hydrated ?
      null
    : useScratch ?
      <Scratch />
    : !props.authenticated ?
      <Login />
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

    if( !props.isActive ) {
      return !props.gender ?
        <GenderSelector />
      : scene.name == 'VipCodeEntry' ?
        <VipCodeEntry />
      : props.vipCode ?
        <VipCodeStatus />
      :
        <Paywall />
    }

    return (
      <Navigation initialSceneName={props.isAdmin ? "Recs" : "VelvetRope"}>
        <Settings sceneName="Settings"
          tabLabel="Profile"
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-person' : 'ios-person-outline'}
                  size={26}
                  style={{color: tintColor}} />
          )} />
        <VelvetRope sceneName="VelvetRope"
          tabLabel="Membership"
          tabIcon={({tintColor, focused}) => (
            <Icon name={focused ? 'ios-key' : 'ios-key-outline'}
                  size={26}
                  style={{color: tintColor}} />
          )} />
        { props.isAdmin ?
          <Recs sceneName="Recs"
            tabLabel="Home"
            tabIcon={({tintColor, focused}) => (
              <Icon name={focused ? 'ios-heart' : 'ios-heart-outline'}
                    size={26}
                    style={{color: tintColor}} />
            )} />
        :
          null
        }
      </Navigation>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: !!state.user.accessToken,
    isActive:      !!state.user.active,
    hydrated:      !!state.hydrated,
    isAdmin:       !!state.user.admin,
    gender:        state.user.gender,
    scene:         state.scene,
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
