'use strict'

import React, {Component} from 'react'
import {em}               from '../constants/dimensions'
import base               from '../constants/styles'
import Text from './Text'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.code}>{props.vipCode}</Text>
        <Text style={styles.explanation}>Your exclusive Unicorn membership will unlock if you invite {props.unlockCount} more {props.unlockCount == 1 ? 'girlfriend' : 'girlfriends'}.</Text>
      </View>

      <View style={styles.buttonsCnr}>
        <TouchableOpacity style={[base.button, styles.mainButton]} onPress={props.share}>
          <Text style={[base.buttonText]}>Share your code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.cancel]} onPress={props.reset}>
          <Text style={styles.cancelText}>Use another code</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
  },
  body: {
    flex: 1,
    paddingTop: em(2),
    alignItems: 'center',
  },
  code: {
    fontSize: 28,
    marginBottom: em(1),
  },
  explanation: {
    width: '66%',
  },
  buttonsCnr: {
    alignItems: 'center',
  },
  mainButton: {
    marginBottom: em(1),
  },
  cancel: {
    marginBottom: em(1),
  },
})
