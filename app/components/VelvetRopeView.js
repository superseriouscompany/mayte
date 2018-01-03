'use strict'

import React, {Component} from 'react'
import Text               from './Text'
import {webUrl}           from '../services/api'
import base               from '../constants/styles'
import {em}               from '../constants/dimensions'
import {ButtonBlack}      from './ButtonBlack'
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
            <ButtonBlack text={`Entry Ticket`} onPress={props.addPass} style={styles.button} />
            { props.isAdmin ?
              <ButtonBlack text={`VIP Codes`} onPress={props.visitPromoMaker} style={styles.button} />
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
    width: 150,
    alignItems: 'center',
  },
})
