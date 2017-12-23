'use strict'

import React, {Component}   from 'react'
import { TabNavigator }     from 'react-navigation'
import { em, tabNavHeight } from '../constants/dimensions'
import { mayteBlack }       from '../constants/colors'

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
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor:         mayteBlack(1),
      inactiveTintColor:       'gainsboro',
      activeBackgroundColor:   mayteBlack(0.1),
      inactiveBackgroundColor: mayteBlack(1),
      style:                   {borderTopWidth: 0, height: tabNavHeight},
      labelStyle:              {fontFamily: 'Gotham-Book', letterSpacing: em(0.1), fontSize: em(0.66)},
      allowFontScaling:        false,
    },
    initialRouteName: props.initialSceneName,
  })

  return (
    <TabNav />
  )
}
