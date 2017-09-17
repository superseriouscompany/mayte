'use strict'

import React, {Component} from 'react'
import { GiftedChat }     from 'react-native-gifted-chat'
import Header             from '../containers/Header'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function(props) {
  return (
    <View style={style.container}>
      <Header />
      { props.loading ?
        <View style={style.centered}>
          <ActivityIndicator />
        </View>
      : props.error ?
        <View style={style.centered}>
          <Text style={style.error}>
            {props.error}
          </Text>
        </View>
      :
        <GiftedChat
          messages={props.messages}
          onSend={(messages) => props.onSend(messages)}
          user={{_id: 1}}
          />
      }
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    flex:           1,
    justifyContent: 'center',
    alignItems:     'center',
  },
  error: {
    color: 'red',
  },
})
