'use strict'

import React, {Component} from 'react'
import {BlurView} from 'react-native-blur'
import {screenWidth, screenHeight} from '../constants/dimensions'
import {
  View,
  Text,
  Easing,
  Animated,
  StyleSheet,
} from 'react-native'

export default class WaitingRoomView extends Component {
  constructor(props) {
    super(props)
    this.corns = [
      {gender: 'm'},
      {gender: 'f'},
      {gender: 'a'},
      {gender: 'f'}
    ]
    this.corns.forEach((c,i) => {
      c.posX = cornWidth * 1.1 * i
      c.direction = i%2==0 ? 1 : -1
      switch (i) {
        case 0:
          c.loop = [100, 25, 150, -150, c.posX]
          break
        default:
          c.loop = null
      }
    })
  }

  render() { return (
    <View style={style.container}>
      <View style={style.pen}>
        {
          this.corns.map((c,i) => {
            const posX = cornWidth * 1.1 * i
            return <Corn
                     key={i}
                     gender={c.gender}
                     direction={c.direction}
                     posX={posX}
                     loop={c.loop} />
          })
        }
        {
          // <BlurView style={style.blur}
          //         blurType="light"
          //         blurAmount={5}
          //         viewRef={null/* required for Android */} />
        }
      </View>
      <Text>WAITING</Text>
    </View>
  )}
}

class Corn extends Component {
  constructor(props) {
    super(props)

    this.jsDir = props.direction
    this.jsStep = 0

    this._translateX = new Animated.Value(props.posX)
    this._translateY = new Animated.Value(props.posY)
    this._direction = new Animated.Value(props.direction) // -1 to face left

    this.walkRate = 20 / 1000 // 100 pixels per second
    this.hopRate = 200

    this.walk = this.walk.bind(this)
    this.turn = this.turn.bind(this)
    this.hop  = this.hop.bind(this)
    this.loop = this.loop.bind(this)
  }

  componentDidMount() {
    if (!this.props.loop) { return }
    this.loop()
  }

  loop() {
    Animated.sequence([
      this.walk(this.props.loop[this.jsStep]),
      Animated.delay(333),
      this.turn(this.jsDir *= -1),
      Animated.delay(333),
      this.walk(this.props.loop[1]),
      Animated.delay(333),
      this.turn(this.jsDir *= -1),
      Animated.delay(333),
      this.walk(this.props.loop[2]),
      Animated.delay(333),
      this.turn(this.jsDir *= -1),
      Animated.delay(333),
      this.walk(this.props.loop[3]),
      Animated.delay(333),
      this.turn(this.jsDir *= -1),
      Animated.delay(333),
      this.walk(this.props.loop[4]),
    ]).start()
  }

  walk(to) {
    // this.isWalking = true
    // this.hop()
    // return new Promise((resolve) => {
      return Animated.timing(this._translateX, {
        toValue: to,
        duration: Math.abs(this._translateX._value - 50) / this.walkRate,
        easing: Easing.linear,
        useNativeDriver: true,
      })
      // .start(() => {
      //   this.isWalking = false
      //   resolve()
      // })
    // })
  }

  hop() {
    if (!this.isWalking) { return }
    Animated.sequence([
      Animated.timing(this._translateY, {
        toValue: -10,
        duration: this.hopRate,
        useNativeDriver: true,
      }),
      Animated.timing(this._translateY, {
        toValue: 0,
        duration: this.hopRate,
        useNativeDriver: true,
      }),
    ]).start(() => this.hop())
  }

  turn(direction) {
    // return new Promise((resolve) => {
      return Animated.timing(this._direction, {
        toValue: direction,
        duration: 0,
        useNativeDriver: true,
      })
    //   .start(() => resolve())
    // })
  }

  render() {
    const {props, state} = this
    return(
      <Animated.Image
        style={[style.corn, {
          transform: [
            {translateX: this._translateX},
            {translateY: this._translateY},
            {scaleX: this._direction},
          ],
        }]}
        resizeMode='contain'
        source={
          props.gender == 'm' ? require('../images/unicorn-male-black.png') :
          props.gender == 'f' ? require('../images/unicorn-female-black.png') :
          require('../images/unicorn-all-black.png')
        } />
    )
  }
}

Corn.defaultProps = {
  direction: 1,
  posX: 0,
  posY: 0,
  gender: 'a',
  loop: undefined,
}

const cornWidth = screenWidth * 0.4

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pen: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight,
  },
  blur: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
  },
  corn: {
    position: 'absolute',
    bottom: 0, left: 0,
    width: cornWidth,
    height: cornWidth,
  },
})
