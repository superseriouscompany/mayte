import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native'

export default class SettingsEditor extends Component {
  render() {
    const { props, state } = this
    return(
      <View style={style.centered}>
        <TouchableOpacity onPress={props.viewProfile}>
          <Text>View Profile</Text>
        </TouchableOpacity>
        <Text>Editor</Text>
        <TouchableOpacity onPress={props.viewPreferences}>
          <Text>View Preferences</Text>
        </TouchableOpacity>
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
