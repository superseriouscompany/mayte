'use strict'

import React, {Component}   from 'react'
import { TabNavigator }     from 'react-navigation'
import { em, tabNavHeight } from '../constants/dimensions'
import { mayteBlack }       from '../constants/colors'

export default function(props) {
  var scenes = {}

  React.Children.forEach(props.children, (child, i) => {
    if (!child || !child.props.sceneName) return;
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
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarOptions: {
      activeTintColor:         'gainsboro',
      inactiveTintColor:       mayteBlack(1),
      activeBackgroundColor:   mayteBlack(1),
      inactiveBackgroundColor: mayteBlack(0.1),
      style:                   {borderTopWidth: 0, height: tabNavHeight},
      labelStyle:              {fontFamily: 'Gotham-Book', letterSpacing: em(0.1), fontSize: em(0.5), marginBottom: em(0.2)},
      allowFontScaling:        false,
    },
    initialRouteName: props.initialSceneName,
  })

  return (
    <TabNav />
  )
}
