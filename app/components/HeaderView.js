'use strict'

import React, {Component} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { headerHeight } from '../services/globals'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (props.scene.name === 'Match' ?
    <View style={style.container}>
      <TouchableOpacity onPress={props.goBack}>
        <Text style={style.button}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.showMatch}>
        <Text style={style.button}>Deets</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.showBlock}>
        <Text style={style.button}>Block</Text>
      </TouchableOpacity>
    </View>
    :
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
    position: 'absolute',
    top: 0,
    zIndex: 10,
    width: '100%',
    paddingTop: 25,
    paddingBottom: 20,
    paddingRight: 5,
    paddingLeft: 5,
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(40,40,40,1)',
    opacity: 1,
  },
  button: {
    color: 'blue',
    backgroundColor: 'transparent',
  }
})
