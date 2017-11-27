import React, { Component } from 'react'
import { em } from '../constants/dimensions'
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native'

const bubbleDiameter = 200

export default class PreferencesView extends Component {
  render() {
    const { props, state } = this
    console.log("preferences", props)
    return(
      <ScrollView contentContainerStyle={style.container}>
        <Image style={style.bubble} source={{uri: props.user.photos[0].url}} />
        <Text style={style.editCTA}>Edit Profile</Text>
      </ScrollView>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: em(4),
    alignItems: 'center',
  },
  bubble: {
    width: bubbleDiameter,
    height: bubbleDiameter,
    borderRadius: bubbleDiameter * 0.5,
  },
  editCTA: {
    paddingTop: em(2),
    fontSize: em(1.66),
  }
})
