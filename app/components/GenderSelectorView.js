'use strict'

import React, {Component} from 'react'
import Text from './Text'
import base from '../constants/styles'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import {mayteBlack} from '../constants/colors'
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

function Option(props) {
  const selected = props[props.field] == props.value

  return (
    <TouchableOpacity style={[style.option, selected ? style.selected : null, props.style]} key={props.field + '-' + props.value} onPress={() => props.set(props.field, props.value)}>
      {props.children}
    </TouchableOpacity>
  )
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
            <Option {...props} field="gender" value="male"
                    style={[style.corn, {left: em(1), bottom: em(4.5)}]}>
              <Image source={require('../images/unicorn-male-white.png')}
                     style={{width: '100%', height: '100%'}}
                     resizeMode='contain' />
            </Option>
            <Option {...props} field="gender" value="null"
                    style={[style.corn, {right: em(8.5), bottom: em(9)}]}>
            <Image source={require('../images/unicorn-all-white.png')}
                   style={{width: em(8), height: em(8), transform: [{scaleX:-0.66}, {scaleY: 0.66}]}}
                   resizeMode='contain' />
            </Option>
            <Option {...props} field="gender" value="female"
                    style={[style.corn, {right: em(1), transform: [{scaleX:-1.1},{scaleY:1.1}], bottom: em(3)}]}>
              <Image source={require('../images/unicorn-female-white.png')}
                      style={{width: '100%', height: '100%'}}
                      resizeMode='contain' />
            </Option>
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
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this._rotation, {
        toValue: 100,
        duration: 4000,
        easing: Easing.linear,
      })
    ).start()
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
  },
  options: {
    marginBottom: em(2),
  },
  option: {
    padding: em(1),
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
  cornCont: {
    height: screenHeight * 0.5,
    width: screenWidth,
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
  }
})
