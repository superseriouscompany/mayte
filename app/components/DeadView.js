'use strict'

import React, {Component} from 'react'
import {ButtonBlack}      from './Button'
import {
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <ButtonBlack text="Ya Burnt"
        onPress={() => Linking.openURL('https://dateunicorn.com/download')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex          : 1,
    justifyContent: 'center',
    alignItems    : 'center',
  },

})
