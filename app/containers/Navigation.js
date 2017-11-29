'use strict'

import React, {Component} from 'react'
import { TabNavigator }   from 'react-navigation'

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
      activeBackgroundColor:   'rgba(50,50,50,0.8)',
      inactiveBackgroundColor: 'rgba(0,0,0,0.8)',
    },
    initialRouteName: props.initialSceneName,
  })

  return (
    <TabNav />
  )
}
