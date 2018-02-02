'use strict'

import React, {Component} from 'react'
import Text               from './Text'
import {em, bottomBoost}  from '../constants/dimensions'
import base               from '../constants/styles'
import {mayteGold}        from '../constants/colors'
import {ButtonBlack}      from './Button'
import {ParticleSheet}    from './Particle'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <ParticleSheet count={6} loopLegnth={10000} scale={0.4} particleStyle={{opacity: 0.4}} />
      <ParticleSheet count={6} loopLength={15000} scale={0.8} particleStyle={{opacity: 0.8}} />
      <ParticleSheet count={6} loopLength={20000} scale={1} />

      <Text style={[style.text, style.header]}>{`VIP Codes`}</Text>
      <Text style={[style.text, style.body]}>{`As a Unicorn founding member, you have exclusive invite privileges. Please use this power responsibly and help us fill the Unicorn ecosystem with individuals like yourself.`}</Text>
      <TouchableOpacity style={style.back} onPress={props.visitHome}>
        <Image style={[style.icon]}
               source={require('../images/unicorn-icon-black.png')}
               resizeMode="contain" />
        <Text>Home</Text>
      </TouchableOpacity>

      <ButtonBlack text={`Send Invitation`} style={style.topButton}
        onPress={() => props.generate('silver', 'Find your unicorn')} />

      { !props.isAdmin ? null :
        <TouchableHighlight underlayColor={mayteGold()} style={[base.button, style.secretButton]}
          onPress={() => props.generate('gold', 'I think you\'re a unicorn')}>
          <View>
            <Text style={[base.buttonText, style.secretButtonText]}>Send VIP Invitation</Text>
          </View>
        </TouchableHighlight>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topButton: {
    paddingLeft: em(1.66),
    paddingRight: em(1.66),
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
  secretButton: {
    backgroundColor: 'white',
    marginTop: em(1),
  },
  secretButtonText: {
    color: 'white',
    fontSize: em(0.9)
  },
  back: {
    position: 'absolute',
    bottom: em(2) + bottomBoost,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  icon: {
    height: em(4),
    width: em(5),
    marginBottom: em(0.66),
  },
})
