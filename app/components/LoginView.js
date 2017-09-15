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
      <TouchableOpacity onPress={props.login}>
        <Text style={style.button}>Login with Instagram</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.linkedinLogin}>
        <Text style={style.button}>Login with LinkedIn</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  button: {
    color: 'blue',
  },
})
