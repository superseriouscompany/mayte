'use strict'

import React, {Component} from 'react'
import {em, bottomBoost, screenWidth, screenHeight} from '../constants/dimensions'
import {mayteBlack} from '../constants/colors'
import {ButtonBlack} from './ButtonBlack'
import base from '../constants/styles'
import Text from './Text'
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
} from 'react-native'

export default class VipCodeEntryView extends Component {
  constructor(props) {
    super(props)
    this._fade = new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(this._fade, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const {props,state} = this
    return (
      <Animated.View style={[style.container, {opacity: this._fade}]}>
        <Image style={[style.bg]} source={require('../images/VipCodeBG.jpg')} resizeMode='cover' />
        <View style={style.inputCnr}>
          <TextInput
            style={style.input}
            onChangeText={props.setVipCode}
            value={props.vipCode}
            placeholder="VIP Code" />
          { props.error ?
            <Text style={style.error}>
              {props.error}
            </Text>
          : props.loading ?
            <ActivityIndicator style={style.loading}/>
          : null }
        </View>

        <View style={style.buttonsCnr}>
          <ButtonBlack text={`Redeem`} onPress={props.redeem} style={style.mainButton} />

          <TouchableOpacity style={style.cancel} onPress={props.visitPaywall}>
            <Text style={style.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flex:    1,
    opacity: 0, // prevent FOUC...
  },
  inputCnr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 2,
    borderColor: mayteBlack(),
    width: '80%',
    textAlign: 'center',
    paddingBottom: em(0.66),
    fontFamily: 'Futura',
    fontSize: em(2),
  },
  error: {
    position: 'absolute',
    color: 'red',
    top: 10,
  },
  loading: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  buttonsCnr: {
    alignItems: 'center',
  },
  mainButton: {
    marginBottom: em(1),
    paddingLeft: em(1.33),
    paddingRight: em(1.33),
  },
  cancel: {
    marginBottom: em(1) + bottomBoost,
    backgroundColor: 'transparent',
  },
  bg: {
    position: 'absolute',
    top: 0, left: 0,
    width: screenWidth,
    height: screenHeight,
    opacity: 0.5,
  },
})
