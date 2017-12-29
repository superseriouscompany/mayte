'use strict'

import React, {Component} from 'react'
import Text from './Text'
import base from '../constants/styles'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import {mayteBlack, mayteWhite} from '../constants/colors'
import Firework from './Firework'
import LinearGradient from 'react-native-linear-gradient'
import {
  Image,
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

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

class SelfSelector extends Component {
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

class Environment extends Component {
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

class CornSelector extends Component {
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

export default class GenderSelector extends Component {
  constructor(props) {
    super(props)
    this._mask = new Animated.Value(0)
    this._starFade = new Animated.Value(0)
    this._idFade = new Animated.Value(0)
    this._interestFade = new Animated.Value(0)
    this._continueFade = new Animated.Value(0)
    this._shootingStarDrift = new Animated.Value(0)
    this._shootingStarFade = new Animated.Value(0)

    // TODO: Account for preselection?

    this.state = {
      mask: true,
      interest: !!(props.gender),
      continue: props.gender && props.orientation,
    }

    this.complete = this.complete.bind(this)
  }

  componentWillUpdate(nextProps) {
    if (nextProps.gender && !this.state.interest) {
      this.setState({interest: true})
      Animated.timing(this._interestFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }

    if (nextProps.gender && nextProps.orientation && !this.state.continue) {
      this.setState({continue: true})
      Animated.timing(this._continueFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start()
    }
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this._mask, {
        toValue: screenHeight,
        delay: 1000,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this._starFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(this._shootingStarFade, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(this._shootingStarDrift, {
          toValue: screenWidth * 0.66,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(this._shootingStarFade, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(this._idFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start()
  }

  complete() {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(this._idFade, {toValue: 0, duration: 1000, useNativeDriver: true}),
        Animated.timing(this._interestFade, {toValue: 0, duration: 1000, useNativeDriver: true}),
        Animated.timing(this._continueFade, {toValue: 0, duration: 1000, useNativeDriver: true}),
      ]),
      Animated.timing(this._mask, {toValue: 0, duration: 666, useNativeDriver: true})
    ]).start(this.props.select)
  }

  render() {
    const {props,state} = this
    return(
      <View style={style.container}>
      { props.loading ?
        <View style={style.loadingCnr}>
        <ActivityIndicator size="large"/>
        </View>
        :
        <View style={style.container}>
          <Environment {...props} starFade={this._starFade} shootingStarDrift={this._shootingStarDrift} shootingStarFade={this._shootingStarFade} />
          <SelfSelector {...props} fade={this._idFade} />
          <CornSelector {...props} render={state.interest} fade={this._interestFade} />
          <Animated.View style={[style.mask, {
              transform: [{translateY: this._mask}]
            }]} />

          {this.state.continue ?
          <Animated.View style={{opacity: this._continueFade, width: screenWidth, alignItems: 'center'}}>
            <TouchableOpacity style={[base.button,style.continue]}
                              onPress={this.complete}>
              <Text style={[base.buttonText]}>Continue</Text>
            </TouchableOpacity>
          </Animated.View> : null}
        </View>
      }
      </View>
    )
  }
}

const idDiameter = em(5)
const starDiameter = em(0.33)

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(23,20,21,1)',
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

  environment: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight,
  },

  mask: {
    position: 'absolute',
    left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(23,20,21,1)',
  },
})
