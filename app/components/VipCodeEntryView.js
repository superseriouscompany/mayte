'use strict'

import React, {Component} from 'react'
import {em, bottomBoost} from '../constants/dimensions'
import {mayteBlack} from '../constants/colors'
import base from '../constants/styles'
import Text from './Text'
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
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
        <TouchableOpacity style={[base.button, style.mainButton]} onPress={props.redeem}>
          <Text style={[base.buttonText]}>Redeem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.cancel} onPress={props.visitPaywall}>
          <Text style={style.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex:           1,
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
    padding: em(0.66),
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
  },
})
