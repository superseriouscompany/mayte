'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <Text>Ya Burnt</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
  }
})
