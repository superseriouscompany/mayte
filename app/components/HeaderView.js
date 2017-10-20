'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={props.showSettings}>
        <Text style={style.button}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.showRecs}>
        <Text style={style.button}>(logo)</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.showMatches}>
        <Text style={style.button}>Matches</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 20,
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    opacity: 1,
  },
  button: {
    color: 'blue',
  }
})
