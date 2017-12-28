'use strict'

import React, {Component} from 'react'
import Text from './Text'
import {em} from '../constants/dimensions'
import base from '../constants/styles'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

export default function(props) {
  const product = (props.products || [])[0]

  return (
    <View style={style.container}>
      { product ?
        <View style={[style.container, {alignItems: 'center'}]}>
          <Text style={style.teaser}>
            There are only 100 spots available for our first members only party in LA.
          </Text>

          <View style={style.payBtnCont}>
            <TouchableOpacity style={[base.button, style.mainButton]} onPress={() => props.buy(product.identifier)}>
              <Text style={[base.buttonText, style.payBtn]}>Join for {product.priceString}/month</Text>
            </TouchableOpacity>
            <Text>{`Payment starts Valentine's Day.`}</Text>
          </View>

          <TouchableOpacity style={style.backdoor} onPress={props.visitVipWall}>
            <Text>I have a VIP Code</Text>
          </TouchableOpacity>
        </View>
      :
        <View style={style.loadingCnr}>
          <ActivityIndicator size="large" />
        </View>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  teaser: {
    padding: em(1.66),
    fontSize: em(2),
  },
  loadingCnr: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  payBtnCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnText: {
    textAlign: 'center'
  },
  mainButton: {
    marginBottom: em(1),
  },
  backdoor: {
    marginBottom: em(1)
  },
})
