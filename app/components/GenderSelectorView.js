'use strict'

import React, {Component} from 'react'
import Text from './Text'
import base from '../constants/styles'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import {mayteBlack, mayteWhite} from '../constants/colors'
import {
  Image,
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

// TODO: use Picker component https://streetsmartdev.com/creating-form-select-component-in-react-native/

function Reference(props) {
  return (
    <View style={style.container}>
      { props.loading ?
        <View style={style.loadingCnr}>
          <ActivityIndicator size="large"/>
        </View>
      :
        <View style={style.container}>
          <View style={style.optionsCnr}>
            <View style={style.options}>
              <Text style={style.heading}>I identify as:</Text>

              <Option {...props} field="gender" value="female">A Woman</Option>
              <Option {...props} field="gender" value="male">A Man</Option>
              <Option {...props} field="gender" value="null">Other</Option>
            </View>

            <View style={style.options}>
              <Text style={style.heading}>I am interested in:</Text>

              <Option {...props} field="orientation" value="male">Men</Option>
              <Option {...props} field="orientation" value="female">Women</Option>
              <Option {...props} field="orientation" value="null">Everyone</Option>
            </View>
          </View>
          <TouchableOpacity style={[base.button, style.continue]} onPress={props.select}>
            <Text style={[base.buttonText]}>Continue</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

function Unicorn(props) {
  const selected = props[props.field] == props.value

  return (
    <TouchableOpacity style={[style.option, selected ? style.selected : null, props.style]} key={props.field + '-' + props.value} onPress={() => props.set(props.field, props.value)}>
      {props.children}
    </TouchableOpacity>
  )
}

class NightSky extends Component {
  constructor(props) {
    super(props)
    const numStars = 5
    this.stars = []
    for (let i = 0; i < numStars; i++) {
      this.stars.push({
        top: Math.random() * screenHeight * 0.8,
        left: Math.random() * screenWidth * 0.8 + screenHeight * 0.1,
        twinkleDelay: Math.random() * 2000,
      })
    }
  }
  render() {
    const {props,state} = this
    return(
      <View style={[style.nightSky]}>
        <Star style={{top: em(2), left: em(2)}} twinkleDelay={2000} />
        <Star style={{top: em(10), left: em(10)}} twinkleDelay={2800} />
        <Star style={{top: em(20), left: em(15)}} twinkleDelay={3300} />
        <Star style={{top: em(15), left: em(20)}} twinkleDelay={4500} />
        <Star style={{top: em(23), left: em(2)}} twinkleDelay={5300} />
        <Star style={{top: em(2), left: em(2)}} twinkleDelay={6200} />
      </View>
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
        }),
        Animated.timing(this._twinkle, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
        })
      ])
    ).start()
  }
  render() {
    const {props,state} = this
    return(
      <View style={[style.star, props.style]}>
        <Animated.View style={[
          style.twinkle,
          {transform: [
            {scale: this._twinkle},
            {rotate: '45deg'}
          ]}
        ]} />
      </View>
    )
  }
}

export default function(props) {
  return(
    <View style={style.container}>
      { props.loading ?
        <View style={style.loadingCnr}>
          <ActivityIndicator size="large"/>
        </View>
      :
        <View style={style.container}>
          <View style={style.identityCont}>
            <NightSky />
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
          </View>

          <View style={style.cornCont}>
            <View style={style.ground}></View>
            <Text style={style.heading}>{`I'm interested in:`}</Text>
            <Unicorn {...props} field="gender" value="male"
                    style={[style.corn, {left: em(1), bottom: em(4.5)}]}>
              <Image source={require('../images/unicorn-male-white.png')}
                     style={{width: '100%', height: '100%'}}
                     resizeMode='contain' />
            </Unicorn>
            <Unicorn {...props} field="gender" value="null"
                    style={[style.corn, {right: em(8.5), bottom: em(9)}]}>
            <Image source={require('../images/unicorn-all-white.png')}
                   style={{width: em(8), height: em(8), transform: [{scaleX:-0.66}, {scaleY: 0.66}]}}
                   resizeMode='contain' />
            </Unicorn>
            <Unicorn {...props} field="gender" value="female"
                    style={[style.corn, {right: em(1), transform: [{scaleX:-1.1},{scaleY:1.1}], bottom: em(3)}]}>
              <Image source={require('../images/unicorn-female-white.png')}
                      style={{width: '100%', height: '100%'}}
                      resizeMode='contain' />
            </Unicorn>
          </View>

          <TouchableOpacity style={[base.button, style.continue]} onPress={props.select}>
            <Text style={[base.buttonText]}>Continue</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
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
    });

    return (
      <TouchableOpacity key={props.field + '-' + props.value} onPress={() => props.set(props.field, props.value)}
                        style={[style.identity, props.style]}>
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

const idDiameter = em(5)
const starDiameter = em(0.33)

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: mayteBlack(),
    backgroundColor: '#232037',
  },
  loadingCnr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continue: {
    marginTop: em(1),
    marginBottom: em(1),
    position: 'absolute',
    bottom: em(0.33),
  },
  heading: {
    marginBottom: em(1),
    marginTop: em(3),
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'transparent',
  },


  identityCont: {
    height: screenHeight * 0.5,
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
  nightSky: {
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
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



  cornCont: {
    height: screenHeight * 0.5,
    width: screenWidth,
    backgroundColor: 'transparent',
  },
  corn: {
    width: em(8),
    height: em(8),
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  ground: {
    position: 'absolute',
    backgroundColor: mayteBlack(0.95),
    borderColor: mayteBlack(),
    borderTopWidth: 1,
    width: screenWidth,
    height: 185,
    bottom: 0,
    left: 0,
  },
})
