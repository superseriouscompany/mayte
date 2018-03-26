import React, {Component} from 'react'
import RecsCheerleader from './RecsCheerleader'
import Profile from './Profile'
import ProfileView from '../components/ProfileView'
import type {
  NavigationScreenProp,
} from 'react-navigation'
import {
  createStackNavigator,
  StackNavigator,
} from 'react-navigation'
import {
  View,
  Text,
} from 'react-native'

const RecsNavigator = StackNavigator({
  Recs: {
    screen: RecsCheerleader,
  },
  Rec: {
    screen: Profile,
  }
}, {
  headerMode: 'none',
})

export default RecsNavigator
