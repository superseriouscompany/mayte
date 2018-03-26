import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Matches            from './Matches'
import Match              from './Match'
import type {
  NavigationScreenProp,
} from 'react-navigation'
import {
  createStackNavigator,
  StackNavigator,
} from 'react-navigation'

const MatchesNavigator = StackNavigator({
  Matches: {
    screen: Matches,
  },
  Match: {
    screen: Match,
  },
}, {
  headerMode: 'none',
})

export default MatchesNavigator
