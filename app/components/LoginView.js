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
      <View style={[style.logo]}>
        <Text>LOGO</Text>
      </View>

      <TouchableOpacity onPress={props.login} style={[style.button, {marginBottom: 20}]}>
        <Text style={[style.buttonText]}>LOGIN WITH INSTAGRAM</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.linkedinLogin} style={style.button}>
        <Text style={[style.buttonText]}>LOGIN WITH LINKEDIN</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(35,31,32,1)',
  },

  logo: {
    height: 100,
    width: 100,
    marginBottom: 40,
    backgroundColor: 'white',
  },

  button: {
    color: 'rgba(35,31,32,1)',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    width: 220,
  },

  buttonText: {
    width: '100%',
    textAlign: 'center',
    color: 'rgba(35,31,32,1)',
  }
})
