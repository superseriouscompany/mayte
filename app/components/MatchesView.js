'use strict'

import React, {Component} from 'react'
import Header             from '../containers/Header'
import MatchPreview       from './MatchPreview'
import {statusBarHeight}  from '../services/dimensions'
import {
  ActivityIndicator,
  StyleSheet,
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
        <View style={{flex: 1, paddingTop: statusBarHeight}}>
          { props.matches.map((m, key) => (
            <MatchPreview key={key} match={m} viewChat={() => props.viewChat(m.user)} />
          ))}
        </View>
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
