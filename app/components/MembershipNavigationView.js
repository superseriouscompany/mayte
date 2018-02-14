'use strict'

import React, {Component}                   from 'react'
import {DrawerNavigator, NavigationActions} from 'react-navigation'
import Text                                 from './Text'
import {em}                                 from '../constants/dimensions'
import Membership                           from '../containers/Membership'
import VipCodeInvite                        from '../containers/VipCodeInvite'
import {
  mayteBlack,
  mayteWhite,
} from '../constants/colors'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'


const Screen1 = (props) => <View style={{backgroundColor:'olive',flex:1,alignItems:'center',justifyContent:'center'}}><Text>111</Text></View>
const Screen2 = (props) => <View style={{backgroundColor:'orchid',flex:1,alignItems:'center',justifyContent:'center'}}><Text>222</Text></View>
const Screen3 = (props) => <View style={{backgroundColor:'skyblue',flex:1,alignItems:'center',justifyContent:'center'}}><Text>333</Text></View>

class DrawerContainer extends Component {
  render() {
    const {props} = this
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Membership')}>
          <Text style={styles.linkText}>Membership Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Invite Codes')}>
          <Text style={styles.linkText}>Invite Codes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => props.navigation.navigate('Third Guy III')}>
          <Text style={styles.linkText}>Other Fish</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: mayteBlack(),
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  link: {
    marginBottom: em(1),
  },
  linkText: {
    fontSize: em(1),
    color: mayteWhite()
  }
})

export default DrawerNavigator({
  'Membership': { screen: Membership },
  'Invite Codes': { screen: VipCodeInvite },
  'Third Guy III': { screen: Screen3 },
}
,{
  contentComponent: DrawerContainer,
  drawerWidth: 300,
  // https://github.com/react-navigation/react-navigation/issues/3095#issuecomment-353371823
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
}
)
