'use strict'

import React, {Component} from 'react'
import Text from './Text'
import Firework from './Firework'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import {mayteBlack, mayteWhite} from '../constants/colors'
import {
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

const idDiameter = em(5)
const starDiameter = em(0.33)

export default class SelfSelector extends Component {
  render() {
    const {props,state} = this
    return(
      <Animated.View style={[style.identityCont, {opacity: props.fade}]}>
        <Text style={style.heading}>I identify as:</Text>
        <SelfOption {...props} field="gender" value="female"
                    style={{top: em(6), right: em(2.5)}}>
          <Text style={style.identityText}>FEMALE</Text>
        </SelfOption>
        <SelfOption {...props} field="gender" value="male"
                    style={{top: em(9), left: em(2.5)}}>
          <Text style={style.identityText}>MALE</Text>
        </SelfOption>
        <SelfOption {...props} field="gender" value="null"
                    style={{top: em(13), right: em(8)}}>
          <Text style={style.identityText}>OTHER</Text>
        </SelfOption>
      </Animated.View>
    )
  }
}

class SelfOption extends Component {
  constructor(props) {
    super(props)
    this._rotation = new Animated.Value(0)
    this.loop = null
    this.startLoop = this.startLoop.bind(this)
    this.stopLoop = this.stopLoop.bind(this)
  }

  componentDidMount() {
    if (this.props.gender == this.props.value) {
      this.startLoop()
    }
  }

  componentDidUpdate() {
    if (this.props.gender == this.props.value) {
      if (!this.loop) {
        this.startLoop()
      }
    } else {
      if (this.loop) {
        this.stopLoop()
      }
    }
  }

  startLoop() {
    this.loop = Animated.loop(
      Animated.timing(this._rotation, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      })
    )
    this.loop.start()
  }

  stopLoop() {
    this.loop.stop()
    this.loop = null
    this._rotation = new Animated.Value(0)
  }

  render() {
    const {props, state} = this
    const selected = props[props.field] == props.value

    var interpolatedRotateAnimation = this._rotation.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg']
    })

    return (
      <TouchableOpacity key={props.field + '-' + props.value} onPress={() => props.set(props.field, props.value)}
                        style={[style.identity, props.style]}>
        {
          selected ?
          <Firework color="white" fireworkDiameter={idDiameter * 1.5} sparkDiameter={em(0.33)} decayTime={2000} decayY={em(1)} explodeTime={200} numSparks={9} /> :
          null
        }

        <Animated.View style={[
            style.identityOrbit,
            {transform: [{rotate: interpolatedRotateAnimation}]},
            (selected ? {opacity: 1} : {}),
          ]}>
          <View style={style.identityOrbitOrb}></View>
        </Animated.View>
        {props.children}
      </TouchableOpacity>
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
  identityCont: {
    height: screenHeight * 0.45,
    width: screenWidth,
  },
  identity: {
    position: 'absolute',
    width: idDiameter,
    height: idDiameter,
    borderRadius: idDiameter/2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },
  identityText: {
    fontFamily: 'Gotham-Book',
    fontSize: em(0.66),
    letterSpacing: em(0.1),
    color: 'white',
    backgroundColor: 'transparent',
  },
  identityOrbit: {
    position: 'absolute',
    width: idDiameter,
    height: idDiameter,
    borderRadius: idDiameter/2,
    opacity: 0,
  },
  identityOrbitOrb: {
    width: idDiameter/5,
    height: idDiameter/5,
    borderRadius: idDiameter/10,
    backgroundColor: 'white',
    top: idDiameter/8,
  },
})
