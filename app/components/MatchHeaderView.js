'use strict'

import React, { Component }                       from 'react'
import LinearGradient                             from 'react-native-linear-gradient'
import { matchHeaderHeight, statusBarHeight, em } from '../constants/dimensions'
import { mayteBlack }                             from '../constants/colors'
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
      <TouchableOpacity onPress={props.showMatches}>
        <Image style={style.ban}
               resizeMode='contain'
               source={require('../images/back-black.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={style.nav}
                        onPress={props.view === 'Profile' ? props.showChat : props.showProfile}>
        {
          props.view === 'Profile'
          ?
          <Image style={style.chat}
                 resizeMode='contain'
                 source={require('../images/chat-bubble-black.png')} />
          :
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image style={style.bubble} source={{uri: props.match.photos[0].url}} />
            <Text style={style.name}>{props.match.fullName.split(' ')[0]}</Text>
          </View>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={props.showBlock}>
        <Image style={style.ban}
               resizeMode='contain'
               source={require('../images/ban-black.png')} />
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
    paddingRight: em(1),
    paddingLeft: em(1),
    height: matchHeaderHeight,
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(40,40,40,1)',
    opacity: 1,
  },
  bubble: {
    height: matchHeaderHeight * 0.55,
    width: matchHeaderHeight * 0.55,
    borderRadius: matchHeaderHeight * 0.55 * 0.5,
    borderWidth: 1,
    borderColor: mayteBlack(0.33),
  },
  name: {
    color: mayteBlack(),
    marginLeft: 5,
    fontSize: 18,
    letterSpacing: 0.1,
    fontFamily: 'Gotham-Medium',
  },
  chat: {
    height: matchHeaderHeight * 0.4,
    width: matchHeaderHeight * 0.4,
  },
  ban: {
    height: matchHeaderHeight * 0.38,
    width: matchHeaderHeight * 0.38,
  },
  back: {
    height: matchHeaderHeight * 0.38,
    width: matchHeaderHeight * 0.38,
  },
})
