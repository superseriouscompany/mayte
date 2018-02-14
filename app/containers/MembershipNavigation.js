'use strict'

import React, {Component} from 'react'
import Membership         from './Membership'
import VipCodeInvite      from './VipCodeInvite'
import {StackNavigator}   from 'react-navigation'
import View               from '../components/MembershipNavigationView'

export default StackNavigator({
  contentComponent: {screen: View}
}, {
  headerMode: 'none',
  navigationOptions: ({navigation}) => ({

  })
})
