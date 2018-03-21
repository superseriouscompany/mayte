import React, {Component} from 'react'
import RecsCheerleader from './RecsCheerleader'
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
    console.log('BLOOBS', this.props)
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
    screen: ProfileView,
  },
  Bloobs: {
    screen: Bloobs,
  }
}, {
  headerMode: 'none',
})

export default RecsNavigator
