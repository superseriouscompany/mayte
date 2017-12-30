'use strict'

import React, { Component } from 'react'
import { mayteBlack, mayteWhite }       from '../constants/colors'
import { em, screenWidth }  from '../constants/dimensions'
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
    this._logoOpacity = new Animated.Value(0)
    this._igOpacity = new Animated.Value(0)
    this._liOpacity = new Animated.Value(0)
    this._igDriftY = new Animated.Value(em(1))
    this._liDriftY = new Animated.Value(em(1))
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this._logoOpacity, {
        toValue: 1,
        duration: 666,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(this._igOpacity, {
          toValue: 1,
          duration: 333,
          useNativeDriver: true,
        }),
        Animated.timing(this._igDriftY, {
          toValue: 1,
          duration: 333,
          useNativeDriver: true,
        }),
        Animated.timing(this._liOpacity, {
          toValue: 1,
          duration: 333,
          delay: 111,
          useNativeDriver: true,
        }),
        Animated.timing(this._liDriftY, {
          toValue: 1,
          duration: 333,
          delay: 111,
          useNativeDriver: true,
        })
      ]),
    ]).start()
  }

  render() {
    const {props,state} = this
    return (
      <View style={style.container}>
        <Image style={[style.cover]}
               resizeMode="cover"
               source={require('../images/login.jpg')} />
        <View style={style.overlay} />

        { props.loading ?
          <ActivityIndicator size="large"/>
        :
          <View style={style.container}>
            <Animated.View style={{alignItems: 'center', opacity: this._logoOpacity}}>
              <Image style={[style.icon]}
                     source={require('../images/icon-trans.png')}
                     resizeMode="contain" />
              <Text style={[style.name]}>UNICORN</Text>
            </Animated.View>

            <Animated.View style={{opacity: this._igOpacity, transform: [{translateY: this._igDriftY}]}}>
              <TouchableOpacity onPress={props.instagramLogin}
                                style={[style.button, {marginBottom: 40}]}>
                <Text style={[style.buttonText]}>LOGIN WITH INSTAGRAM</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View style={{opacity: this._liOpacity, transform: [{translateY: this._liDriftY}]}}>
              <TouchableOpacity onPress={props.linkedinLogin} style={style.button}>
                <Text style={[style.buttonText]}>LOGIN WITH LINKEDIN</Text>
              </TouchableOpacity>
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
    width: em(13.33),
    marginBottom: em(1),
  },

  name: {
    backgroundColor: 'transparent',
    marginBottom: 40,
    fontSize: em(1),
    fontFamily: 'Gotham-Book',
    color: 'white',
    letterSpacing: em(0.1),
  },

  button: {
    paddingTop: em(1),
    paddingBottom: em(1),
    paddingLeft: em(1),
    paddingRight: em(1),
    borderRadius: 4,
    shadowRadius: 4,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'rgba(0,0,0,1)',
    backgroundColor: mayteWhite(0.8),
    width: screenWidth * 0.8,
    maxWidth: 280,
  },

  buttonText: {
    width: '100%',
    textAlign: 'center',
    fontSize: em(1),
    fontWeight: 'bold',
    color: mayteBlack(),
    letterSpacing: 1,
    fontFamily: 'Gotham-Medium',
    marginTop: em(0.1),
  }
})
