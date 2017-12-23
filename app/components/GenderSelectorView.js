'use strict'

import React, {Component} from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      { props.loading ?
        <ActivityIndicator />
      :
        <View style={styles.container}>
          <Text>I identify as:</Text>

          <TouchableOpacity style={styles.button} onPress={() => props.select('male')}>
            <Text style={styles.buttonText}>A Man</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => props.select('female')}>
            <Text style={styles.buttonText}>A Woman</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => props.select('null')}>
            <Text style={styles.buttonText}>Other</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  button: {
    backgroundColor: 'black',
    margin: 10,
    padding: 5,
  },
  buttonText: {
    color: 'white',
  },
})
