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

class Bloobs extends Component {
  render() {
    return(
      <View style={{backgroundColor: 'navajowhite',flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>BLOOBS</Text>
      </View>
    )
  }
}

const RecsNavigator = StackNavigator({
  Recs: {
    screen: RecsCheerleader,

  },
  Rec: {
    screen: Profile,
  },
  Bloobs: {
    screen: Bloobs,
  }
}, {
  headerMode: 'none',
})

export default RecsNavigator
