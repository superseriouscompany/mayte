'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {em} from '../constants/dimensions'
import base from '../constants/styles'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={props.visitHome}>
        <Text>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[base.button]} onPress={props.generate}>
        <Text style={[base.buttonText]}>Generate promo code</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    bottom: 20,
  },
})
