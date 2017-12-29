'use strict'

import React, {Component} from 'react'
import Text from './Text'
import base from '../constants/styles'
import {em} from '../constants/dimensions'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <WebView style={styles.webview} source={{uri: 'https://dateunicorn.com/velvetrope/'}} scrollEnabled={false} scalesPageToFit={false}/>
      <View style={styles.buttonsCnr}>
        <TouchableOpacity style={[base.button, styles.button]} onPress={props.addPass}>
          <Text style={[base.buttonText]}>Entry Ticket</Text>
        </TouchableOpacity>
        { props.isAdmin ?
          <TouchableOpacity style={[base.button, styles.button]} onPress={props.visitPromoMaker}>
            <Text style={[base.buttonText]}>VIP Codes</Text>
          </TouchableOpacity>
        : null }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  buttonsCnr: {
    alignItems: 'center',
  },
  button: {
    marginBottom: em(1),
    width: 140,
    alignItems: 'center',
  },
})
