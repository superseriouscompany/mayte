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
  Linking,
  Easing,
  Animated,
  StyleSheet,
} from 'react-native'

const particles =
<View style={{position: 'absolute', top: 0, left: 0, width: screenWidth, height: screenHeight}}>
  <ParticleSheet count={6} loopLength={10000} scale={0.4} particleStyle={{opacity: 0.4}} />
  <ParticleSheet count={6} loopLength={15000} scale={0.8} particleStyle={{opacity: 0.8}} />
  <ParticleSheet count={6} loopLength={20000} scale={1} />
</View>

export default class WaitingRoomView extends Component {
  render() {
    const {props} = this

    return (
      <View style={style.container}>
        { particles }

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
              text="Notify Me" />
          </View>
        :
          <View style={style.permsCnr}>
            <Text style={style.copy}>Thank you for applying! Your application is processing. We will notify you upon approval.</Text>
            <ButtonBlack text="More Info" style={style.button} onPress={() => Linking.openURL('https://dateunicorn.com/community')} />
          </View>
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
  icon: {height: em(4), marginBottom: em(1),},
  logo: {marginBottom: em(3), height: em(1.4), width: em(6),},
  permsCnr: { justifyContent: 'center', alignItems: 'center', width: '80%', },
  copy: { fontSize: em(1), marginBottom: em(3), fontFamily: 'Gotham-Medium', textAlign: 'center', backgroundColor: 'transparent'},
  button: {paddingLeft: em(2), paddingRight: em(2),},
  fragment: {position: 'absolute', width: '100%', height: '50%'},
  bgBlur: {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'},
})
