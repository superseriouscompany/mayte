'use strict'

import React, {Component} from 'react'
import RNFirebase from 'react-native-firebase'
import { NativeModules, NativeEventEmitter } from 'react-native';
const { InAppUtils } = NativeModules
import {
  Text,
  View,
} from 'react-native'


const firebase = RNFirebase.initializeApp({
  debug: true,
})

export default class Scratch extends Component {
  componentDidMount() {
    console.log('chello')

    const products = [
      'com.mayte.dev.monthly'
    ]
    InAppUtils.loadProducts(products, (err, products) => {
      if( err ) { console.error(err) }
      console.log(products)
    })

    firebase.messaging().requestPermissions()

    firebase.messaging().getToken().then((token) => {
      console.log('Device FCM Token: ', token)
    })

    firebase.messaging().onTokenRefresh((token) => {
      console.log('Updated device FCM Token: ', token)
    })

    firebase.messaging().getInitialNotification().then((notification) => {
      console.log('Notification which opened the app: ', notification)
    })

    firebase.messaging().onMessage((message) => {
      console.log('Got message', message)
    })

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
