'use strict'

import React, {Component}    from 'react'
import LinearGradient        from 'react-native-linear-gradient'
import { matchHeaderHeight } from '../constants/dimensions'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={props.showMatches}>
        <Text style={style.button}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.view === 'Profile' ? props.showChat : props.showProfile}>
        <Text style={style.button}>{`${props.view === 'Profile' ? 'Chat' : 'Deets'}`}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.showBlock}>
        <Text style={style.button}>Block</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
    paddingTop: 25,
    paddingBottom: 20,
    paddingRight: 5,
    paddingLeft: 5,
    height: matchHeaderHeight,
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
