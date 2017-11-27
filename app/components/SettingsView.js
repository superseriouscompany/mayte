import React, { Component } from 'react'
import Preferences from '../containers/Preferences'
import { mayteBlack } from '../constants/colors'
import {
  ActivityIndicator,
  StyleSheet,
  View
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
        <Preferences {...props} />
      }
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
