import React, { Component }                   from 'react'
import LinearGradient                         from 'react-native-linear-gradient'
import { mayteBlack, mayteWhite }             from '../constants/colors'
import {
  matchHeaderHeight,
  notchHeight,
  em,
  rootNav,
} from '../constants/dimensions'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <LinearGradient style={style.grad} colors={[mayteWhite(0), mayteWhite(1)]} />
      <TouchableOpacity onPress={() => null}>
        <Image style={[style.ban, {opacity: 0}]}
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

      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            `Block ${props.match.fullName.split(' ')[0]}?`,
            "They won't appear in your Suggestions feed nor be able to message you.",
            [
              {text: 'Cancel'},
              {text: 'Confirm', onPress: () => props.block(props.match)}
            ]
          )
        }}
        style={style.ban}>
        <LinearGradient colors={[mayteWhite(0.9), mayteWhite()]} style={style.banGrad} />
        <Image style={style.banIcon} resizeMode='contain' source={require('../images/ban-black.png')} />
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
    height: matchHeaderHeight + notchHeight,
    paddingTop: notchHeight,
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
    marginLeft: em(0.5),
    fontSize: 18,
    letterSpacing: 0.1,
    fontFamily: 'Futura',
  },
  chat: {
    height: matchHeaderHeight * 0.4,
    width: matchHeaderHeight * 0.4,
  },
  back: {
    height: matchHeaderHeight * 0.38,
    width: matchHeaderHeight * 0.38,
  },
  grad: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
  },
  ban: {
    width: rootNav.toggleWidth,
    height: rootNav.toggleHeight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: rootNav.toggleWidth/2,
  },
  banGrad: {
    position: 'absolute',
    top: 0, left: 0,
    width: rootNav.toggleWidth,
    height: rootNav.toggleHeight,
    borderRadius: rootNav.toggleWidth / 2,
    borderWidth: 1,
    borderColor: mayteBlack(0.1),
    backgroundColor: 'transparent',
  },
  banIcon: {
    width: '50%',
    height: '50%',
  },
})
