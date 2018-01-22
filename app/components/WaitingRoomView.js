'use strict'

import React, {Component}          from 'react'
import {BlurView}                  from 'react-native-blur'
import {ButtonBlack}               from './Button'
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
  constructor(props) {
    super(props)
  }

  render() {
    const {props} = this

    return (
      <View style={style.container}>
        <Image style={[style.icon]}
               source={require('../images/unicorn-icon-black.png')}
               resizeMode="contain" />
        <Image style={[style.logo]}
               source={require('../images/unicorn-logo-black.png')}
               resizeMode="contain" />

        <Text style={style.copy}>Your application is processing. We will notify you upon approval.</Text>

        <ButtonBlack
          style={style.button}
          text="Got It" />

        <TouchableOpacity style={{marginTop: em(1)}} onPress={props.deleteAccount}>
          <Text style={{color: 'red'}}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const cornWidth = screenWidth * 0.66

const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center',},
  icon: {height: em(5), width: em(5), marginBottom: em(1),},
  logo: {marginBottom: em(3), height: em(1.2), width: em(6),},
  copy: {width: '80%', fontSize: em(1), marginBottom: em(3), fontFamily: 'Gotham-Medium', textAlign: 'center',},
  button: {paddingLeft: em(1), paddingRight: em(1),}
})
