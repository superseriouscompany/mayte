'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <Image style={[style.cover]}
             resizeMode="cover"
             source={{url: "https://scontent-lax3-1.cdninstagram.com/t51.2885-15/sh0.08/e35/p640x640/14590945_592060144325067_9110004373622095872_n.jpg%20640w,https://scontent-lax3-1.cdninstagram.com/t51.2885-15/sh0.08/e35/p750x750/14590945_592060144325067_9110004373622095872_n.jpg%20750w,https://scontent-lax3-1.cdninstagram.com/t51.2885-15/e35/14590945_592060144325067_9110004373622095872_n.jpg"}} />
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
    backgroundColor: 'rgba(35,31,32,0.66)',
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
    color: 'rgba(35,31,32,1)',
    letterSpacing: 1,
  }
})
