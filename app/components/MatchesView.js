'use strict'

import React, {Component}      from 'react'
import MatchPreview            from './MatchPreview'
import { statusBarHeight, em } from '../constants/dimensions'
import { mayteBlack }          from '../constants/colors'
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
      { props.loading  ?
        <View style={style.centered}>
          <ActivityIndicator />
        </View>
      : props.error ?
        <View style={style.centered}>
          <Text style={style.error}>
            {props.error}
          </Text>
        </View>
      : !props.matches.length ?
        <View style={style.centered}>
          <Text>You have no matches.</Text>
        </View>
      :
        <ScrollView style={{flex: 1, paddingTop: statusBarHeight}}>
          <Text></Text>
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
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red'
  }
})
