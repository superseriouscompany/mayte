import React, { Component } from 'react'
import Preferences from '../containers/Preferences'
import SettingsProfile from '../containers/SettingsProfile'
import SettingsEditor from '../containers/SettingsEditor'
import { mayteBlack } from '../constants/colors'
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class SettingsView extends Component {
  render() {
    const { props, state } = this
    return(
      <View style={style.container}>
      {
        props.loading ?
          <View style={style.centered}>
            <ActivityIndicator />
          </View> :
        props.scene.view === 'Profile' ?
          <SettingsProfile {...props} /> :
        props.scene.view === 'Editor' ?
          <SettingsEditor {...props} /> :
        <Preferences {...props} />
      }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
})
