'use strict'

import React, {Component}                    from 'react'
import RNFirebase                            from 'react-native-firebase'
import { NativeModules, NativeEventEmitter } from 'react-native'
import { GeoLocation }                       from 'react-native'
const { InAppUtils } = NativeModules
import Wallet                                from 'react-native-wallet'
import branch                                from 'react-native-branch'
import { Client }                            from 'bugsnag-react-native';
import log                                   from '../services/log'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


const firebase = RNFirebase.initializeApp({
  debug: true,
})

export default class Scratch extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [] }
    this.buy = this.buy.bind(this)
  }

  buy(id) {
    InAppUtils.purchaseProduct(id, (err, response) => {
      if( err ) { return alert(err.message) }
      if( response && response.productIdentifier ) {
        return alert('Purchase Successful: '+response.transactionIdentifier)
      }
      console.warn('Unknown response', err, response)
    })
  }

  componentDidMount() {
    log(new Error('sweet'))

    branch.createBranchUniversalObject(
      `promos/nice`,
      {
        metadata: {
          inviter_id: 'whatever',
        }
      }
    ).then((branchUniversalObject) => {
      const linkProperties = {
        feature: 'promo-redemption',
        channel: 'app'
      }
      const controlParams = {}

      branchUniversalObject.generateShortUrl(linkProperties, controlParams).then((payload) => {
        alert(payload.url)
      })
    }).catch((err) => {
      log(err)
    })

    navigator.geolocation.requestAuthorization()

    navigator.geolocation.getCurrentPosition(function yes(cool) {
      console.log(cool)
    }, function no(err) {
      alert('Couldn\'t get location')
      console.warn(err)
    })

    const products = [
      'com.mayte.dev.monthly'
    ]

    InAppUtils.canMakePayments((enabled) => {
      if(!enabled) { return alert('IAP disabled') }

      InAppUtils.loadProducts(products, (err, products) => {
        if( err ) { log(err) }
        this.setState({products})
      })
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
        }).catch((err) => {
          console.warn(err)
        })
    }, 1000)
  }

  render() {
    const {props} = this

    return (
      <View style={{padding: 20}}>
        { this.state.products.map((p, key) => (
          <TouchableOpacity key={key} onPress={() => this.buy(p.identifier)}>
            <Text>
              {p.title}: {p.description} {p.priceString}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}
