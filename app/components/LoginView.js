'use strict'

import React, { Component }        from 'react'
import { mayteBlack, mayteWhite }  from '../constants/colors'
import { em, screenWidth }         from '../constants/dimensions'
import { ButtonGrey, ButtonBlack } from './Button'
import timing                      from '../constants/timing'
import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
const bg = require('../images/LoginBG.jpg')

export default class LoginView extends Component {
  constructor(props) {
    super(props)
    this._bgOpacity   = new Animated.Value(0)
    this._igOpacity   = new Animated.Value(0)
    this._liOpacity   = new Animated.Value(0)
    this._logoOpacity = new Animated.Value(0)
    this._igDriftY    = new Animated.Value(em(0.8))
    this._liDriftY    = new Animated.Value(em(0.8))
    this._bgScale     = new Animated.Value(1.1)
  }

  componentDidMount() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this._bgOpacity, {
          toValue: 1,
          duration: timing.loginBgIn,
          useNativeDriver: true,
        }),
        Animated.timing(this._bgScale, {
          toValue: 1,
          duration: timing.loginBgIn,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(this._logoOpacity, {
        toValue: 1,
        duration: timing.loginBgIn,
        useNativeDriver: true,
      }),
      Animated.delay(timing.loginBtnDelay),
      Animated.parallel([
        Animated.timing(this._igOpacity, {
          toValue: 1,
          duration: timing.loginBtnIn,
          useNativeDriver: true,
        }),
        Animated.timing(this._igDriftY, {
          toValue: 1,
          duration: timing.loginBtnIn,
          useNativeDriver: true,
        }),
        Animated.timing(this._liOpacity, {
          toValue: 1,
          duration: timing.loginBtnIn,
          delay: timing.loginBtnStagger,
          useNativeDriver: true,
        }),
        Animated.timing(this._liDriftY, {
          toValue: 1,
          duration: timing.loginBtnIn,
          delay: timing.loginBtnStagger,
          useNativeDriver: true,
        })
      ]),
    ]).start()
  }

  render() {
    const {props,state} = this
    return (
      <View style={style.container}>
        <Animated.Image style={[style.cover, {opacity: this._bgOpacity, transform: [{scale: this._bgScale}]}]}
                        resizeMode="cover"
                        source={require('../images/LoginBG.jpg')} />
        <View style={style.overlay} />

        { props.loading ?
          <ActivityIndicator size="large"/>
        :
          <View>
            <Animated.View style={{alignItems: 'center', opacity: this._logoOpacity}}>
              <Image style={[style.icon]}
                     source={require('../images/unicorn-icon-white.png')}
                     resizeMode="contain" />
              <Image style={[style.logo]}
                     source={require('../images/unicorn-logo-white.png')}
                     resizeMode="contain" />
            </Animated.View>

            <Animated.View
              style={{
                opacity: this._igOpacity,
                transform: [{translateY: this._igDriftY}]}}>
              <ButtonGrey
                text='LOGIN WITH INSTAGRAM'
                styleGrad={style.buttonGrad}
                styleText={style.buttonText}
                style={[style.button, {marginBottom: em(2.33)}]}
                onPress={props.instagramLogin} />
            </Animated.View>

            <Animated.View
              style={{
                opacity: this._liOpacity,
                transform: [{translateY: this._liDriftY}]}}>
              <ButtonGrey
                text='LOGIN WITH LINKEDIN'
                styleGrad={style.buttonGrad}
                styleText={style.buttonText}
                style={[style.button]}
                onPress={props.linkedinLogin} />
            </Animated.View>
          </View>
        }
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mayteBlack(),
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

  icon: {
    height: em(5),
    width: em(5),
    marginBottom: em(1),
  },

  logo: {
    marginBottom: em(3),
    height: em(1.2),
    width: em(6),
  },

  button: {
    paddingTop: em(1),
    paddingBottom: em(1),
    paddingLeft: em(1.33),
    paddingRight: em(1.33),
  },

  buttonGrad: {
    opacity: 0.8,
  },

  buttonText: {
    fontSize: em(0.9),
  }
})
