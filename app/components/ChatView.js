'use strict'

import React, {Component}     from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import Header                 from '../containers/Header'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function(props) {
  console.log(props.myId)
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
          user={{_id: props.myId}}
          renderBubble={(props) => (
            <Bubble
              {...props}
              containerToNextStyle={{
                left: {
                  borderBottomLeftRadius: 15,
                },
                right: {
                  borderBottomRightRadius: 15,
                },
              }}
              containerToPreviousStyle={{
                left: {
                  borderTopLeftRadius: 15,
                },
                right: {
                  borderTopRightRadius: 15,
                },
              }} />
          )}
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
