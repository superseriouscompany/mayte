'use strict'

import React, {Component} from 'react'
import Header from '../containers/Header'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <Header />
      <Text>Settings</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})
