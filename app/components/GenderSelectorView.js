'use strict'

import React, {Component} from 'react'
import Text from './Text'
import base from '../constants/styles'
import {em, screenWidth, screenHeight} from '../constants/dimensions'
import {mayteBlack} from '../constants/colors'
import {
  Image,
  ActivityIndicator,
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
      <Text style={selected ? style.selectedText : null}>
        {props.children}
      </Text>
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
                        style={{top: 20, right: 60}}>
              <Text style={style.identityText}>FEMALE</Text>
            </SelfOption>
            <SelfOption {...props} field="gender" value="male"
                        style={{top: 60, left: 50}}>
              <Text style={style.identityText}>MALE</Text>
            </SelfOption>
            <SelfOption {...props} field="gender" value="null"
                        style={{top: 120, right: 120}}>
              <Text style={style.identityText}>OTHER</Text>
            </SelfOption>
          </View>

          <View style={style.cornCont}>
            <Text style={style.heading}>{`I'm interested in:`}</Text>
            <Option {...props} field="gender" value="male"
                    style={[style.corn, {left: em(1), bottom: 100}]}>
              <Image source={require('../images/unicorn-male-white.png')}
                     style={{width: '100%', height: '100%'}}
                     resizeMode='contain' />
            </Option>
            <Option {...props} field="gender" value="null"
                    style={[style.corn, {right: em(9.5), bottom: 150}]}>
            <Image source={require('../images/unicorn-all-white.png')}
                   style={{width: em(6.25), height: em(6.25), transform: [{scaleX:-0.75}, {scaleY: 0.75}]}}
                   resizeMode='contain' />
            </Option>
            <Option {...props} field="gender" value="female"
                    style={[style.corn, {right: em(1), transform: [{scaleX:-1.1},{scaleY:1.1}], bottom: 80}]}>
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

function SelfOption(props) {
  const selected = props[props.field] == props.value

  return (
    <TouchableOpacity key={props.field + '-' + props.value} onPress={() => props.set(props.field, props.value)}>
      <View style={[style.identity, props.style]}>
        {props.children}
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    backgroundColor: mayteBlack(),
    width: screenWidth,
  },
  identity: {
    position: 'absolute',
    width: em(4.5),
    height: em(4.5),
    borderRadius: em(2.25),
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
  },
  cornCont: {
    height: screenHeight * 0.5,
    width: screenWidth,
    borderTopWidth: 1,
    backgroundColor: mayteBlack(0.95),
    borderColor: 'white',
  },
  corn: {
    width: em(6.25),
    height: em(6.25),
    position: 'absolute',
    backgroundColor: 'transparent',
  }
})
