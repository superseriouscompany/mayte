'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {em} from '../constants/dimensions'
import base from '../constants/styles'
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  const product = (props.products || [])[0]

  return (
    <View style={styles.container}>
      { product ?
        <View style={styles.optionsCnr}>
          <Text style={styles.teaser}>
            There are only 100 spots available for our first members only party in LA. Payment starts Valentine's Day.
          </Text>

          <TouchableOpacity style={[base.button]} onPress={() => props.buy(product.identifier)}>
            <Text style={[base.buttonText]}>Join for {product.priceString}/month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backdoor} onPress={props.visitVipWall}>
            <Text>I have a VIP Code</Text>
          </TouchableOpacity>
        </View>
      :
        <View style={styles.loadingCnr}>
          <ActivityIndicator size="large" />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
  },
  optionsCnr: {
    flex: 1,
    alignItems: 'center',
  },
  teaser: {
    padding: em(2),
  },
  backdoor: {
    marginTop: em(1)
  },
  loadingCnr: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  }
})
