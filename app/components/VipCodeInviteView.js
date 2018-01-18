'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {em} from '../constants/dimensions'
import base from '../constants/styles'
import {ButtonBlack} from './Button'
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

      <ButtonBlack text={`Send Invitation`} style={styles.topButton}
        onPress={() => props.generate('silver', 'Find your unicorn')} />

      { !props.isAdmin ? null :
        <TouchableHighlight underlayColor="hotpink" style={[base.button, styles.secretButton]}
          onPress={() => props.generate('gold', 'I think you\'re a unicorn')}>
          <View>
            <Text style={[base.buttonText, styles.secretButtonText]}>Send VIP Invitation</Text>
          </View>
        </TouchableHighlight>
      }
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
