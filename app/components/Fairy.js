'use strict'

import React, {Component} from 'react'
import {BlurView}         from 'react-native-blur'
import {mayteWhite}       from '../constants/colors'
import {em}               from '../constants/dimensions'
import {
  View,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native'

export default class Fairy extends Component {
  constructor(props) {
    super(props)

    this.floatRadius = em(1)
    this.floatLength = 4000
    this._float = new Animated.Value(1)

    this.scaleRadius = 0.33
    this.scaleLength = this.floatLength / 2
    this._scale = new Animated.Value(1 - this.scaleRadius)

    this.auraOpacity = 0.5
    this.auraLength = 4000
    this._aura = new Animated.Value(this.auraOpacity)
  }
  componentDidMount() {
    Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(this._scale, {
              toValue: 1 + this.scaleRadius,
              duration: this.scaleLength / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(this._aura, {
              toValue: 0.1,
              duration: this.scaleLength / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(this._scale, {
              toValue: 1 - this.scaleRadius,
              duration: this.scaleLength / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(this._aura, {
              toValue: this.auraOpacity,
              duration: this.scaleLength / 2,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ])
        ]),
    ).start()

    Animated.loop(
        Animated.sequence([
          Animated.timing(this._float, {
            toValue: 1 + this.floatRadius,
            duration: this.floatLength / 2,
            useNativeDriver: true,
          }),
          Animated.timing(this._float, {
            toValue: 1 - this.floatRadius,
            duration: this.floatLength / 2,
            useNativeDriver: true,
          }),
        ]),
    ).start()
  }
  render() {
    const {props, state} = this
    return (
      <Animated.View style={[style.cont, props.style, {transform: [{translateY: this._float}]}]}>
        <Animated.View style={[style.body, {transform: [{scale: this._scale}]}]}></Animated.View>
        <Animated.View style={[style.aura, {opacity: this._aura}]}></Animated.View>
      </Animated.View>
    )
  }
}

const bodyRadius = em(0.2)

const style = StyleSheet.create({
  cont: {
    position: 'absolute',
    overflow: 'visible',
    width: bodyRadius*4,
    height: bodyRadius*4,
    borderRadius: bodyRadius*2,
  },
  body: {
    backgroundColor: mayteWhite(),
    position: 'absolute',
    width: bodyRadius*2,
    height: bodyRadius*2,
    left: bodyRadius, top: bodyRadius,
    borderRadius: bodyRadius,
  },
  aura: {
    position: 'absolute',
    backgroundColor: mayteWhite(0.5),
    width: bodyRadius*2,
    height: bodyRadius*2,
    left: bodyRadius, top: bodyRadius,
    borderRadius: bodyRadius,
    transform: [{scale: 3}],
  }
})
