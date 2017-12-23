'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <Text>Your VIP code: {props.vipCode}</Text>
      <Text>Your exclusive Unicorn membership will unlock if you invite {props.unlockCount} more {props.unlockCount == 1 ? 'girlfriend' : 'girlfriends'}</Text>
      <TouchableOpacity onPress={props.share}>
        <Text>Share your code</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.reset}>
        <Text>Use another code</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  }
})
