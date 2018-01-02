'use strict'

import React, {Component} from 'react'
import Text               from './Text'
import {webUrl}           from '../services/api'
import base               from '../constants/styles'
import {em}               from '../constants/dimensions'
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
      { props.loading ?
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      :
        <View style={styles.container}>
          <WebView style={styles.webview} source={{uri: `${webUrl}/velvetrope/`}} scrollEnabled={false} scalesPageToFit={false}/>
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
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    // https://stackoverflow.com/questions/41188362/react-native-webview-rendering-unexpected-border-at-bottom
    backgroundColor: 'transparent',
  },
  buttonsCnr: {
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: em(1),
    width: 140,
    alignItems: 'center',
  },
})
