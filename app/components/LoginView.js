'use strict'

import React, { Component } from 'react'
import { mayteBlack }       from '../constants/colors'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
const bg = require('../images/LoginBG.jpg')

export default function(props) {
  return (
    <View style={style.container}>
      <Image style={[style.cover]}
             resizeMode="cover"
             source={bg} />
      <View style={style.overlay} />

      <Image style={[style.logo]}
             source={require('../images/logo-trans.png')}
             resizeMode="contain" />

      <TouchableOpacity onPress={props.login} style={[style.button, {marginBottom: 40}]}>
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
  },

  cover: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: mayteBlack(0.66),
  },

  logo: {
    height: 120,
    width: 300,
    marginBottom: 40,
  },

  button: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'rgba(0,0,0,1)',
    backgroundColor: 'rgba(220,224,223,1)',
    width: 280,
  },

  buttonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: mayteBlack(),
    letterSpacing: 1,
  }
})
