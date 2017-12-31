'use strict'

import React, {Component} from 'react'
import {
  View,
  Easing,
  Animated,
} from 'react-native'

export default class OrbitLoader extends Component {
  constructor(props) {
    super(props)
    this._orbit = new Animated.Value(0)
  }
  componentDidMount() {
    Animated.loop(
      Animated.timing(this._orbit, {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }
  render() {
    const { radius, color, trackWidth, orbRadius, trackColor, orbColor } = this.props
    const interpolatedOrbit = this._orbit.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View // track
        style={{
          width: radius*2,
          height: radius*2,
          borderRadius: radius,
          borderWidth: trackWidth,
          borderColor: trackColor ? trackColor : color,
        }}>
        <Animated.View // rail
          style={{
            width: radius*2-trackWidth,
            height: radius*2-trackWidth,
            position: 'absolute',
            top: 0, left: 0,
            transform: [{rotate: interpolatedOrbit}]
          }}>
          <View
            style={{
              width: orbRadius*2,
              height: orbRadius*2,
              borderRadius: orbRadius,
              backgroundColor: orbColor ? orbColor : color,
              position: 'absolute',
              top: -orbRadius, left: radius - orbRadius,
            }} />
        </Animated.View>
      </View>
    )
  }
}

OrbitLoader.defaultProps = {
  radius: 50,
  color: 'black',
  trackWidth: 1,
  orbRadius: 10,
  trackColor: null,
  orbColor: null,
}
