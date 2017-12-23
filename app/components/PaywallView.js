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

      { (props.products || []).map((p, key) => (
        <TouchableOpacity key={key} onPress={() => props.buy(p.identifier)}>
          <Text>
            {p.title}: {p.description} {p.priceString}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity onPress={props.visitVipWall}>
        <Text>I have a VIP Code</Text>
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
