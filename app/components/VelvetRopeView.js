'use strict'

import React, {Component} from 'react'
import Text               from './Text'
import {webUrl}           from '../services/api'
import base               from '../constants/styles'
import {em}               from '../constants/dimensions'
import {ButtonBlack}      from './Button'
import MembershipCard     from '../containers/MembershipCard'
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native'

export default function(props) {
  return (
    <View style={styles.container}>
      <MembershipCard />
      <View style={styles.events}>
        <Text style={styles.explanation}>
          This is your entry ticket to all Unicorn events.
        </Text>

        <Text style={styles.nextEvent}>
          The next event is:
        </Text>
        <TouchableOpacity onPress={() => {}}>
          { /* TODO: pull title and description from the backend */ }
          <Text style={styles.title}>
            Unicorn {"Valentine's"} Day.
          </Text>
          <Text style={styles.description}>
            Feb 14 @ Absolut Elyx House
          </Text>
          <ButtonBlack style={styles.inline} text="Details" onPress={() => {Linking.openURL('https://dateunicorn.com')}} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsCnr}>
        { props.isAdmin || props.isGold ?
          <ButtonBlack text={`VIP Codes`} onPress={props.visitVipCodeInvite} style={styles.button} />
        : null }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: em(2),
  },
  webview: {
    flex: 1,
    // https://stackoverflow.com/questions/41188362/react-native-webview-rendering-unexpected-border-at-bottom
    backgroundColor: 'transparent',
  },
  buttonsCnr: {
    alignItems: 'center',
  },
  events: {
    padding: em(1),
    flex: 1,
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
  nextEvent: {
    marginBottom: em(1),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: em(1),
  },
  description: {
    marginBottom: em(.5),
  },
  inline: {
    width: em(6),
  },
})
