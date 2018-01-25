'use strict'

import React, {Component} from 'react'
import {BlurView}         from 'react-native-blur'
import {mayteWhite}       from '../constants/colors'
import {
  em,
  screenWidth,
  screenHeight,
} from '../constants/dimensions'
import {
  View,
  Animated,
  Easing,
  StyleSheet,
} from 'react-native'

export default class Fairy extends Component {
  constructor(props) {
    super(props)

    this._fade = new Animated.Value(0)

    this.floatRadius = em(1)
    this._float = new Animated.Value(1)

    this.scaleRadius = 0.33
    this._scale = new Animated.Value(1 - this.scaleRadius)

    this.auraOpacity = 0.5
    this._aura = new Animated.Value(this.auraOpacity)

    this.runLoop = this.runLoop.bind(this)
  }
  componentDidMount() {
    setTimeout(() => {
      Animated.timing(this._fade, {
        toValue: 1, duration: this.props.floatLength / 4, useNativeDriver: true}
      ).start()
      this.runLoop()
    }, this.props.delay)
  }
  runLoop() {
    Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(this._scale, {
              toValue: 1 + this.scaleRadius,
              duration: this.props.floatLength / 4,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(this._aura, {
              toValue: 0.1,
              duration: this.props.floatLength / 4,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(this._scale, {
              toValue: 1 - this.scaleRadius,
              duration: this.props.floatLength / 4,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(this._aura, {
              toValue: this.auraOpacity,
              duration: this.props.floatLength / 4,
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
            duration: this.props.floatLength / 2,
            useNativeDriver: true,
          }),
          Animated.timing(this._float, {
            toValue: 1 - this.floatRadius,
            duration: this.props.floatLength / 2,
            useNativeDriver: true,
          }),
        ]),
    ).start()
  }
  render() {
    const {props, state} = this
    return (
      <Animated.View style={[style.cont, props.style, {opacity: this._fade, transform: [{translateY: this._float}]}]}>
        <Animated.View style={[style.body, {backgroundColor: props.colorFn(), transform: [{scale: this._scale}]}]}></Animated.View>
        <Animated.View style={[style.aura, {backgroundColor: props.colorFn(0.5), opacity: this._aura}]}></Animated.View>
      </Animated.View>
    )
  }
}

export class FairySheet extends Component {
  constructor(props) {
    super(props)
    this._translateY = new Animated.Value(0)
    this.renderFairies = this.renderFairies.bind(this)
  }
  componentDidMount() {
    Animated.loop(
      Animated.timing(this._translateY, {
        toValue: -screenHeight,
        duration: this.props.loopLength,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start()
  }
  renderFairies() {
    const {props} = this
    const fs = []
    var i = 0
    var c = 0
    while (i < props.count*2) {
      var top = Math.random() * (screenHeight * 0.9) + (screenHeight * 0.1)
      var left = Math.random() * screenWidth - maxRadius
      var colorFn = typeof props.colorFn == 'function' ? props.colorFn : props.colorFn[c % props.colorFn.length]
      fs.push(
        <Fairy {...props}
          style={props.fairyStyle}
          colorFn={colorFn}
          key={i}
          delay={i * props.floatLength / props.count}
          style={[{top: top, left: left}, props.style]} />,
        <Fairy {...props}
          style={props.fairyStyle}
          colorFn={colorFn}
          key={i+1}
          delay={i * props.floatLength / props.count}
          style={[{top: top + screenHeight, left: left}, props.style]} />,
      )
      i += 2
      c += 1
    }
    return fs
  }
  render() {
    return(
      <Animated.View style={[style.sheet, this.props.style, {transform: [{translateY: this._translateY}]}]}>
      {this.renderFairies()}
      </Animated.View>
    )
  }
}

FairySheet.defaultProps = {
  floatLength: 6000,
  loopLength: 10000,
}

const maxRadius = em(0.2)

const style = StyleSheet.create({
  cont: {
    position: 'absolute',
    overflow: 'visible',
    width: maxRadius*4,
    height: maxRadius*4,
    borderRadius: maxRadius*2,
  },
  body: {
    position: 'absolute',
    width: maxRadius*2,
    height: maxRadius*2,
    left: maxRadius, top: maxRadius,
    borderRadius: maxRadius,
  },
  aura: {
    position: 'absolute',
    width: maxRadius*2,
    height: maxRadius*2,
    left: maxRadius, top: maxRadius,
    borderRadius: maxRadius,
    transform: [{scale: 3}],
  },
  sheet: {
    position: 'absolute',
    top: 0, left: 0,
  },
})
