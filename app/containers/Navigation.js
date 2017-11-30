'use strict'

import React, {Component} from 'react'
import { TabNavigator }   from 'react-navigation'
import { em }             from '../constants/dimensions'
import { mayteBlack }     from '../constants/colors'

export default function(props) {
  var scenes = {}

  React.Children.forEach(props.children, (child, i) => {
    if (!child.props.sceneName) return
    scenes[child.props.sceneName || `${child.type.displayName}${i}`] = {
      screen: () => child,
      navigationOptions: {
        tabBarLabel: child.props.tabLabel,
        tabBarIcon:  child.props.tabIcon,
      }
    }
  })

  const TabNav = TabNavigator(scenes, {
    animationEnabled: true,
    swipeEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor:         'white',
      inactiveTintColor:       'gainsboro',
      activeBackgroundColor:   mayteBlack(0.66),
      inactiveBackgroundColor: mayteBlack(0.9),
      style:                   {borderTopWidth: 0},
      labelStyle:              {fontFamily: 'Gotham-Book', letterSpacing: em(0.1)},
      allowFontScaling:        false,
    },
    initialRouteName: props.initialSceneName,
  })

  return (
    <TabNav />
  )
}
