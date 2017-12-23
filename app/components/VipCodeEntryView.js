'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={props.setVipCode}
        value={props.vipCode}
        placeholder="VIP Code" />

      <TouchableOpacity style={styles.button} onPress={props.redeem}>
        <Text style={styles.buttonText}>Redeem</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  input: {
    borderWidth: 1,
    width: '66%',
    padding: 10,
  },
})
