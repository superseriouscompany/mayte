'use strict'

import React, {Component}                         from 'react'
import MatchPreview                               from './MatchPreview'
import { notchHeight, matchHeaderHeight, em }     from '../constants/dimensions'
import { mayteBlack }                             from '../constants/colors'
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <View style={[style.centered, style.header]}>
        <Text style={style.headerLabel}>CONNECTIONS</Text>
      </View>
      { props.loading  ?
        <View style={[style.container, style.centered]}>
          <ActivityIndicator />
        </View>
      : props.error ?
        <View style={[style.container, style.centered]}>
          <Text style={style.error}>
            {props.error}
          </Text>
        </View>
      : !props.matches.length ?
        <View style={[style.container, style.centered]}>
          <Text style={style.text}>You have no conversations.</Text>
        </View>
      :
        <ScrollView style={{flex: 1}}>
          { props.matches.map((m, key) => (
            <MatchPreview key={key} match={m} viewChat={() => props.viewChat(m.user)} />
          ))}
        </ScrollView>
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems:     'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red'
  },
  header: {
    height: matchHeaderHeight + notchHeight,
    paddingTop: notchHeight,
    borderBottomWidth: 1,
    borderBottomColor: mayteBlack(0.5),
  },
  headerLabel: {
    fontSize: em(1.33),
    letterSpacing: em(0.1),
    fontFamily: 'Gotham-Bold',
  },
  text: {
    fontFamily: 'Futura',
    fontSize: em(1),
  }
})
