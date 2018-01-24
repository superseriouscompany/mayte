'use strict'

import React, {Component}         from 'react'
import {ButtonGrey, ButtonBlack}  from './Button'
import Fairy, {FairySheet}        from './Fairy'
import {Unicorn}                  from './CornSelector'
import timing                     from '../constants/timing'
import LinearGradient             from 'react-native-linear-gradient'
import {
  groundHeight,
  StarSystem,
  mountainHeight,
} from './Environment'
import {
  em,
  screenWidth,
  screenHeight,
} from '../constants/dimensions'
import {
  mayteBlack,
  mayteWhite,
  mayteGreen,
  mayteBlue,
  maytePink,
} from '../constants/colors'
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
        <LinearGradient colors={['rgba(0,0,0,1)', '#232037']} style={{position:'absolute', top: 0, bottom: 0, left: 0, right: 0}} />
        <StarSystem count={6} loopLength={240000} starProps={{size: 1, twinkle: true, style: {opacity: 1}}}></StarSystem>
        <StarSystem count={15} loopLength={120000} starProps={{size: 0.66, twinkle: false, style: {opacity: 0.66}}}></StarSystem>
        <StarSystem count={25} starProps={{size: 0.33, twinkle: false, style: {opacity: 0.33}}}></StarSystem>
        <View style={style.ground}>
          <Image source={require('../images/mountains-1.png')} style={style.mountains} resizeMode='cover' />
        </View>
        <Animated.View style={[style.cornCont]}>
          <Unicorn showLabel={false} {...props} field="orientation" value="null" labelStyle={{bottom: '95%'}}
                   label="EVERYONE" flipped={true}
                   style={[style.corn, {right: em(8), bottom: em(9)}]}>
          <Image source={require('../images/unicorn-all.png')}
                 style={{width: em(8), height: em(8), transform: [{scaleY: 0.66}, {scaleX:-0.66}]}}
                 resizeMode='contain' />
          </Unicorn>
          <Unicorn showLabel={false} {...props} field="orientation" value="male"
                   label="MEN"
                   style={[style.corn, {left: em(1), bottom: em(4.5)}]}>
            <Image source={require('../images/unicorn-male.png')}
                   style={{width: '100%', height: '100%'}}
                   resizeMode='contain' />
          </Unicorn>
          <Unicorn showLabel={false} {...props} field="orientation" value="female"
                   label="WOMEN" flipped={true}
                  style={[style.corn, {right: em(1), bottom: em(3)}]}>
            <Image source={require('../images/unicorn-female.png')}
                    style={{width: '100%', height: '100%', transform: [{scaleX:-1.1},{scaleY:1.1}]}}
                    resizeMode='contain' />
          </Unicorn>
        </Animated.View>
        <FairySheet count={8} colorFn={[mayteWhite, mayteGreen, maytePink, mayteBlue]} />

        { props.loading ?
          <ActivityIndicator size="large"/>
        :
          <View style={style.main}>
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
  container: {flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: mayteBlack(),},
  main: {height: screenHeight - groundHeight - mountainHeight, justifyContent: 'center',},
  icon: {height: em(5), width: em(5), marginBottom: em(1),},
  logo: {marginBottom: em(3), height: em(1.2), width: em(6),},
  button: {paddingTop: em(1), paddingBottom: em(1), paddingLeft: em(1.33), paddingRight: em(1.33),},
  buttonGrad: {opacity: 0.8,},
  buttonText: {fontSize: em(0.9),},
  cornCont: {position: 'absolute', bottom: 0, left: 0, height: screenHeight * 0.55, width: screenWidth, backgroundColor: 'transparent',},
  ground: {position: 'absolute', backgroundColor: 'rgba(23,20,21,1)', borderColor: mayteBlack(), borderTopWidth: 1, width: screenWidth, height: groundHeight, bottom: 0, left: 0,},
  corn: {width: em(8), height: em(8), position: 'absolute',},
  mountains: {position: 'absolute', bottom: '100%', width: '100%', height: mountainHeight,}
})
