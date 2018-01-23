'use strict'

import React, {Component} from 'react'
import {BlurView}         from 'react-native-blur'
import {ButtonBlack}      from './Button'
import {ParticleSheet}    from './Particle'
import {
  screenWidth,
  screenHeight,
  em,
} from '../constants/dimensions'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Easing,
  Animated,
  StyleSheet,
} from 'react-native'

export default class WaitingRoomView extends Component {
  render() {
    const {props} = this

    return (
      <View style={style.container}>
        <ParticleSheet count={6} loopLegnth={10000} scale={0.4} particleStyle={{opacity: 0.4}} />
        <ParticleSheet count={6} loopLength={15000} scale={0.8} particleStyle={{opacity: 0.8}} />
        <ParticleSheet count={6} loopLength={20000} scale={1} />

        <Image style={[style.icon]}
               source={require('../images/unicorn-icon-black.png')}
               resizeMode="contain" />
        <Image style={[style.logo]}
               source={require('../images/unicorn-logo-black.png')}
               resizeMode="contain" />

        { !props.hasRequestedPerms ?
          <View style={style.permsCnr}>
            <Text style={style.copy}>
              Last step: enable notifications to hear back on your application status.
            </Text>
            <ButtonBlack
              onPress={props.requestNotifPerms}
              style={style.button}
              text="Got It" />
          </View>
        :
          <Text style={style.copy}>Thank you for applying! Your application is processing. We will notify you upon approval.</Text>
        }

        { !__DEV__ ? null :
          <TouchableOpacity style={{marginTop: em(1)}} onPress={props.deleteAccount}>
            <Text style={{color: 'red', backgroundColor: 'transparent'}}>Delete Account</Text>
          </TouchableOpacity> }
      </View>
    )
  }
}

const cornWidth = screenWidth * 0.66

const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center',},
  icon: {height: em(5), width: em(5), marginBottom: em(1),},
  logo: {marginBottom: em(3), height: em(1.2), width: em(6),},
  copy: {width: '80%', fontSize: em(1), marginBottom: em(3), fontFamily: 'Gotham-Medium', textAlign: 'center', backgroundColor: 'transparent'},
  button: {paddingLeft: em(2.66), paddingRight: em(2.66),},
  fragment: {position: 'absolute', width: '100%', height: '50%'},
  bgBlur: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'},
})
