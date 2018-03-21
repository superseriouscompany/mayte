import React, {Component} from 'react'
import Settings from './Settings'
import VelvetRope from './VelvetRope'
import MatchBridge from './MatchBridge'
import RecsNavigator from './RecsNavigator'
import {
  DrawerNavigator,
} from 'react-navigation'

const RootNavigator = DrawerNavigator({
  Settings: {
    screen: Settings,
  },
  Membership: {
    screen: VelvetRope,
  },
  Recs: {
    screen: RecsNavigator,
  },
  Connections: {
    screen: MatchBridge
  }
}, {
  initialRouteName: 'Recs'
})

export default RootNavigator
