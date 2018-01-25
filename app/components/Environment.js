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
        <LinearGradient colors={['#201D33', '#3A345B']} style={{position:'absolute', top: 0, bottom: 0, left: 0, right: 0}} />

        <StarSystem count={6} loopLength={240000} starProps={{size: 1, twinkle: true, style: {opacity: 1}}}></StarSystem>
        <StarSystem count={15} loopLength={120000} starProps={{size: 0.66, twinkle: false, style: {opacity: 0.66}}}></StarSystem>
        <StarSystem count={25} starProps={{size: 0.33, twinkle: false, style: {opacity: 0.33}}}></StarSystem>

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

export class Star extends Component {
  constructor(props) {
    super(props)
    this._twinkle = new Animated.Value(0)
  }
  componentDidMount() {
    if (!this.props.twinkle) {return}
    Animated.loop(
      Animated.sequence([
        Animated.timing(this._twinkle, {
          toValue: 1,
          duration: this.props.twinkleLength * 0.4,
          delay: this.props.twinkleDelay,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this._twinkle, {
          toValue: 0,
          duration: this.props.twinkleLength * 0.6,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(this.props.loopLength - this.props.twinkleLength)
      ])
    ).start()
  }
  render() {
    const {props,state} = this
    return(
      <Animated.View style={[style.star, props.style, {transform: [{scale: props.size}]}]}>
        <Animated.View style={[
          style.twinkle,
          props.twinkleStyle,
          {transform: [
            {scale: this._twinkle},
            {rotate: '45deg'}
          ]}
        ]} />
      </Animated.View>
    )
  }
}

export class StarSystem extends Component {
  shouldComponentUpdate() { return false }

  constructor(props) {
    super(props)

    this.stars = []
    const coords = []

    const centerx = screenWidth / 2 - starDiameter / 2
    const centery = screenHeight / 2 - starDiameter / 2

    var i = 0
    while (i < props.count * (this.props.move ? 2 : 1)) {
      let coords = {x: Math.random() * screenWidth, y: Math.random() * screenHeight}
      this.stars.push(
        <Star {...props.starProps}
          key={i}
          twinkleDelay={props.starProps.twinkleDelay || i * 500}
          loopLength={props.starProps.loopLength || props.count * 500}
          style={[
            props.starProps.style,
            {left: coords.x, top: coords.y}
          ]} />, !this.props.move ? null :
        <Star {...props.starProps}
          key={i+1}
          twinkleDelay={props.starProps.twinkleDelay || i * 500}
          loopLength={props.starProps.loopLength || props.count * 500}
          style={[
            props.starProps.style, {
            left: coords.x, top: coords.y + screenHeight
          }]} />
      )
      i += (this.props.move ? 2 : 1)
    }

    this._rot = new Animated.Value(0)
    this._translateY = new Animated.Value(0)
  }

  componentDidMount() {
    if (!this.props.move) {return}
    Animated.loop(
      Animated.timing(this._translateY, {
        toValue: -screenHeight,
        duration: this.props.loopLength,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }

  render() {
    const {props, state} = this
    return (
      <Animated.View style={[style.starSystem, props.style, {transform: [{translateY: this._translateY}]}]}>{this.stars}</Animated.View>
    )
  }
}

Star.defaultProps = {
  loopLength: 2000,
  twinkleLength: 500,
  twinkleDelay: 100,
  twinkle: true,
  size: 1,
}

StarSystem.defaultProps = {
  loopLength: 60000,
  count: 100,
  move: true,
}

export default class Environment extends Component {
  render() {
    const {props,state} = this
    return(
      <View style={style.environment}>
        <NightSky {...props} />
        <View style={style.ground}>
          <Image source={require('../images/mountains-1.png')} style={style.mountains} resizeMode='cover' />
        </View>
      </View>
    )
  }
}

export class SpaceSky extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {props,state} = this
    return(
      <View style={props.style}>
        <LinearGradient colors={['rgba(0,0,0,1)', '#232037']} style={{position:'absolute', top: 0, bottom: 0, left: 0, right: 0}} />
        {props.children}
      </View>
    )
  }
}

export const groundHeight = 185
export const mountainHeight = 50

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
    height: groundHeight,
    bottom: 0,
    left: 0,
  },
  starSystem: {
    position: 'absolute',
    top: 0, left: 0,
    height: screenHeight,
    width: screenWidth,
  },
  mountains: {
    position: 'absolute',
    bottom: '100%',
    width: '100%',
    height: mountainHeight,
  }
})
