'use strict'

import React, {Component}                from 'react'
import Membership                        from './Membership'
import VipCodeInvite                     from './VipCodeInvite'
import {StackNavigator, DrawerNavigator} from 'react-navigation'
import View                              from '../components/MembershipNavigationView'

export default StackNavigator({
  contentComponent: {
    screen: DrawerNavigator({
      'Membership': { screen: Membership },
      'Invite Codes': { screen: VipCodeInvite },
    }, {
      contentComponent: View,
      drawerWidth: 300,
      // https://github.com/react-navigation/react-navigation/issues/3095#issuecomment-353371823
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
    })
  }
}, {
  headerMode: 'none',
  navigationOptions: ({navigation}) => ({

  })
})
