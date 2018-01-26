'use strict'

import React, {Component}   from 'react'
import { TabNavigator }     from 'react-navigation'
import { em, tabNavHeight } from '../constants/dimensions'
import Icon                 from 'react-native-vector-icons/Ionicons'
import LinearGradient       from 'react-native-linear-gradient'
import timing               from '../constants/timing'
import {
  mayteWhite,
  mayteBlack,
} from '../constants/colors'
import {
  Animated,
  Text,
  StyleSheet,
  View,
} from 'react-native'

export default function(props) {
  var scenes = {}

  React.Children.forEach(props.children, (child, i) => {
    if (!child || !child.props.sceneName) return;
    scenes[child.props.sceneName || `${child.type.displayName}${i}`] = {
      screen: () => child,
      navigationOptions: {
        tabBarLabel: renderTabFn(child.props),
      }
    }
  })

  const TabNav = TabNavigator(scenes, {
    animationEnabled: true,
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarOptions: {
      activeTintColor:         'gainsboro',
      inactiveTintColor:       mayteBlack(1),
      activeBackgroundColor:   mayteBlack(1),
      inactiveBackgroundColor: mayteBlack(0.1),
      style:                   {borderTopWidth: 0, height: tabNavHeight},
      labelStyle:              {fontFamily: 'Gotham-Book', letterSpacing: em(0.1), fontSize: em(0.5), marginBottom: em(0.33)},
      allowFontScaling:        false,
    },
    initialRouteName: props.initialSceneName,
  })

  return (
    <TabNav />
  )
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
