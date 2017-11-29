import React, { Component } from 'react'
import ProfileView from '../components/ProfileView'
import { matchHeaderHeight, statusBarHeight } from '../constants/dimensions'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class SettingsProfile extends Component {
  render() {
    const { props, state } = this
    return(
      <View style={style.container}>
        <View style={[{height: matchHeaderHeight, paddingTop: statusBarHeight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
          <TouchableOpacity onPress={props.viewPreferences}>
            <Text>Preferences</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.viewEditor}>
            <Text>Editor</Text>
          </TouchableOpacity>
        </View>
        <ProfileView {...props} {...state}
                     setHeight={(h) => this.setState({viewHeight: h})}
                     hideButtons={true} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: mayteBlack(),
  },
  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
})
