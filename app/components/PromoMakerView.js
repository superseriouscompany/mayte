'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {em} from '../constants/dimensions'
import base from '../constants/styles'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={props.visitHome}>
        <Text>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[base.button, styles.topButton]} onPress={props.invite}>
        <Text style={[base.buttonText]}>Send Invitation</Text>
      </TouchableOpacity>
      <TouchableHighlight style={[base.button, styles.secretButton]} underlayColor="hotpink" onPress={props.generate}>
        <View>
          <Text style={[base.buttonText, styles.secretButtonText]}>Send VIP Invitation</Text>
        </View>
      </TouchableHighlight>
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
  topButton: {
    marginBottom: 20,
  },
  secretButton: {
    backgroundColor: 'white',
  },
  secretButtonText: {
    color: 'white'
  },
})
