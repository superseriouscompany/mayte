'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import LinearGradient from 'react-native-linear-gradient'
import {mayteBlack, mayteWhite} from '../constants/colors'
import {
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

class Unicorn extends Component {
  constructor(props) {
    super(props)
    this._labelOpacity = new Animated.Value(0)
    this._rotate = new Animated.Value(0)
    this._jumpman = new Animated.Value(0)
    this.doALittleJump = this.doALittleJump.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const selected = nextProps[nextProps.field] == this.props.value
    if (selected || !nextProps[nextProps.field]) {
      Animated.timing(this._labelOpacity, {
        toValue: 1,
        duration: 333,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(this._labelOpacity, {
        toValue: 0,
        duration: 333,
        useNativeDriver: true,
      }).start()
    }

    if (selected && this.props[this.props.field] != this.props.value) {
      this.doALittleJump()
    }
  }

  doALittleJump() {
    Animated.parallel([
      Animated.timing(this._rotate, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(100),
        Animated.timing(this._jumpman, {
          toValue: -10,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(this._jumpman, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(this._rotate, {
            toValue: 0,
            duration: 200,
            delay: 100,
            useNativeDriver: true,
          })
        ])
      ]),
    ]).start()
  }

  render() {
    const {props,state} = this
    const selected = props[props.field] == props.value

    var interpolatedRotateAnimation = this._rotate.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', `${(props.flipped ? 1 : -1) * 6}deg`]
    })

    return (
      <TouchableOpacity key={props.field + '-' + props.value}
                        style={[props.style]}
                        onPress={() => props.set(props.field, props.value)} >
        <Animated.Text style={[style.cornLabel, props.labelStyle || {}, {opacity: Animated.multiply(this._labelOpacity, props.fade)}]}>{props.label}</Animated.Text>
        <Animated.View style={{width: '100%', height: '100%', opacity: props.fade, transform: [{translateY: this._jumpman}, {rotate: interpolatedRotateAnimation}]}}>
          {props.children}
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

export default class CornSelector extends Component {
  constructor(props) {
    super(props)
    this._menOpacity = new Animated.Value(0)
    this._womenOpacity = new Animated.Value(0)
    this._allOpacity = new Animated.Value(0)

    this.state = {
      render: false
    }

    this.fadeInCorns = this.fadeInCorns.bind(this)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.render) {
      this.fadeInCorns()
    }
  }

  fadeInCorns() {
    Animated.parallel([
      Animated.timing(this._womenOpacity, {
        delay: 0,
        toValue: 1,
        duration: 666,
        useNativeDriver: true,
      }),
      Animated.timing(this._menOpacity, {
        delay: 444,
        toValue: 1,
        duration: 666,
        useNativeDriver: true,
      }),
      Animated.timing(this._allOpacity, {
        delay: 888,
        toValue: 1,
        duration: 666,
        useNativeDriver: true,
      }),
    ]).start()
  }

  render() {
    const {props,state} = this
    return(
      <Animated.View style={[style.cornCont, {opacity: props.fade}]}>
        <Text style={style.heading}>{`I'm interested in:`}</Text>
        <Unicorn {...props} field="orientation" value="null" labelStyle={{bottom: '95%'}}
                 label="EVERYONE" fade={this._allOpacity} flipped={true}
                 style={[style.corn, {right: em(8), bottom: em(9)}]}>
        <Image source={require('../images/unicorn-all-white.png')}
               style={{width: em(8), height: em(8), transform: [{scaleY: 0.66}, {scaleX:-0.66}]}}
               resizeMode='contain' />
        </Unicorn>
        <Unicorn {...props} field="orientation" value="male"
                 label="MEN" fade={this._menOpacity}
                 style={[style.corn, {left: em(1), bottom: em(4.5)}]}>
          <Image source={require('../images/unicorn-male-white.png')}
                 style={{width: '100%', height: '100%'}}
                 resizeMode='contain' />
        </Unicorn>
        <Unicorn {...props} field="orientation" value="female"
                 label="WOMEN" fade={this._womenOpacity} flipped={true}
                style={[style.corn, {right: em(1), bottom: em(3)}]}>
          <Image source={require('../images/unicorn-female-white.png')}
                  style={{width: '100%', height: '100%', transform: [{scaleX:-1.1},{scaleY:1.1}]}}
                  resizeMode='contain' />
        </Unicorn>
      </Animated.View>
    )
  }
}

const style = StyleSheet.create({
  heading: {
    marginBottom: em(1),
    marginTop: em(3),
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: em(1.33),
  },
  cornCont: {
    height: screenHeight * 0.55,
    width: screenWidth,
    backgroundColor: 'transparent',
  },
  cornLabel: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Gotham-Book',
    letterSpacing: em(0.1),
    fontSize: em(0.8),
    color: mayteWhite(),
    position: 'absolute',
    bottom: '100%',
  },
  corn: {
    width: em(8),
    height: em(8),
    position: 'absolute',
    backgroundColor: 'transparent',
  },
})
