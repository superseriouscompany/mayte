'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import LinearGradient from 'react-native-linear-gradient'
import {mayteBlack, mayteWhite} from '../constants/colors'
import {
  Image,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

const idDiameter = em(5)
const starDiameter = em(0.33)

class NightSky extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {props,state} = this
    return(
      <Animated.View style={[style.nightSky, {opacity: props.starFade}]}>
        <LinearGradient colors={['rgba(0,0,0,1)', '#232037']} style={{position:'absolute', top: 0, bottom: 0, left: 0, right: 0}} />
        <Star style={{top: em(2), left: em(2)}} twinkleDelay={2000} />
        <Star style={{top: em(10), left: em(10)}} twinkleDelay={2800} />
        <Star style={{top: em(20), left: em(15)}} twinkleDelay={3300} />
        <Star style={{top: em(15), left: em(20)}} twinkleDelay={4500} />
        <Star style={{top: em(23), left: em(2)}} twinkleDelay={5300} />
        <Star style={{top: em(2), left: em(2)}} twinkleDelay={6200} />
        <Star style={{top: screenHeight * 0.64, left: em(18)}} twinkleDelay={6800} />

        {/* make a wish ya rich mothafocker */}
        <Star twinkleDelay={500}
              style={{
                top: em(25), left: em(5),
                opacity: props.shootingStarFade,
                transform: [
                  {translateX: props.shootingStarDrift},
                  {translateY: Animated.multiply(props.shootingStarDrift, new Animated.Value(-1.33))}
              ]}} />
      </Animated.View>
    )
  }
}

class Star extends Component {
  constructor(props) {
    super(props)
    this._twinkle = new Animated.Value(0)
  }
  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this._twinkle, {
          toValue: 1,
          duration: 200,
          delay: this.props.twinkleDelay || 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this._twinkle, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ])
    ).start()
  }
  render() {
    const {props,state} = this
    return(
      <Animated.View style={[style.star, props.style]}>
        <Animated.View style={[
          style.twinkle,
          {transform: [
            {scale: this._twinkle},
            {rotate: '45deg'}
          ]}
        ]} />
      </Animated.View>
    )
  }
}

export default class Environment extends Component {
  render() {
    const {props,state} = this
    return(
      <View style={style.environment}>
        <NightSky {...props} />
        <View style={style.ground}></View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  environment: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  nightSky: {
    width: screenWidth,
    height: screenHeight - 185,
  },
  star: {
    position: 'absolute',
    backgroundColor: mayteWhite(),
    width: starDiameter,
    height: starDiameter,
    borderRadius: starDiameter/2,
  },
  twinkle: {
    backgroundColor: mayteWhite(0.8),
    width: starDiameter*2,
    height: starDiameter*2,
    top: -(starDiameter/2),
    left: -(starDiameter/2),
  },
  ground: {
    position: 'absolute',
    backgroundColor: 'rgba(23,20,21,1)',
    borderColor: mayteBlack(),
    borderTopWidth: 1,
    width: screenWidth,
    height: 185,
    bottom: 0,
    left: 0,
  },
})