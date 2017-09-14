'use strict'

import React, {Component} from 'react'
import RNFirebase from 'react-native-firebase'
import {
  Text,
  View,
} from 'react-native'

import { NativeModules, NativeEventEmitter } from 'react-native';

const firebase = RNFirebase.initializeApp({
  debug: true,
})

export default class Scratch extends Component {
  componentDidMount() {
    firebase.database()
      .ref('posts')
      .on('value', (snapshot) => {
        console.warn('got snapshot', snapshot.val())
      })

    setTimeout(() => {
      firebase.database()
        .ref('posts')
        .set({
          title: 'My post',
          content: 'Some content',
        })
    }, 1000)
  }

  render() {
    const {props} = this

    return (
      <View style={{padding: 20}}>
        <Text>Hello</Text>
      </View>
    )
  }
}
