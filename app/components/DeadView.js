'use strict'

import React, {Component} from 'react'
import {ButtonBlack}      from './Button'
import {ParticleSheet}    from './Particle'
import {
  em,
  screenWidth,
  bottomBoost,
} from '../constants/dimensions'
import {
  Linking,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <ParticleSheet count={6} loopLength={10000} scale={0.4} particleStyle={{opacity: 0.4}} />
      <ParticleSheet count={6} loopLength={15000} scale={0.8} particleStyle={{opacity: 0.8}} />
      <ParticleSheet count={6} loopLength={20000} scale={1} />

      <Text style={[style.text, style.header]}>{`Please Upgrade`}</Text>
      <Text style={[style.text, style.body]}>{`At Unicorn, we strive to deliver a consistent, quality experience for all of our users; unfortunately, this sometimes requires us to deprecate older versions of the app. We apologize for any inconvenience.`}</Text>
      <ButtonBlack text="Upgrade Now"
        onPress={() => Linking.openURL('https://joinunicorn.com/download')}/>

      <Image style={[style.icon]}
             source={require('../images/unicorn-icon-black.png')}
             resizeMode="contain" />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
  },
  text: {
    backgroundColor: 'transparent',
    fontFamily: 'Futura',
    textAlign: 'center',
  },
  header: {
    fontSize: em(2),
    marginBottom: em(2),
  },
  body: {
    fontSize: em(1),
    marginBottom: em(2),
    width: '80%',
  },
  icon: {
    height: em(4),
    width: em(5),
    position: 'absolute',
    bottom: em(2) + bottomBoost,
  }
})
