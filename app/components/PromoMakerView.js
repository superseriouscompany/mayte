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
      <TouchableOpacity onPress={props.generate}>
        <Text>Generate promo code</Text>
      </TouchableOpacity>

      { props.url ?
        <Text>
          {props.url}
        </Text>
      :
        null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
