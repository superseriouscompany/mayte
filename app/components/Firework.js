'use strict'

import React, {Component} from 'react'
import {
  View,
  Animated,
} from 'react-native'

export default class Firework extends Component {
  constructor(props) {
    super(props)
    this._explode = new Animated.Value(0)
    this._driftY  = new Animated.Value(0)
    this._opacity = new Animated.Value(1)
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this._explode, {
        delay: this.props.delay || 0,
        toValue: 1,
        duration: this.props.explodeTime,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(this._driftY, {
          toValue: this.props.decayY,
          duration: this.props.decayTime,
          useNativeDriver: true,
        }),
        Animated.timing(this._opacity, {
          toValue: 0,
          duration: this.props.decayTime,
          useNativeDriver: true,
        })
      ])
    ]).start()
  }

  render() {
    const {props,state} = this
    const {fireworkDiameter: fd, sparkDiameter: sd} = props
    const fs = {
      width: fd,
      height: fd,
      position: 'absolute',
    }
    const ss = {
      width: sd,
      height: sd,
      borderRadius: sd/2,
      position: 'absolute',
    }
    return(
      <Animated.View style={[fs, props.style, {opacity:this._opacity, transform: [{scale:this._explode}, {translateY:this._driftY}]}]}>
        <View style={[{top:0, left: 0}, ss, {backgroundColor: props.color}]} />
        <View style={[{top:0, right: 0}, ss, {backgroundColor: props.color}]} />
        <View style={[{top:-(fd/4), left: fd/2 - sd/2}, ss, {backgroundColor: props.color}]} />
        <View style={[{bottom:0, left: 0}, ss, {backgroundColor: props.color}]} />
        <View style={[{bottom:0, right: 0}, ss, {backgroundColor: props.color}]} />
        <View style={[{bottom:-(fd/4), left: fd/2 - sd/2}, ss, {backgroundColor: props.color}]} />
        <View style={[{top:fd/2 - sd/2, left: -(fd/4)}, ss, {backgroundColor: props.color}]} />
        <View style={[{top:fd/2 - sd/2, right: -(fd/4)}, ss, {backgroundColor: props.color}]} />
      </Animated.View>
    )
  }
}

Firework.defaultProps = {
  color: 'gold',
  fireworkDiameter: 150,
  sparkDiameter: 15,
  decayTime: 8000,
  explodeTime: 100,
  decayY: 100,
}
