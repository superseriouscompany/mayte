'use strict'

import React, {Component} from 'react'
import {em} from '../constants/dimensions'
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
    <View style={styles.container}>
      <View style={styles.inputCnr}>
        <TextInput
          style={styles.input}
          onChangeText={props.setVipCode}
          value={props.vipCode}
          placeholder="VIP Code" />
        { props.error ?
          <Text style={styles.error}>
            {props.error}
          </Text>
        : props.loading ?
          <ActivityIndicator style={styles.loading}/>
        : null }
      </View>

      <View style={styles.buttonsCnr}>
        <TouchableOpacity style={[base.button, styles.mainButton]} onPress={props.redeem}>
          <Text style={[base.buttonText]}>Redeem</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancel} onPress={props.visitPaywall}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
  },
  inputCnr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gainsboro',
    width: '66%',
    padding: 10,
    fontFamily: 'Futura',
    fontSize: 16,
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
  },
  cancel: {
    marginBottom: em(1)
  },
})
